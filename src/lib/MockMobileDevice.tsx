"use client";

import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { ChatWindow } from "../components/ChatWindow/ChatWindow";
import { Header, type HeaderProps } from "../components/Header/Header";
import {
  Message,
  TypingIndicator,
  type RCSMessageEvent,
} from "../components/Message/Message";
import { PhoneContainer } from "../components/PhoneContainer/PhoneContainer";
import { ChatProvider, useChat } from "../context/ChatContext";

export interface MockMobileDeviceProps {
  script: RCSMessageEvent[];
  autoStart?: boolean;
  messageDelayMs?: number;
  resumeOnTap?: boolean;
  className?: string;
  style?: React.CSSProperties;
  headerProps?: HeaderProps;
}

interface MockMobileDeviceBodyProps {
  autoStart: boolean;
  resumeOnTap: boolean;
  headerProps?: HeaderProps;
}

function MockMobileDeviceBody({
  autoStart,
  resumeOnTap,
  headerProps,
}: MockMobileDeviceBodyProps) {
  const { displayedMessages, typingFrom, start, status } = useChat();
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const lastBotMessageIndex = displayedMessages.reduce((acc, msg, index) => {
    return msg.from === "bot" ? index : acc;
  }, -1);

  useEffect(() => {
    if (autoStart && status === "idle" && displayedMessages.length === 0) {
      start();
    }
  }, [autoStart, displayedMessages.length, start, status]);

  useLayoutEffect(() => {
    if (!chatWindowRef.current) return;
    chatWindowRef.current.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [displayedMessages, typingFrom]);

  const renderMessageContent = (message: RCSMessageEvent) => {
    if (message.text) return message.text;
    if (React.isValidElement(message.component)) return message.component;
    return message.component ?? null;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhoneContainer>
        <Header {...headerProps} />
        <ChatWindow
          chatWindowRef={chatWindowRef as React.RefObject<HTMLDivElement>}
          resumeOnTap={resumeOnTap}
        >
          {displayedMessages.map((message, index) => (
            <Message
              className={message.text ? "txt" : "component"}
              from={message.from}
              key={`${message.from}-${index}`}
              messageIndex={index}
              isLatestBotMessage={
                message.from === "bot" && index === lastBotMessageIndex
              }
            >
              {renderMessageContent(message)}
            </Message>
          ))}
          {typingFrom && <TypingIndicator from={typingFrom} />}
        </ChatWindow>
      </PhoneContainer>
    </Suspense>
  );
}

export function MockMobileDevice({
  script,
  autoStart = true,
  messageDelayMs = 1500,
  resumeOnTap = true,
  className,
  style,
  headerProps,
}: MockMobileDeviceProps) {
  return (
    <div className={className} style={style}>
      <ChatProvider script={script} messageDelayMs={messageDelayMs}>
        <MockMobileDeviceBody
          autoStart={autoStart}
          resumeOnTap={resumeOnTap}
          headerProps={headerProps}
        />
      </ChatProvider>
    </div>
  );
}
