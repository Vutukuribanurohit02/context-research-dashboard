"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, AlertTriangle, HelpCircle, CheckCircle, XCircle, 
  ExternalLink, Sparkles, Scale, RefreshCw, Layers 
} from "lucide-react";

interface Evidence {
  sourceTitle: string;
  url: string;
  snippet: string;
  relationship: "supports" | "contradicts" | "neutral";
}

interface VerificationResult {
  status: "Verified" | "Likely True" | "Partially True" | "Uncertain" | "Misleading" | "False" | "Outdated" | "Not Enough Evidence";
  confidence: number;
  explanation: string;
  revisedClaim: string;
  evidence: Evidence[];
}

interface TruthCheckPanelProps {
  initialClaim?: string;
  theme: "cyber" | "spatial" | "quantum" | "robotics";
}

export default function TruthCheckPanel({ initialClaim = "", theme }: TruthCheckPanelProps) {
  const [claim, setClaim] = useState(initialClaim);
  const [mode, setMode] = useState<"quick" | "deep" | "compare">("quick");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialClaim) {
      setClaim(initialClaim);
      // Auto-trigger search when initialized with prefilled values
      handleVerify(initialClaim);
    }
  }, [initialClaim]);

  const handleVerify = async (claimText: string = claim) => {
    const trimmed = claimText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/verify-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: trimmed, mode })
      });

      if (!res.ok) {
        throw new Error("Failed to verify claim");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during claim verification");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
      case "Likely True":
        return "text-[#39ff88] border-[#39ff88]/30 bg-[#39ff88]/5 shadow-[0_0_15px_rgba(57,255,136,0.15)]";
      case "Partially True":
      case "Uncertain":
      case "Outdated":
        return "text-yellow-400 border-yellow-400/30 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.15)]";
      case "Misleading":
      case "False":
        return "text-red-500 border-red-500/30 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
      default:
        return "text-white/70 border-white/10 bg-white/5";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
      case "Likely True":
        return <CheckCircle className="w-5 h-5 text-[#39ff88] shrink-0" />;
      case "Partially True":
      case "Uncertain":
      case "Outdated":
        return <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />;
      case "Misleading":
      case "False":
        return <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
      default:
        return <HelpCircle className="w-5 h-5 text-white/50 shrink-0" />;
    }
  };

  const getRelationshipColor = (rel: string) => {
    if (rel === "supports") return "text-[#39ff88] bg-[#39ff88]/10";
    if (rel === "contradicts") return "text-red-400 bg-red-400/10";
    return "text-white/40 bg-white/5";
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Top Panel: Claim Input */}
      <section className="glass-panel p-8 relative overflow-hidden bg-black/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-pink-glow/5 filter blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-semibold text-cyber-pink bg-cyber-purple-dim border border-cyber-purple-glow/20 rounded-full">
                <Scale className="w-3.5 h-3.5 text-cyber-pink animate-pulse" />
                TruthCheck AI &bull; Source Verifier
              </span>
              <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                Context-Aware Fact Checking
              </span>
            </div>

            <div className="flex bg-black/60 border border-white/5 p-1 rounded-xl font-mono text-[10px]">
              {(["quick", "deep", "compare"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                    mode === m 
                      ? "bg-cyber-purple text-black font-extrabold" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {m} Check
                </button>
              ))}
            </div>
          </div>

          {/* Title & Desc */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Verify Factual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink filter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Claims Instantly.</span>
            </h1>
            <p className="text-white/60 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
              Paste any statement, news claim, or hardware parameter. We'll crawl live indices, query primary databases, identify contradictory facts, and compile a structured truth profile.
            </p>
          </div>

          {/* Claim Search Bar */}
          <div className="flex items-center gap-2 bg-black/60 border border-cyber-purple/35 focus-within:border-cyber-purple/70 p-1.5 rounded-2xl transition-all shadow-[0_0_25px_rgba(0,0,0,0.6)]">
            <div className="pl-3 text-white/40 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyber-purple" />
            </div>
            <input
              type="text"
              placeholder="Paste a claim to check (e.g. NVIDIA Blackwell uses TSMC 4NP co-packaged architecture)..."
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleVerify()}
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-sm text-white placeholder-white/30 font-sans"
            />
            <button
              type="button"
              onClick={() => handleVerify()}
              disabled={isLoading || !claim.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-[#c084fc] hover:to-[#f472b6] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed select-none"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify Claim"
              )}
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 mt-1">
            <span className="font-mono">Common checks:</span>
            {[
              "SkyWater 130nm APB UART runs at 100MHz",
              "Supercomputing staged filters screened 50M hemodynamic models",
              "The Earth is flat according to physics"
            ].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  if (!isLoading) {
                    setClaim(t);
                    handleVerify(t);
                  }
                }}
                disabled={isLoading}
                className="px-2.5 py-1 bg-black/40 hover:bg-cyber-purple/10 border border-cyber-purple/20 hover:border-cyber-purple/50 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer text-left max-w-xs truncate disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Results Area */}
      <div className="flex-1 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 glass-panel flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full border border-cyber-purple/20 flex items-center justify-center relative mb-4">
                <ShieldCheck className="w-8 h-8 text-cyber-purple animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-t-cyber-pink border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase tracking-wider">Verifying Fact Accuracy</h3>
              <p className="text-xs text-white/40 max-w-md leading-relaxed mb-1">
                Consulting live Context.dev web indices, fetching primary source markdowns, and evaluating logical consistency.
              </p>
              <span className="text-[10px] text-cyber-purple font-mono animate-pulse">Running semantic RAG verification...</span>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8"
            >
              <div className="glass-panel p-8 border-red-500/20 max-w-lg text-center flex flex-col items-center gap-4 bg-red-500/5 backdrop-blur-md">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 animate-bounce">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono uppercase">Verification Failed</h3>
                <p className="text-xs text-red-400 font-mono leading-relaxed">
                  Error: {error}
                </p>
                <button
                  type="button"
                  onClick={() => handleVerify()}
                  className="mt-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Retry Verification
                </button>
              </div>
            </motion.div>
          ) : result ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Left Column: Status Badge, Dial, Explanation (Span 2) */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="glass-panel p-6 bg-black/40 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${getStatusColor(result.status)}`}>
                        {getStatusIcon(result.status)}
                        <span className="text-sm font-extrabold font-mono uppercase tracking-wider">{result.status}</span>
                      </div>
                    </div>

                    {/* Confidence Meter */}
                    <div className="flex items-center gap-3 bg-white/2 border border-white/5 px-4.5 py-2.5 rounded-2xl">
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] font-mono text-white/40 uppercase">Confidence</span>
                        <span className="text-base font-black text-white font-mono">{result.confidence}%</span>
                      </div>
                      {/* Micro glowing progress bar */}
                      <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Explanation Section */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono text-white/40 uppercase select-none">Evidence Evaluation</h4>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      {result.explanation}
                    </p>
                  </div>

                  {/* Fix This Claim Revision Panel */}
                  {result.revisedClaim && result.status !== "Verified" && result.status !== "Likely True" && (
                    <div className="p-4.5 bg-cyber-pink-dim/10 border border-cyber-pink-glow/20 rounded-2xl space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-pink-glow/5 filter blur-xl pointer-events-none" />
                      <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-pink font-bold uppercase select-none">
                        <Sparkles className="w-4 h-4 text-cyber-pink animate-spin" style={{ animationDuration: "4s" }} />
                        Suggested Factual Correction (Fix This Claim)
                      </div>
                      <div className="text-white font-bold text-xs bg-black/60 p-3 rounded-xl border border-white/5 leading-relaxed">
                        "{result.revisedClaim}"
                      </div>
                      <p className="text-[10px] text-white/45">
                        This correction was rewritten by evaluating contradicting claims found in the verified sources.
                      </p>
                    </div>
                  )}
                </div>

                {/* Evidence Details */}
                <div className="glass-panel p-6 bg-black/40 space-y-4">
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5 select-none">
                    <Layers className="w-4 h-4 text-cyber-purple" />
                    Source Evidence Map
                  </h3>

                  <div className="space-y-4">
                    {result.evidence.map((ev, index) => (
                      <div key={index} className="p-4 bg-white/2 border border-white/5 rounded-2xl flex flex-col gap-2 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs font-bold text-white truncate max-w-md">{ev.sourceTitle}</span>
                          <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase ${getRelationshipColor(ev.relationship)}`}>
                            {ev.relationship}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 font-sans leading-relaxed italic bg-black/30 p-2.5 rounded-xl border border-white/5">
                          "{ev.snippet}"
                        </p>
                        <a
                          href={ev.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-end inline-flex items-center gap-1 text-[10px] font-mono text-cyber-purple hover:text-cyber-pink transition-colors cursor-pointer select-none"
                        >
                          Verify Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Source Verification Lists */}
              <div className="flex flex-col gap-6">
                <div className="glass-panel p-6 bg-black/40 flex-1 space-y-4">
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider select-none">Consensus Board</h3>
                  
                  <div className="space-y-4">
                    {/* Supporting Sources */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-white/40 uppercase">Supporting Sources</span>
                      <div className="space-y-2">
                        {result.evidence.filter(e => e.relationship === "supports").map((ev, i) => (
                          <div key={i} className="p-3 bg-[#39ff88]/5 border border-[#39ff88]/15 rounded-xl flex items-center justify-between gap-4">
                            <span className="text-xs text-white/80 truncate shrink-0 max-w-[150px]">{ev.sourceTitle}</span>
                            <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-cyber-purple hover:text-cyber-pink cursor-pointer shrink-0">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ))}
                        {result.evidence.filter(e => e.relationship === "supports").length === 0 && (
                          <div className="text-[10px] text-white/30 italic">No supporting references found.</div>
                        )}
                      </div>
                    </div>

                    {/* Contradicting Sources */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-white/40 uppercase">Contradicting Sources</span>
                      <div className="space-y-2">
                        {result.evidence.filter(e => e.relationship === "contradicts").map((ev, i) => (
                          <div key={i} className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl flex items-center justify-between gap-4">
                            <span className="text-xs text-white/80 truncate shrink-0 max-w-[150px]">{ev.sourceTitle}</span>
                            <a href={ev.url} target="_blank" rel="noopener noreferrer" className="text-cyber-purple hover:text-cyber-pink cursor-pointer shrink-0">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ))}
                        {result.evidence.filter(e => e.relationship === "contradicts").length === 0 && (
                          <div className="text-[10px] text-white/30 italic">No contradicting references found.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 glass-panel flex flex-col items-center justify-center p-8 text-center bg-black/10 border-dashed border-white/5"
            >
              <div className="w-16 h-16 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mb-4 text-white/30">
                <ShieldCheck className="w-8 h-8 text-cyber-purple/60" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase">Verification Standby</h3>
              <p className="text-xs text-white/40 max-w-sm leading-relaxed">
                Enter a factual claim above to analyze. The system will search Context.dev, isolate conflicting numbers or specifications, and deliver verification status.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
