import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Always use process.env.API_KEY directly when initializing GoogleGenAI. 
// For best results, initialize before each call to ensure the latest key is used.

export const generateGeoArticle = async (keyword: string, platform: string, length: 'short' | 'medium' | 'long' = 'medium') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const lengthPrompt = {
    short: 'around 500 words',
    medium: 'around 1000 words',
    long: 'over 2000 words'
  }[length];

  const systemInstruction = `
    You are a world-class GEO (Generative Engine Optimization) expert. 
    Your goal is to write content that is highly likely to be indexed and cited by AI Search Engines like Perplexity, ChatGPT Search, and Google Gemini.
    
    Principles for GEO:
    1. Clarity & Directness: Answer the user's implicit questions immediately.
    2. Authority: Use professional tone and cite hypothetical or real expert data.
    3. Structure: Use clear H1, H2, and H3 tags. Use bullet points for readability.
    4. Keyword Density: Naturally incorporate the target keyword and related semantic terms.
    5. Entity Linking: Mention relevant brands, people, or technologies in the niche.
    
    Target Platform Style: ${platform}.
  `;

  const prompt = `Write a comprehensive, GEO-optimized article about "${keyword}". 
    The article should be ${lengthPrompt}. 
    Focus on being authoritative and helpful. 
    Format the output with Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const suggestKeywords = async (baseKeyword: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 10 trending and SEO-valuable long-tail keywords related to "${baseKeyword}" for a GEO strategy. Return as a JSON array of objects with 'term' and 'intent' properties.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: {
                type: Type.STRING,
                description: 'The keyword term.',
              },
              intent: {
                type: Type.STRING,
                description: 'The search intent.',
              }
            },
            propertyOrdering: ['term', 'intent']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Keywords Error:", error);
    return [];
  }
};