
import { GoogleGenAI, Type } from "@google/genai";

export async function getStyleRecommendations(faceShape: string, preferences: string) {
  // Always initialize with process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Recommend 3 trendy hairstyles for someone with a ${faceShape} face shape and preferences for ${preferences}. Return the recommendations as a simple JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["name", "description", "reason"]
              }
            }
          },
          required: ["recommendations"]
        }
      },
    });
    
    // Access response.text directly (it is a property, not a function)
    const json = response.text ? JSON.parse(response.text) : { recommendations: [] };
    return json;
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return { recommendations: [] };
  }
}
