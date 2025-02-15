// src/components/Input.tsx
import React, { useState } from "react";
import "../index.css";

interface InputProps {
  onSendMessage: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend} disabled={!message.trim()}>
        Send
      </button>
    </div>
  );
};

export default Input;