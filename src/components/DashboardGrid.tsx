"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Sparkles, TrendingUp, AlertCircle, Quote, 
  ExternalLink, Calendar, Copy, Check, FileCode, CheckCircle2,
  ChevronLeft, ChevronRight, X
} from "lucide-react";

interface Citation {
  title: string;
  url: string;
}

interface Highlight {
  title: string;
  detail: string;
  citation: Citation;
}

interface Insight {
  title: string;
  content: string;
  metric: string;
  type: "trend" | "stat" | "signal";
}

interface Source {
  title: string;
  url: string;
  snippet: string;
  relevance: "high" | "medium" | "low";
}

interface TimelineItem {
  date: string;
  event: string;
  citationUrl: string;
}

interface ImageAsset {
  src: string;
  alt: string;
  type: string;
}

interface ScreenshotAsset {
  url: string;
  domain: string;
}

interface ReportData {
  query: string;
  generatedAt: string;
  summary: string;
  highlights: Highlight[];
  insights: Insight[];
  timeline: TimelineItem[];
  sources: Source[];
  images: ImageAsset[];
  screenshots: ScreenshotAsset[];
  confidence: number;
  whyThisMatters: string;
  followUpQuestions: string[];
  localSynthesis?: boolean;
  mockFallback?: boolean;
}

interface DashboardGridProps {
  data: ReportData;
}

