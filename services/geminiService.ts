
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this environment, we assume API_KEY is set.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateStudentBio = async (keywords: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is unavailable. Please configure the API key.";
  }

  try {
    const prompt = `You are a helpful assistant for a school administrator. Based on the following keywords, write a positive and encouraging one-paragraph student profile bio. The bio should be concise and suitable for a school management system. Keywords: "${keywords}"`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating student bio:", error);
    return "An error occurred while generating the bio. Please try again.";
  }
};
