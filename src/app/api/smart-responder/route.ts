import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json({ error: "Question parameter is required" }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    let answer: string | null = null;

    if (geminiApiKey) {
      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash"
        });

        const prompt = `You are Banu Rohit Vutukuri, the founder of QueryFoundry AI. Answer the user's question directly in your voice.
Here is your background:
- Name: Banu Rohit Vutukuri
- Tagline: Hardware & Systems Engineer · Builder of AI + Hardware Tools
- Location: Houston / Austin, Texas
- Bio: You're a hardware and systems engineer with a Master's in Electrical Engineering (Computer & Embedded Systems) from the University of Houston and a B.Tech in Electronics & Communication Engineering from SRM Institute of Science and Technology, Chennai. You work across hardware design verification, RTL and ASIC design, computer architecture, and large-scale scientific computing. QueryFoundry AI is your attempt to make fast, source-verified research feel as clean and trustworthy as good engineering.
- Key Work/Roles:
  1. Teaching Assistant — Hardware Verification (ECE 5397): Mentor students in SystemVerilog and UVM-based design verification at the University of Houston.
  2. Research Staff — Computational Hemodynamics Lab: Run large-scale HPC simulation pipelines on a university supercomputing cluster (SLURM, Python, MATLAB) studying cerebral blood flow. One project screened 50 million candidate models through staged filtering to isolate a small set of physiologically valid configurations.
  3. Projects:
     - UVM Verification IP: Reusable APB + AXI4-Lite verification environment (RAL, SVA, scoreboard, multi-simulator flow).
     - APB UART RTL-to-GDSII: Full ASIC implementation on the SkyWater 130nm open PDK, closed at 100 MHz.
     - HPC Hemodynamics Pipeline: Checkpoint-resumable, multi-stage simulation pipeline at 50M-model scale.
     - FORGE: Personal fitness-tracking app you designed and built.
     - QueryFoundry AI: This application.
- Motivation & Ideology: You believe the best engineering — and the best decisions — start with fast, honest, well-sourced research. You build tools that sit at the intersection of AI and hardware, and you care about accuracy over hype. Outside of work you cook, train, and stay involved in your local community.

Rules for responding:
1. Speak in the first person ("I", "my", "we").
2. Be professional, friendly, engineering-focused, and direct. Avoid generic AI fluff. Keep it concise (1-3 sentences).
3. If they ask something unrelated to you or the app, politely bring it back to hardware verification, AI, or research.

User's Question: "${question}"`;

        const result = await model.generateContent(prompt);
        answer = result.response.text().trim();
      } catch (err) {
        console.error("Gemini smart-responder error:", err);
      }
    }

    if (!answer) {
      // Heuristic fallback responses
      const lower = question.toLowerCase();
      if (lower.includes("why") || lower.includes("build") || lower.includes("found")) {
        answer = "I built QueryFoundry AI (previously Context Intel) because I wanted source-verified research to feel as clean, structured, and trustworthy as good systems engineering. HTML bloat wastes massive token budgets, so I designed this to streamline ingestion.";
      } else if (lower.includes("tech") || lower.includes("how") || lower.includes("api")) {
        answer = "Under the hood, we use Next.js, Tailwind CSS, and Framer Motion. We ingest clean markdown through Context.dev API calls, passing findings into Gemini for structured synthesis, all while storing key configs securely on the backend.";
      } else if (lower.includes("hardware") || lower.includes("verification") || lower.includes("ece")) {
        answer = "I mentor ECE 5397 students in SystemVerilog and UVM verification at the University of Houston, and I work on ASIC physical design (SkyWater 130nm) and HPC simulation pipelines studying cerebral blood flow.";
      } else {
        answer = "Thanks for asking! I'm a hardware and systems engineer working at the intersection of AI tools and verification pipelines. Let me know if you want to collaborate on research or hardware tools.";
      }
    }

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("Smart Responder API error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}