export default function DashboardGrid({ data }: DashboardGridProps) {
  const [copiedText, setCopiedText] = useState<"json" | "md" | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedText("json");
    setTimeout(() => setCopiedText(null), 2000);
  };

  const copyMarkdown = () => {
    const md = `# Research Intelligence Report: ${data.query}
Generated at: ${new Date(data.generatedAt).toLocaleString()}
Confidence: ${data.confidence}%

## Executive Summary
${data.summary}

## Key Highlights
${data.highlights.map((h, i) => `${i + 1}. **${h.title}** - ${h.detail}\n   *Source: [${h.citation.title}](${h.citation.url})*`).join("\n\n")}

## Why This Matters
${data.whyThisMatters}

## Key Analytical Insights
${data.insights.map(ins => `- **${ins.title}** [${ins.metric}]: ${ins.content}`).join("\n")}

## Timeline of Developments
${data.timeline.map(t => `- **${t.date}**: ${t.event} *([Reference](${t.citationUrl}))*`).join("\n")}

## Sources Consulted
${data.sources.map(s => `- [${s.title}](${s.url}) (Relevance: ${s.relevance})`).join("\n")}
`;

    navigator.clipboard.writeText(md);
    setCopiedText("md");
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div>
          <div className="text-xs font-mono text-white/40">QUERY RUNTIME COMPLETED</div>
          <h2 className="text-sm font-mono font-bold text-cyber-green flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            SYNTHESIS COMPLETED FOR "{data.query.toUpperCase()}"
          </h2>
        </div>

        <div className="flex gap-2">
          {/* Copy Markdown Button */}
          <button
            type="button"
            onClick={copyMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-white/2 hover:bg-cyber-green/10 border border-white/5 hover:border-cyber-green/30 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {copiedText === "md" ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyber-green" />
                Copied Brief!
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                Copy Markdown
              </>
            )}
          </button>

          {/* Copy JSON Button */}
          <button
            type="button"
            onClick={copyJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-white/2 hover:bg-cyber-green/10 border border-white/5 hover:border-cyber-green/30 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            {copiedText === "json" ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyber-green" />
                Copied JSON!
              </>
            ) : (
              <>
                <FileCode className="w-3.5 h-3.5" />
                Copy Raw JSON
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Executive Summary (2 columns wide) */}
        <div className="md:col-span-2 glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <Sparkles className="w-4 h-4 text-cyber-green" />
            Executive Summary
          </h3>
          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {data.summary}
          </p>

          <div className="pt-4 mt-auto border-t border-white/5 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
              Strategic Impact &bull; Why This Matters
            </span>
            <p className="text-xs text-emerald-400/70 italic leading-relaxed">
              "{data.whyThisMatters}"
            </p>
          </div>
        </div>

        {/* Market / Analytical Signals (1 column wide) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <TrendingUp className="w-4 h-4 text-cyber-green" />
            Market & Research Signals
          </h3>
          
          <div className="flex-1 flex flex-col gap-3.5">
            {data.insights.map((ins, idx) => (
              <div key={idx} className="bg-black/40 p-4 border border-white/5 rounded-2xl flex flex-col gap-1.5 glass-card">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyber-green/70 px-2 py-0.5 rounded-full bg-cyber-green/5 border border-cyber-green/15 uppercase">
                    {ins.type}
                  </span>
                  <strong className="text-white font-mono text-sm">{ins.metric}</strong>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{ins.title}</h4>
                <p className="text-[11px] text-white/60 leading-relaxed">{ins.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights & Citations (2 columns wide) */}
        <div className="md:col-span-2 glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <Quote className="w-4 h-4 text-cyber-green" />
            Key Highlights & Citations
          </h3>

          <div className="space-y-3">
            {data.highlights.map((h, idx) => (
              <div key={idx} className="p-4 bg-white/2 hover:bg-cyber-green/5 border border-white/3 hover:border-cyber-green/10 rounded-2xl transition-all flex flex-col gap-2 relative overflow-hidden group">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-xs font-bold text-white flex gap-2">
                    <span className="text-cyber-green/50 font-mono">0{idx + 1}.</span>
                    {h.title}
                  </h4>
                  {h.citation.url && (
                    <a
                      href={h.citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-cyber-green hover:text-white flex items-center gap-0.5 font-mono opacity-40 group-hover:opacity-100 transition-opacity bg-cyber-green/5 px-2 py-0.5 rounded-md border border-cyber-green/10"
                    >
                      Ref <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans pl-6">
                  {h.detail}
                </p>
                <div className="text-[10px] text-white/40 pl-6 font-mono truncate max-w-xl">
                  Citation: <span className="text-white/60 italic">{h.citation.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Evidence / Image Gallery (1 column wide) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <AlertCircle className="w-4 h-4 text-cyber-green" />
            Visual Evidence
          </h3>

          <div className="flex-1 flex flex-col gap-3">
            {/* Renders screenshot if available */}
            {data.screenshots && data.screenshots.length > 0 && (
              <div className="relative group rounded-xl overflow-hidden border border-cyber-green/20 aspect-video bg-black/60 shadow-[0_0_15px_rgba(0,255,120,0.1)]">
                <img 
                  src={data.screenshots[0].url} 
                  alt="Scraped Web Capture" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onClick={() => setLightboxImage(data.screenshots[0].url)}
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/75 p-2 text-[10px] font-mono text-white/80 border-t border-white/5 flex items-center justify-between">
                  <span>SCREEN CAPTURE</span>
                  <span className="text-cyber-green truncate">{data.screenshots[0].domain}</span>
                </div>
              </div>
            )}

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-2">
              {data.images.slice(0, 4).map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative group rounded-xl overflow-hidden border border-white/5 aspect-video bg-black/60 cursor-pointer"
                  onClick={() => setLightboxImage(img.src)}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white bg-black/80 px-2 py-0.5 rounded border border-white/10 uppercase">
                      {img.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-white/30 font-mono italic text-center mt-2 leading-relaxed">
              Images extracted dynamically from target pages using Context.dev Scrape Assets endpoints. Click to zoom.
            </p>
          </div>
        </div>

        {/* Timeline of Developments (1 column wide) */}
        <div className="glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <Calendar className="w-4 h-4 text-cyber-green" />
            Timeline developments
          </h3>

          <div className="relative pl-4 border-l border-white/10 space-y-5 my-2">
            {data.timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyber-dark border-2 border-cyber-green shadow-[0_0_8px_#39ff88] group-hover:bg-cyber-green transition-all" />
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-cyber-green/80 font-bold">
                    {item.date}
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    {item.event}
                  </p>
                  {item.citationUrl && (
                    <a
                      href={item.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-white/40 hover:text-cyber-green font-mono flex items-center gap-0.5 mt-0.5"
                    >
                      source ref &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources Consulted (2 columns wide) */}
        <div className="md:col-span-2 glass-panel p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyber-green/70 flex items-center gap-2 uppercase">
            <FileText className="w-4 h-4 text-cyber-green" />
            Scanned Web Sources ({data.sources.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
            {data.sources.map((src, idx) => (
              <div key={idx} className="p-3.5 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-2 hover:border-cyber-green/20 transition-all group">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs font-bold text-white leading-tight truncate max-w-[80%]">
                    {src.title}
                  </h4>
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                    src.relevance === "high"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                      : src.relevance === "medium"
                      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                      : "text-white/40 bg-white/5 border-white/10"
                  }`}>
                    {src.relevance}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2 min-h-[32px]">
                  {src.snippet}
                </p>
                <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-white/30 max-w-[60%] truncate">
                    {new URL(src.url).hostname}
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-green hover:text-white flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                  >
                    View Source <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/65 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(57,255,136,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Enlarged visual evidence" 
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
