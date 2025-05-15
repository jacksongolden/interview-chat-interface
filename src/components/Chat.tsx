// src/components/Chat.tsx
import React, { useState } from "react";
import Message from "./Message";
import Input from "./Input";
import { fetchChatResponse } from "../utils/api";
import "../index.css";

interface MessageType {
  id: number;
  text: string;
  sender: "user" | "assistant";
}

// Hardcoded chats to fill the sidebar
const CHAT_IDS = ["Typescript tutorial", "AI Evaluators", "Product Engineer"];

const Chat: React.FC = () => {
  const [currentChatId, setCurrentChatId] = useState<string>(CHAT_IDS[0]);
  const [messages, setMessages] = useState<Record<string, MessageType[]>>({});

  // Send user message and receive new assistant response
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newMessages: MessageType[] = [
      ...(messages[currentChatId] || []),
      { id: Math.floor(Date.now()), text: message, sender: "user" }
    ];

    setMessages((prev) => ({
      ...prev,
      [currentChatId]: newMessages
    }));

    try {
      const response = await fetchChatResponse(message);
      setMessages((prev) => ({
        ...prev,
        [currentChatId]: [
          ...(prev[currentChatId] || []),
          { id: Math.floor(Date.now()), text: response, sender: "assistant" }
        ]
      }));
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h3>Chats</h3>
        {CHAT_IDS.map((chatId) => (
          <button
            key={chatId}
            className={`chat-tab ${chatId === currentChatId ? "active" : ""}`}
            onClick={() => setCurrentChatId(chatId)}
          >
            {chatId}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-container">
        <div className="chat-messages">
          {(messages[currentChatId] || []).map((msg) => (
            <Message key={msg.id} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
