"use client";

import { Search, History, Settings, Image, Camera, Layers, Globe, Trash2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface Filters {
  depth: "quick" | "standard" | "deep";
  includeImages: boolean;
  includeScreenshots: boolean;
  sourceTypes: "all" | "news" | "papers" | "blogs" | "company_pages";
}

interface SidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  savedSearches: string[];
  onSelectSearch: (query: string) => void;
  onClearHistory: () => void;
  isLoading: boolean;
}

export default function Sidebar({
  filters,
  setFilters,
  savedSearches,
  onSelectSearch,
  onClearHistory,
  isLoading
}: SidebarProps) {
  
  const handleDepthChange = (depth: "quick" | "standard" | "deep") => {
    if (isLoading) return;
    setFilters({ ...filters, depth });
  };

  const handleSourceTypeChange = (sourceTypes: Filters["sourceTypes"]) => {
    if (isLoading) return;
    setFilters({ ...filters, sourceTypes });
  };

  const toggleImages = () => {
    if (isLoading) return;
    setFilters({ ...filters, includeImages: !filters.includeImages });
  };

  const toggleScreenshots = () => {
    if (isLoading) return;
    setFilters({ ...filters, includeScreenshots: !filters.includeScreenshots });
  };

  return (
    <aside className="glass-panel p-6 flex flex-col h-full gap-6 select-none bg-black/40 border border-cyber-purple/25">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 pb-2 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-pink flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
          <Search className="w-4 h-4 text-white stroke-[3px]" />
        </div>
        <div className="logo text-xl font-extrabold text-white leading-none">
          Context<span className="text-cyber-pink font-normal">Intel</span>
        </div>
      </div>

      {/* Filter Options Panel */}
      <div className="flex flex-col gap-5">
        <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-purple/80 flex items-center gap-1.5 uppercase">
          <Settings className="w-3.5 h-3.5" />
          Research Parameters
        </h3>

        {/* Depth Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono text-white/50 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Research Depth
          </label>
          <div className="grid grid-cols-3 gap-1 bg-black/60 p-1 rounded-xl border border-cyber-purple/20">
            {(["quick", "standard", "deep"] as const).map((d) => (
              <button
                key={d}
                type="button"
                disabled={isLoading}
                onClick={() => handleDepthChange(d)}
                className={`py-1.5 text-xs font-medium capitalize rounded-lg transition-all cursor-pointer ${
                  filters.depth === d
                    ? "bg-cyber-purple/20 text-white font-semibold border border-cyber-purple/40 shadow-[0_0_10px_var(--theme-primary-dim)]"
                    : "text-white/50 hover:text-white hover:bg-cyber-purple/10"
                } disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Source Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-mono text-white/50 flex items-center gap-1">
            <Globe className="w-3 h-3" /> Source Types
          </label>
          <select
            disabled={isLoading}
            value={filters.sourceTypes}
            onChange={(e) => handleSourceTypeChange(e.target.value as any)}
            className="w-full bg-black/60 border border-cyber-purple/30 p-2 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple transition-colors disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5"
          >
            <option value="all">All Sources (Default)</option>
            <option value="news">Tech News Only</option>
            <option value="papers">Scientific Papers / ArXiv</option>
            <option value="blogs">Engineering Blogs</option>
            <option value="company_pages">Official Company Pages</option>
          </select>
        </div>

        {/* Toggle Switches */}
        <div className="flex flex-col gap-3 pt-1">
          {/* Images Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80 flex items-center gap-2 font-medium">
              <Image className="w-3.5 h-3.5 text-cyber-pink/80 animate-pulse" />
              Scrape Images
            </span>
            <button
              type="button"
              disabled={isLoading}
              onClick={toggleImages}
              className={`w-11 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none border cursor-pointer ${
                filters.includeImages 
                  ? "bg-cyber-purple border-cyber-purple shadow-[0_0_10px_var(--theme-primary-glow)]" 
                  : "bg-black/45 border-cyber-purple/25"
              } disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ${
                  filters.includeImages ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Screenshots Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80 flex items-center gap-2 font-medium">
              <Camera className="w-3.5 h-3.5 text-cyber-pink/80 animate-pulse" />
              Capture Screenshots
            </span>
            <button
              type="button"
              disabled={isLoading}
              onClick={toggleScreenshots}
              className={`w-11 h-6 rounded-full p-1 transition-all duration-300 focus:outline-none border cursor-pointer ${
                filters.includeScreenshots 
                  ? "bg-cyber-purple border-cyber-purple shadow-[0_0_10px_var(--theme-primary-glow)]" 
                  : "bg-black/45 border-cyber-purple/25"
              } disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ${
                  filters.includeScreenshots ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* History / Saved searches list */}
      <div className="flex-1 flex flex-col min-h-0 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-purple/80 flex items-center gap-1.5 uppercase">
            <History className="w-3.5 h-3.5" />
            Recent Searches
          </h3>
          {savedSearches.length > 0 && (
            <button
              type="button"
              onClick={onClearHistory}
              title="Clear history"
              className="text-white/30 hover:text-red-400 p-1 rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 select-none">
          {savedSearches.length === 0 ? (
            <div className="text-xs text-cyber-purple/40 italic p-4 text-center border border-dashed border-cyber-purple/20 rounded-xl bg-black/20">
              No recent searches yet. Type a query above to start.
            </div>
          ) : (
            savedSearches.map((search, idx) => (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ x: 2 }}
                onClick={() => !isLoading && onSelectSearch(search)}
                className="w-full text-left p-3 text-xs text-white/70 hover:text-white bg-black/40 hover:bg-cyber-purple/10 border border-cyber-purple/25 hover:border-cyber-purple/60 rounded-xl transition-all flex items-center justify-between group overflow-hidden text-ellipsis whitespace-nowrap disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                disabled={isLoading}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Bookmark className="w-3 h-3 text-cyber-purple/50 flex-shrink-0 group-hover:text-cyber-purple" />
                  <span className="truncate">{search}</span>
                </div>
                <span className="text-[10px] text-white/30 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  load &rarr;
                </span>
              </motion.button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
