import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    let resultJson: any = null;

    if (geminiApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `You are a research planner. The user wants to research: "${query}".
Break this query down into a structured research starting point. Return a JSON object matching this structure:
{
  "direction": "A short 1-2 sentence description of the recommended research angle.",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "sources": ["source1.org", "source2.com"],
  "suggestedMode": "quick" | "standard" | "deep",
  "confidence": number // integer from 0 to 100 representing how confident you are in this research path
}
Return ONLY valid JSON.`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        resultJson = JSON.parse(responseText.trim());
      } catch (err) {
        console.error("Gemini Query Foundry error:", err);
      }
    }

    if (!resultJson) {
      // Heuristic fallback
      const keywords = [query.trim(), `${query.trim()} architecture`, `${query.trim()} analysis`].slice(0, 3);
      const sources = ["arxiv.org", "techcrunch.com", "reuters.com"];
      let suggestedMode: "quick" | "standard" | "deep" = "standard";
      
      const lower = query.toLowerCase();
      if (lower.includes("nvidia") || lower.includes("blackwell") || lower.includes("hpc")) {
        suggestedMode = "deep";
      } else if (lower.includes("news") || lower.includes("current")) {
        suggestedMode = "quick";
      }

      resultJson = {
        direction: `Investigate the key developments, implementation protocols, and industrial relevance of "${query}".`,
        keywords,
        sources,
        suggestedMode,
        confidence: 85
      };
    }

    return NextResponse.json(resultJson);
  } catch (error: any) {
    console.error("Query Foundry API error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}
