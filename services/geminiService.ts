import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ClarityResult } from "../types";

// Define the expected schema for the output
const claritySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    coreProblem: {
      type: Type.STRING,
      description: "The distilled core problem or source of confusion.",
    },
    knowns: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of facts, assumptions, or feelings that are explicitly known.",
    },
    unclear: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ambiguities, missing information, or doubts.",
    },
    concepts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key concepts or mental models required to understand the situation.",
    },
    clarityPath: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
      },
      description: "A step-by-step path to achieving clarity or learning.",
    },
  },
  required: ["coreProblem", "knowns", "unclear", "concepts", "clarityPath"],
};

export const analyzeThoughts = async (inputText: string): Promise<ClarityResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    You are a Cognitive Clarity Engine. 
    Your job is to convert messy, emotional, or confused thoughts into structured understanding.
    
    Rules:
    1. Do NOT answer the problem immediately.
    2. First, extract the core confusion.
    3. Break it into concepts, unknowns, and assumptions.
    4. Provide a learning or thinking path.
    5. Be empathetic but objective. Use clear, concise language.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using Pro for better reasoning on abstract concepts
      contents: inputText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: claritySchema,
        temperature: 0.2, // Low temperature for consistent, structured output
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(text) as ClarityResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
