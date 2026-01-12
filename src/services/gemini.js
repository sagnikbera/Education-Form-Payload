// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAxm503KYLgeMaVnDVs997mo95_KICrNYI");

export const generateQuestions = async (topic, count) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Generate a JSON array of ${count} quiz questions about "${topic}". 
  Each object must have exactly these keys: 
  "id": number,
  "question": string,
  "options": array of 4 strings,
  "correctAnswer": number (0-3).
  Return ONLY the raw JSON array. No markdown, no backticks.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  
  // Robust JSON cleaning
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  const cleanJson = text.substring(start, end + 1);
  
  return JSON.parse(cleanJson);
};