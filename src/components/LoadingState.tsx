"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Terminal, Search, Globe, Eye, Sparkles, Cpu } from "lucide-react";

interface LoadingStateProps {
  query: string;
}

const TICKER_MESSAGES = [
  { text: "Agent initialized in deep research mode", icon: Bot },
  { text: "Formulating query variants & planning search paths", icon: Search },
  { text: "Executing live search query on Context.dev API...", icon: Globe },
  { text: "Scanning web index for today's fresh documentation...", icon: Globe },
  { text: "Bypassing anti-bot checks and rotating proxy networks...", icon: Cpu },
  { text: "Ingesting raw webpage HTML structures...", icon: Terminal },
  { text: "Converting raw pages to clean, token-efficient Markdown...", icon: Terminal },
  { text: "Scraping brand assets, layouts, and image listings...", icon: Eye },
  { text: "Generating real-time screen captures for top results...", icon: Eye },
  { text: "Synthesizing unstructured markdown data to semantic JSON...", icon: Sparkles },
  { text: "Aligning claim citations to source URLs...", icon: Sparkles },
  { text: "Finalizing cyber-research intelligence dashboard...", icon: Bot }
];

export default function LoadingState({ query }: LoadingStateProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add the first message immediately
    setLogs([TICKER_MESSAGES[0].text]);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next < TICKER_MESSAGES.length) {
          setLogs((prevLogs) => [...prevLogs, TICKER_MESSAGES[next].text]);
          return next;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = TICKER_MESSAGES[Math.min(currentStep, TICKER_MESSAGES.length - 1)].icon;

  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyber-green/5 filter blur-[80px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-[#00ffcc]/5 filter blur-[90px] animate-pulse-glow" />

      {/* Cyber Glowing Chat Flare (Floating Agent Orb) */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-cyber-green via-[#00e1bb] to-[#020403] p-[1.5px] shadow-[0_0_50px_rgba(57,255,136,0.35)]"
        >
          <div className="w-full h-full rounded-full bg-[#040806] flex items-center justify-center relative overflow-hidden group">
            {/* Spinning scanner line inside orb */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_50%,rgba(57,255,136,0.15))] animate-spin" style={{ animationDuration: "3s" }} />
            
            {/* Pulsating core */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-20 h-20 rounded-full bg-cyber-green/5 blur-md"
            />
            
            <ActiveIcon className="w-10 h-10 text-cyber-green relative z-20 filter drop-shadow-[0_0_8px_rgba(57,255,136,0.8)]" />
          </div>
        </motion.div>

        {/* Outer orbital rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border border-cyber-green/20 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border border-cyber-green/10 rounded-full animate-pulse" />
      </div>

      {/* Status Indicators */}
      <h3 className="text-xl font-bold tracking-tight text-white mb-2 text-center">
        Context Agent researching <span className="text-cyber-green font-mono">"{query}"</span>
      </h3>
      <p className="text-sm text-emerald-400/60 mb-8 font-mono animate-pulse">
        Status: SCANNING LIVE INDEXES...
      </p>

      {/* Rolling Console Terminal */}
      <div className="w-full max-w-xl glass-panel p-6 border border-cyber-green/10 bg-black/45 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/80 shadow-[0_0_6px_#39ff88]" />
            <span className="text-[11px] font-mono text-white/40 ml-2">AGENT_LOGS.sh</span>
          </div>
          <span className="text-[11px] font-mono text-cyber-green">API_CONNECTED: 200</span>
        </div>

        <div className="h-44 overflow-y-auto font-mono text-xs text-white/70 space-y-2 flex flex-col justify-end">
          <AnimatePresence initial={false}>
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-2 ${
                  index === logs.length - 1 ? "text-cyber-green font-bold" : "text-white/60"
                }`}
              >
                <span className="text-cyber-green/50 select-none">&gt;&gt;</span>
                <span>{log}</span>
                {index === logs.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-3 bg-cyber-green ml-0.5"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
