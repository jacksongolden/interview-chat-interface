// src/utils/api.ts
import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface OpenAIResponse {
  choices: { message: { content: string } }[];
}

export const fetchChatResponse = async (message: string): Promise<string> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await axios.post<OpenAIResponse>(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    console.error("API error:", error);
    return "Error fetching response";
  }
};