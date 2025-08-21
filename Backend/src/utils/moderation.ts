import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const config = {
  thinkingConfig: {
    thinkingBudget: 0,
  },
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    required: ["category", "allowed"],
    properties: {
      category: { type: Type.STRING },
      allowed: { type: Type.BOOLEAN },
    },
  },
  systemInstruction: [
    {
      text: `You are a content moderation system for a social media platform.`,
    },
  ],
};

const model = "gemini-2.5-flash";

export async function moderateText(input: string) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Classify the following text into categories: 
["safe", "harassment", "hate_speech", "sexual", "violence", "spam", "self_harm"]. 

Rules:
- Casual or expressive language (e.g., "damn", "hell", "crazy game") is SAFE.  
- Only classify as harassment if it is a direct insult, threat, bullying, or targeted attack.  
- Only classify as hate_speech if it insults or dehumanizes a group based on race, gender, religion, sexuality, or similar identity.  
- Only classify as sexual if it is explicit, pornographic, or sexually soliciting. Mild romance/flirting is SAFE.  
- Only classify as violence if it promotes, encourages, or glorifies physical harm, terrorism, gore, or abuse.  
- Only classify as spam if it is repetitive, promotional, scammy, or irrelevant mass content.  
- Only classify as self_harm if it encourages suicide, self-harm, eating disorders, or dangerous behavior.  
- If uncertain, choose the less restrictive category (default to "safe"). 

Text: """${input}"""`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) {
    throw new Error("No moderation response received from Gemini");
  }

  // Parse into your expected type
  const parsed = JSON.parse(text) as {
    category: string;
    allowed: boolean;
  };

  return parsed;
}
