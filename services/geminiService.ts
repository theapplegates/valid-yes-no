import { GoogleGenAI } from "@google/genai";

export const analyzeKeyWithGemini = async (keyContent: string, technicalInfo: string) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a cryptography expert. 
    Analyze the following text block which claims to be a PGP Public Key.
    
    Technical Extraction Analysis:
    ${technicalInfo}
    
    Raw Key Content (truncated if too large):
    ${keyContent.slice(0, 4000)}

    Provide a concise assessment:
    1. Is this a standard RFC 4880 OpenPGP key?
    2. If it is a custom JSON format wrapped in PGP headers, what does the content structure suggest? (e.g., Post-Quantum Hybrid schemes like X-Wing).
    3. Is it "valid" in a broad sense (as a functional key for a specific tool) even if not standard OpenPGP?
    4. Comment on the security implications of such a format if applicable.
    
    Format the output as Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw error;
  }
};