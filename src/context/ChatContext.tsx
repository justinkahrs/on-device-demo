"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import type {
  MessagePointer,
  RCSMessageEvent,
} from "../components/Message/Message";

export type ChatStatus = "idle" | "playing" | "paused" | "finished";
type MessageSender = RCSMessageEvent["from"];

export interface ChatContextValue {
  script: RCSMessageEvent[];
  displayedMessages: RCSMessageEvent[];
  typingFrom: MessageSender | null;
  status: ChatStatus;
  currentIndex: number;
  start: () => void;
  pause: () => void;
  resume: (index?: number, choice?: string) => void;
  restart: () => void;
}

export interface ChatProviderProps {
  children: ReactNode;
  script: RCSMessageEvent[];
  messageDelayMs?: number;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({
  children,
  script,
  messageDelayMs = 1500,
}: ChatProviderProps) {
  const [displayedMessages, setDisplayedMessages] = useState<RCSMessageEvent[]>(
    []
  );
  const [typingFrom, setTypingFrom] = useState<MessageSender | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState<ChatStatus>("idle");

  const timeoutIdsRef = useRef<number[]>([]);
  const statusRef = useRef<ChatStatus>("idle");
  const currentIndexRef = useRef(0);
  const pausedMessageIndexRef = useRef<number | null>(null);
  const previousScriptRef = useRef(script);

  const setStatusSafe = useCallback((nextStatus: ChatStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const messageIndexById = useMemo(() => {
    const indexById = new Map<string, number>();
    script.forEach((message, index) => {
      if (!message.id) return;
      indexById.set(message.id, index);
    });
    return indexById;
  }, [script]);

  const clearTimers = useCallback(() => {
    for (const timeoutId of timeoutIdsRef.current) {
      window.clearTimeout(timeoutId);
    }
    timeoutIdsRef.current = [];
  }, []);

  const queueTimeout = useCallback(
    (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIdsRef.current = timeoutIdsRef.current.filter(
          (existingId) => existingId !== timeoutId
        );
        callback();
      }, Math.max(0, delay));
      timeoutIdsRef.current.push(timeoutId);
    },
    []
  );

  const resolvePointer = useCallback(
    (pointer: MessagePointer | undefined, fallbackIndex: number) => {
      if (pointer === undefined) return fallbackIndex;
      if (typeof pointer === "number") return pointer;
      return messageIndexById.get(pointer) ?? fallbackIndex;
    },
    [messageIndexById]
  );

  const showNextMessage = useCallback(
    (nextIndex: number) => {
      if (statusRef.current !== "playing") return;
      if (nextIndex >= script.length) {
        setTypingFrom(null);
        pausedMessageIndexRef.current = null;
        setStatusSafe("finished");
        return;
      }

      const nextMessage = script[nextIndex];
      setTypingFrom(nextMessage.from);

      queueTimeout(() => {
        if (statusRef.current !== "playing") return;

        setTypingFrom(null);
        setDisplayedMessages((prev) => [...prev, nextMessage]);
        setCurrentIndex(nextIndex + 1);

        if (nextMessage.awaitUser) {
          pausedMessageIndexRef.current = nextIndex;
          setStatusSafe("paused");
          return;
        }

        pausedMessageIndexRef.current = null;
        const defaultNextIndex = nextIndex + 1;
        const resolvedNextIndex = resolvePointer(
          nextMessage.next,
          defaultNextIndex
        );

        queueTimeout(() => {
          showNextMessage(resolvedNextIndex);
        }, messageDelayMs);
      }, messageDelayMs);
    },
    [messageDelayMs, queueTimeout, resolvePointer, script, setStatusSafe]
  );

  const start = useCallback(() => {
    if (script.length === 0 || statusRef.current === "finished") return;
    clearTimers();
    pausedMessageIndexRef.current = null;
    setStatusSafe("playing");
    showNextMessage(currentIndexRef.current);
  }, [clearTimers, script.length, setStatusSafe, showNextMessage]);

  const pause = useCallback(() => {
    clearTimers();
    setTypingFrom(null);
    setStatusSafe("paused");
  }, [clearTimers, setStatusSafe]);

  const resume = useCallback((index?: number, choice?: string) => {
    if (script.length === 0 || statusRef.current === "finished") return;

    clearTimers();

    let nextStartIndex = currentIndexRef.current;
    if (index !== undefined) {
      nextStartIndex = index + 1;
      setDisplayedMessages((prev) => prev.slice(0, nextStartIndex));
      setCurrentIndex(nextStartIndex);
    }

    if (choice) {
      const branchSourceIndex =
        index ?? pausedMessageIndexRef.current ?? currentIndexRef.current - 1;
      const branchSourceMessage = script[branchSourceIndex];
      const branchPointer =
        branchSourceMessage?.branches?.[choice] ??
        branchSourceMessage?.branches?.["*"];
      nextStartIndex = resolvePointer(branchPointer, nextStartIndex);
    }

    if (nextStartIndex >= script.length) {
      setTypingFrom(null);
      pausedMessageIndexRef.current = null;
      setStatusSafe("finished");
      return;
    }

    pausedMessageIndexRef.current = null;
    setStatusSafe("playing");
    showNextMessage(nextStartIndex);
  }, [clearTimers, resolvePointer, script, setStatusSafe, showNextMessage]);

  const restart = useCallback(() => {
    clearTimers();
    setDisplayedMessages([]);
    setTypingFrom(null);
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    pausedMessageIndexRef.current = null;
    setStatusSafe("idle");
  }, [clearTimers, setStatusSafe]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (previousScriptRef.current === script) return;
    previousScriptRef.current = script;

    clearTimers();
    setDisplayedMessages([]);
    setTypingFrom(null);
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    pausedMessageIndexRef.current = null;
    setStatusSafe("idle");
  }, [clearTimers, script, setStatusSafe]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const value: ChatContextValue = useMemo(
    () => ({
      script,
      displayedMessages,
      typingFrom,
      status,
      currentIndex,
      start,
      pause,
      resume,
      restart,
    }),
    [
      script,
      displayedMessages,
      typingFrom,
      status,
      currentIndex,
      start,
      pause,
      resume,
      restart,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
