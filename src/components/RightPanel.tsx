"use client";

import { Activity, ShieldCheck, HeartPulse, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface RightPanelProps {
  isLoading: boolean;
  metadata?: {
    credits_consumed?: number;
    credits_remaining?: number;
  };
  hasData: boolean;
  depth: string;
  imagesEnabled: boolean;
  screenshotsEnabled: boolean;
  isFallback: boolean;
  isMock: boolean;
}

export default function RightPanel({
  isLoading,
  metadata,
  hasData,
  depth,
  imagesEnabled,
  screenshotsEnabled,
  isFallback,
  isMock
}: RightPanelProps) {
  
  const features = [
    { name: "Compile Executive PDF Briefing", desc: "Build print-ready report", action: "pdf" },
    { name: "Convert to LinkedIn Post", desc: "AI-summarized promotional post", action: "linkedin" },
    { name: "Compare Sources Side-by-Side", desc: "Inspect conflicting claims", action: "compare" },
    { name: "Export Clean Markdown Brief", desc: "Download GFM file format", action: "markdown" }
  ];

  return (
    <aside className="glass-panel p-6 flex flex-col h-full gap-6 select-none bg-black/40 border border-cyber-purple/15">
      {/* Agent Status Panel */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-purple/80 flex items-center gap-1.5 uppercase pb-2 border-b border-white/5">
          <Activity className="w-3.5 h-3.5" />
          Research Node Status
        </h3>

        <div className="bg-black/60 p-4 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Connection Status</span>
            {isLoading ? (
              <span className="text-cyber-pink flex items-center gap-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-cyber-pink animate-ping" />
                ACTIVE
              </span>
            ) : hasData ? (
              <span className="text-cyber-purple flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SYNCED
              </span>
            ) : (
              <span className="text-white/40 font-mono">IDLE</span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Freshness Window</span>
            <strong className="text-white">Today (Real-time)</strong>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Active Depth</span>
            <strong className="text-cyber-pink font-mono capitalize">{depth}</strong>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-white/40">Rich Assets</span>
            <strong className="text-white">{imagesEnabled || screenshotsEnabled ? "Enabled" : "Disabled"}</strong>
          </div>

          {hasData && (
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Credits Consumed</span>
                <span className="text-cyber-pink font-mono flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  {metadata?.credits_consumed ?? (isMock ? 0 : 1)} CR
                </span>
              </div>
              
              {metadata?.credits_remaining !== undefined && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Credits Remaining</span>
                  <strong className="text-white font-mono">{metadata.credits_remaining} CR</strong>
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Data Fidelity</span>
                {isMock ? (
                  <span className="text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-1.5 py-0.5 rounded text-[10px] font-mono">MOCK FALLBACK</span>
                ) : isFallback ? (
                  <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded text-[10px] font-mono">HEURISTIC ONLY</span>
                ) : (
                  <span className="text-cyber-purple bg-cyber-purple/10 border border-cyber-purple/20 px-1.5 py-0.5 rounded text-[10px] font-mono">LIVE AI SYNC</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Features / Tools */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-purple/80 flex items-center gap-1.5 uppercase pb-2 border-b border-white/5 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          Downstream Utilities
        </h3>

        <div className="space-y-2.5 overflow-y-auto pr-1">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01, x: 2 }}
              className="p-3 bg-white/2 hover:bg-cyber-purple/5 border border-white/3 hover:border-cyber-purple/10 rounded-2xl transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white group-hover:text-cyber-pink transition-colors">{f.name}</h4>
                <p className="text-[10px] text-white/40 truncate">{f.desc}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-cyber-pink flex-shrink-0 transition-all group-hover:translate-x-0.5" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workspace Note */}
      <div className="p-4 bg-cyber-purple/5 border border-cyber-purple/10 rounded-2xl text-[10px] text-purple-400/50 leading-relaxed font-mono flex gap-2">
        <HeartPulse className="w-4 h-4 text-cyber-pink flex-shrink-0 mt-0.5" />
        <div>
          This intelligence node operates inside Next.js secure backend environments. Data API calls bypass front-facing scripts and execute securely on the server.
        </div>
      </div>
    </aside>
  );
}
