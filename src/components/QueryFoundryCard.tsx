"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target, Layers, FileText, CheckCircle } from "lucide-react";

interface QueryFoundryResult {
  direction: string;
  keywords: string[];
  sources: string[];
  suggestedMode: "quick" | "standard" | "deep";
  confidence: number;
}

interface QueryFoundryCardProps {
  onOpenInDashboard: (query: string, mode: "quick" | "standard" | "deep") => void;
}

export default function QueryFoundryCard({ onOpenInDashboard }: QueryFoundryCardProps) {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryFoundryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/query-foundry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: topic })
      });

      if (!res.ok) {
        throw new Error("Failed to generate research starting point");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during query generation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 bg-black/60 border border-cyber-purple/35 hover:border-cyber-purple/60 focus-within:border-cyber-purple/70 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full group">
      {/* Ambient background glow inside card */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-purple-glow/5 filter blur-2xl pointer-events-none group-hover:bg-cyber-purple-glow/10 transition-colors" />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyber-purple-dim border border-cyber-purple-glow/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyber-purple" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Query Foundry</h3>
              <p className="text-[10px] text-white/40">AI-Powered Research Architect</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono font-bold text-cyber-pink bg-cyber-pink-dim border border-cyber-pink-glow/20 rounded-full animate-pulse">
            Ready
          </span>
        </div>

        <p className="text-white/60 text-xs leading-relaxed font-sans">
          Type an idea, keyword, or claims to generate a structured starting point, prefilled search parameters, and recommended exploration modes.
        </p>

        {/* Input area */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Type a research idea (e.g. SystemVerilog UVM RAL, HPC Hemodynamics)..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleGenerate()}
            disabled={isLoading}
            className="w-full bg-black/80 border border-cyber-purple/30 focus:border-cyber-purple rounded-xl px-3.5 py-3 text-xs text-white placeholder-white/30 outline-none transition-all font-sans"
          />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="w-full py-2.5 bg-cyber-purple hover:bg-cyber-purple/80 text-black font-extrabold text-xs rounded-xl transition-all cursor-pointer disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-[0_0_15px_var(--theme-primary-dim)] select-none hover:shadow-[0_0_22px_var(--theme-primary-glow)] font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isLoading ? "Forging Plan..." : "Generate Starting Point"}
          </button>
        </div>

        {/* Result Block */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-4 flex flex-col items-center justify-center gap-2 border-t border-white/5 mt-4"
            >
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-cyber-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-cyber-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-cyber-purple animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-[10px] text-white/45 font-mono">Synthesizing parameters...</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-400 font-mono mt-4"
            >
              Error: {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-t border-white/5 pt-4 space-y-3.5 mt-4"
            >
              {/* Direction */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-cyber-purple font-bold">
                  <Target className="w-3.5 h-3.5" /> RESEARCH DIRECTION
                </div>
                <p className="text-white/80 text-[11px] font-sans leading-relaxed pl-4.5 border-l border-cyber-purple/20">
                  {result.direction}
                </p>
              </div>

              {/* Keywords */}
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[10px] font-mono text-cyber-purple font-bold">
                  <FileText className="w-3.5 h-3.5" /> SUGGESTED KEYWORDS
                </div>
                <div className="flex flex-wrap gap-1.5 pl-4.5">
                  {result.keywords.map((kw) => (
                    <span key={kw} className="px-2 py-0.5 bg-black/40 border border-white/10 rounded-md text-[10px] text-white/70">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode & Confidence Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-black/30 border border-white/5 p-2 rounded-lg flex flex-col justify-center">
                  <span className="text-white/40 uppercase">Recommended Mode</span>
                  <span className="text-cyber-pink font-bold mt-0.5 capitalize flex items-center gap-1">
                    <Layers className="w-3 h-3" /> {result.suggestedMode}
                  </span>
                </div>
                <div className="bg-black/30 border border-white/5 p-2 rounded-lg flex flex-col justify-center">
                  <span className="text-white/40 uppercase">Confidence Score</span>
                  <span className="text-cyber-purple font-bold mt-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {result.confidence}%
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onOpenInDashboard(topic, result.suggestedMode)}
                className="w-full py-2 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-cyber-purple/90 hover:to-cyber-pink/90 text-white font-extrabold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-[0_0_15px_var(--theme-primary-dim)] font-mono"
              >
                Open in Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
