import { GoogleGenAI, Type } from "@google/genai";
import { WordCountOption, DomainStyle } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDomainNames = async (
  keywords: string,
  wordCount: WordCountOption,
  style: DomainStyle
): Promise<string[]> => {
  const modelId = "gemini-3-flash-preview";

  let styleInstruction = "";
  
  // Style-specific instructions
  switch (style) {
    case 'brandable':
      styleInstruction = "Create unique, abstract, made-up, or blended words that sound like high-end brands (e.g., Rolex, Google, Kodak). These should NOT necessarily be real dictionary words, but must be pronounceable.";
      break;
    case 'evocative':
      styleInstruction = "Use metaphorical, emotional, or imagery-rich words that hint at the business benefits rather than describing it directly (e.g., RedBull, BlueOrigin, Forever21).";
      break;
    case 'phrase':
      styleInstruction = "Create short, punchy action phrases or descriptive phrases (e.g., DollarShaveClub, StumbleUpon).";
      break;
    case 'compound':
      styleInstruction = "Combine two distinct valid English words to form a new compound name (e.g., FedEx, Facebook, Microsoft, YouTube).";
      break;
    case 'alternate':
      styleInstruction = "Use creative misspellings of English words, dropping vowels, or swapping letters (e.g., Lyft, Tumblr, Flickr, Fiverr).";
      break;
    case 'foreign':
      styleInstruction = "Use non-English words (Latin, Italian, Japanese, etc.) that sound elegant and are relevant to the theme (e.g., Toyota, Audi, Terra).";
      break;
    case 'real':
      styleInstruction = "STRICTLY use valid, standard English dictionary words only. No misspellings, no made-up words (e.g., Apple, Amazon, Slack).";
      break;
    case 'auto':
    default:
      styleInstruction = "Generate a diverse mix of styles: some real words, some brandable/made-up, some compounds, and some creative misspellings.";
      break;
  }

  const prompt = `
    Generate exactly 100 domain name ideas (SLD only, do not include .com).
    
    Context:
    - Keywords/Theme: "${keywords || 'tech startup future'}"
    - Target Length: Approximately ${wordCount} word(s) (visually or phonetically).
    
    Style Guidelines (${style.toUpperCase()}):
    ${styleInstruction}
    
    Constraints:
    1. Return ONLY the JSON array of strings. No markdown formatting.
    2. Ensure names are safe for work and professional.
    3. Do not include the TLD (.com).
    4. If the style is 'brandable' or 'alternate', do not enforce strict dictionary checking.
    5. If the style is 'real', you MUST use valid dictionary words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const parsed = JSON.parse(jsonStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Gemini generation failed:", error);
    return [];
  }
};
