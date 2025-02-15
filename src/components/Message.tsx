// src/components/Message.tsx
import React from "react";
import "../index.css";

interface MessageProps {
  text: string;
  sender: "user" | "assistant";
}

const Message: React.FC<MessageProps> = ({ text, sender }) => (
  <div className={`message ${sender}`}>{text}</div>
);

export default Message;
