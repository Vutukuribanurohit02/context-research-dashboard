"use client";

import { useState, useEffect } from "react";
import { Search, Flame, Terminal, HelpCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import LoadingState from "@/components/LoadingState";
import DashboardGrid from "@/components/DashboardGrid";

interface Filters {
  depth: "quick" | "standard" | "deep";
  includeImages: boolean;
  includeScreenshots: boolean;
  sourceTypes: "all" | "news" | "papers" | "blogs" | "company_pages";
}

interface ResearchWorkspaceProps {
  theme: "cyber" | "spatial" | "quantum" | "robotics";
  onBackToHome: () => void;
}

export default function ResearchWorkspace({ theme, onBackToHome }: ResearchWorkspaceProps) {
  const [query, setQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<any | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    depth: "standard",
    includeImages: true,
    includeScreenshots: true,
    sourceTypes: "all"
  });

  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  // Load history from localStorage on mount (prevents SSR hydration issues)
  useEffect(() => {
    try {
      const history = localStorage.getItem("context_search_history");
      if (history) {
        setSavedSearches(JSON.parse(history));
      }
    } catch (err) {
      console.error("Failed to load search history:", err);
    }
  }, []);

  const handleSearch = async (searchQuery: string = query) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);
    setActiveSearchQuery(trimmed);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: trimmed,
          depth: filters.depth,
          includeImages: filters.includeImages,
          includeScreenshots: filters.includeScreenshots,
          sourceTypes: filters.sourceTypes
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch research data");
      }

      setResultData(data);

      // Save to search history
      setSavedSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
        const updated = [trimmed, ...filtered].slice(0, 15); // limit to 15 items
        try {
          localStorage.setItem("context_search_history", JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to save history:", e);
        }
        return updated;
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during research synthesis");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSavedSearch = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  const handleClearHistory = () => {
    setSavedSearches([]);
    try {
      localStorage.removeItem("context_search_history");
    } catch (e) {
      console.error("Failed to remove history:", e);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_320px] gap-6 min-h-[calc(100vh-48px)]">
      
      {/* Left Sidebar */}
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        savedSearches={savedSearches}
        onSelectSearch={handleSelectSavedSearch}
        onClearHistory={handleClearHistory}
        isLoading={isLoading}
      />

      {/* Center Main Workspace */}
      <main className="flex flex-col gap-6 min-h-[calc(100vh-48px)]">
        
        {/* Top Hero Section */}
        <section className="glass-panel p-8 relative overflow-hidden bg-black/30">
          {/* Ambient edge glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple-glow/5 filter blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-semibold text-cyber-pink bg-cyber-purple-dim border border-cyber-purple-glow/20 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-cyber-pink animate-pulse" />
                  Live AI Research Intelligence
                </span>
                <span className="text-[10px] font-mono text-white/30 hidden sm:inline">
                  Node v1.0.0 &bull; Context.dev Enabled
                </span>
              </div>
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-1 text-xs text-white/50 hover:text-cyber-pink transition-colors font-mono cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Turn Keywords into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink filter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Live Intelligence.</span>
              </h1>
              <p className="text-white/60 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
                Search today's web, scrape structured markdown content, capture screenshots, extract dynamic image assets, and generate a premium research board with verifiable citations.
              </p>
            </div>

            {/* Main Search Box */}
            <div className="mt-4 flex items-center gap-2 bg-black/60 border border-cyber-purple/35 focus-within:border-cyber-purple/70 p-1.5 rounded-2xl transition-all shadow-[0_0_25px_rgba(0,0,0,0.6)]">
              <div className="pl-3 text-white/40 flex-shrink-0">
                <Search className="w-5 h-5 text-cyber-purple" />
              </div>
              <input
                type="text"
                placeholder="Enter research keywords (e.g. NVIDIA Blackwell, agentic RAG, quantum internet)..."
                className="flex-1 bg-transparent border-0 outline-none px-2 py-3 text-sm text-white placeholder-white/30 font-sans"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSearch()}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSearch()}
                disabled={isLoading || !query.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-[#c084fc] hover:to-[#f472b6] text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                Research
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 mt-1">
              <span className="font-mono">Quick templates:</span>
              {["NVIDIA Blackwell", "Agentic RAG", "Quantum Computing"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    if (!isLoading) {
                      setQuery(t);
                      handleSearch(t);
                    }
                  }}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-black/40 hover:bg-cyber-purple/10 border border-cyber-purple/20 hover:border-cyber-purple/50 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  {t}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Results Area */}
        <div className="flex-1 flex flex-col min-h-[500px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <LoadingState query={activeSearchQuery} />
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
                  <h3 className="text-lg font-bold text-white">Research Synthesis Failed</h3>
                  <p className="text-xs text-red-400 font-mono leading-relaxed">
                    Error: {error}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleSearch()}
                    className="mt-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Retry Synthesis
                  </button>
                </div>
              </motion.div>
            ) : resultData ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex flex-col"
              >
                <DashboardGrid data={resultData} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 glass-panel flex flex-col items-center justify-center p-8 text-center bg-black/10 border-dashed border-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-white/2 border border-white/5 flex items-center justify-center mb-4 text-white/30">
                  <Terminal className="w-8 h-8 text-cyber-purple/60" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Workspace Standby</h3>
                <p className="text-xs text-white/40 max-w-sm leading-relaxed mb-4">
                  Enter research keywords or select a template above. The system will consult the live web, parse the scraped content, and compile your intelligence dashboard.
                </p>
                <div className="text-[10px] text-white/20 font-mono flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-cyber-purple/50" />
                  Bypasses traditional cookies and advertisement frames.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Right Status Panel */}
      <RightPanel
        isLoading={isLoading}
        metadata={resultData?.key_metadata}
        hasData={!!resultData}
        depth={filters.depth}
        imagesEnabled={filters.includeImages}
        screenshotsEnabled={filters.includeScreenshots}
        isFallback={!!resultData?.localSynthesis}
        isMock={!!resultData?.mockFallback}
      />

    </div>
  );
}
