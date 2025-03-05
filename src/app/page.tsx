// src/app/page.tsx
"use client";
import React, { useRef, useEffect } from "react";
import {
  Message,
  type RCSMessageEvent,
  TypingIndicator,
} from "../components/Message/Message";
import { ChatWindow } from "../components/ChatWindow/ChatWindow";
import { QuickReplies } from "../components/QuickReplies/QuickReplies";
import UndoIcon from "@mui/icons-material/Undo";
import { useChat } from "../context/ChatContext";

export default function RcsDemo() {
  const {
    displayedMessages,
    typingFrom,
    messageIndex,
    // showTyping,
    handleQuickReply,
    handleRestart,
  } = useChat();

  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Always scroll to bottom on new messages or typing changes
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTo({
        top: chatWindowRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedMessages, typingFrom]);

  // Utility to inject onSelect for QuickReplies
  function addOnSelectToQuickReplies(node: React.ReactNode): React.ReactNode {
    if (React.isValidElement(node)) {
      if (node.type === QuickReplies) {
        return React.cloneElement(
          node as React.ReactElement<{
            options: string[];
            onSelect?: (option: string) => void;
          }>,
          { onSelect: handleQuickReply }
        );
      }
      const element = node as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      if (element.props.children) {
        return React.cloneElement(element, {
          children: React.Children.map(
            element.props.children,
            addOnSelectToQuickReplies
          ),
        });
      }
    }
    return node;
  }

  return (
    <>
      <ChatWindow
        chatWindowRef={chatWindowRef as React.RefObject<HTMLDivElement>}
      >
        {displayedMessages.map((msg: RCSMessageEvent, i: number) => {
          let content = msg.text ? msg.text : msg.component;
          if (msg.awaitUser && msg.component) {
            content = addOnSelectToQuickReplies(msg.component);
          }
          return (
            <Message
              className={msg.text ? "txt" : "component"}
              from={msg.from}
              key={`${msg.from}-${i}`}
            >
              {content}
            </Message>
          );
        })}
        {typingFrom && <TypingIndicator from={typingFrom} />}
      </ChatWindow>
      {messageIndex >= displayedMessages.length && messageIndex > 0 && (
        <button onClick={handleRestart} type="button">
          <UndoIcon style={{ marginRight: "8px" }} />
          Restart Demo
        </button>
      )}
    </>
  );
}
