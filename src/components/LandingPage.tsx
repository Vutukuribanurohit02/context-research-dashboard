"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Search, Sparkles, Terminal, FileText, Code, 
  HelpCircle, MessageSquare, ArrowRight, User, Compass, Zap, Globe, ShieldCheck,
  Shuffle, Layers, Coins, Info
} from "lucide-react";

interface LandingPageProps {
  activeTheme: "cyber" | "spatial" | "quantum" | "robotics";
  setTheme: (theme: "cyber" | "spatial" | "quantum" | "robotics") => void;
  onEnterWorkspace: () => void;
}

export default function LandingPage({ activeTheme, setTheme, onEnterWorkspace }: LandingPageProps) {
  // 1. RAG Simulator State
  const [simulatorUrl, setSimulatorUrl] = useState("https://techblog.com/nvidia-blackwell-launch");
  const [simulatorStatus, setSimulatorStatus] = useState<"idle" | "running" | "done">("idle");
  const [simTokenSavings, setSimTokenSavings] = useState(0);
  const [simStep, setSimStep] = useState<"idle" | "proxy" | "waf" | "stripper" | "output" | "done">("idle");
  
  // 2. Calculator State
  const [dailyScrapes, setDailyScrapes] = useState(150);
  const [avgHtmlSize, setAvgHtmlSize] = useState(450); // in KB
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  const modelPricing: Record<string, { name: string; rate: number }> = {
    "gpt-4o": { name: "GPT-4o", rate: 5.00 },
    "claude-3-5": { name: "Claude 3.5 Sonnet", rate: 3.00 },
    "gemini-1-5-pro": { name: "Gemini 1.5 Pro", rate: 1.25 },
    "gpt-4o-mini": { name: "GPT-4o Mini", rate: 0.15 }
  };

  const monthlySearches = dailyScrapes * 30;
  const monthlyRawTokens = monthlySearches * (avgHtmlSize * 380);
  const monthlyCleanTokens = monthlySearches * (avgHtmlSize * 380 * 0.15);
  const monthlyRawCost = (monthlyRawTokens / 1000000) * modelPricing[selectedModel].rate;
  const monthlyCleanCost = (monthlyCleanTokens / 1000000) * modelPricing[selectedModel].rate;
  const monthlySavings = monthlyRawCost - monthlyCleanCost;
  const monthlySavingsTokens = monthlyRawTokens - monthlyCleanTokens;

  // 3. Chat Q&A State
  const [activeQA, setActiveQA] = useState<string | null>(null);
  const [isTypingQA, setIsTypingQA] = useState(false);

  const qaDatabase: Record<string, string> = {
    "why": "I built Context Intel because reading web pages for LLM context is incredibly bloated. Normal pages are packed with 80% headers, sidebars, tracking scripts, and cookie banners that waste tokens. Context Intel uses Context.dev APIs to pull clean markdown instantly, meaning 5x cheaper and 10x faster AI synthesis.",
    "tech": "Under the hood, we query Context.dev's POST /web/search endpoint. It crawls the live index, bypasses Cloudflare anti-bot blocks using residential proxy rotation, renders JS dynamic websites, and converts the primary HTML tags into clean, GitHub-flavored Markdown. If needed, we trigger their Screenshot and Image Scraper endpoints to compile visual assets.",
    "api": "Absolutely. Your CONTEXT_DEV_API_KEY is stored in a secure local server file (.env.local) and is only invoked during API requests on the Next.js backend. It is never exposed, cached, or compiled on the client browser. You can deploy it securely to platforms like Netlify.",
    "next": "Next up, I'm integrating multi-document indexing for research queries, cross-site citation graphs to detect hallucinations, and a vector DB sync option to feed these clean scraped markdowns directly to your custom agent pools."
  };

  const handleRunSimulator = () => {
    if (simulatorStatus === "running") return;
    setSimulatorStatus("running");
    setSimStep("proxy");
    
    // Simulate steps
    setTimeout(() => {
      setSimStep("waf");
      setTimeout(() => {
        setSimStep("stripper");
        setTimeout(() => {
          setSimStep("output");
          setTimeout(() => {
            setSimStep("done");
            setSimulatorStatus("done");
            setSimTokenSavings(84);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const handleAskQA = (key: string) => {
    if (isTypingQA) return;
    setIsTypingQA(true);
    setActiveQA(null);
    
    setTimeout(() => {
      setActiveQA(qaDatabase[key]);
      setIsTypingQA(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="text-center relative py-12 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-cyber-pink bg-cyber-purple-dim border border-cyber-purple-glow/20 rounded-full"
        >
          <Sparkles className="w-4 h-4 text-cyber-pink animate-spin" style={{ animationDuration: "3s" }} />
          Introducing Context Intel v1.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white max-w-4xl"
        >
          Next-Gen Web Ingestion & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink">
            Real-Time Research Intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-sm sm:text-lg font-sans max-w-2xl leading-relaxed"
        >
          An advanced web crawler that strips headers, cookies, and ads to deliver clean, structured Markdown, live screenshots, and AI synthesis. Powered securely by Context.dev.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="px-8 py-4 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-[#c084fc] hover:to-[#f472b6] text-white font-extrabold text-sm rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_35px_var(--theme-primary-glow)] hover:shadow-[0_0_50px_var(--theme-primary-glow)]"
          >
            Launch Research Workspace
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#themes"
            className="px-8 py-4 bg-white/2 hover:bg-white/5 border border-white/5 hover:border-cyber-purple/20 rounded-2xl text-white/80 hover:text-white transition-all text-sm font-semibold flex items-center justify-center"
          >
            Configure Theme
          </a>
        </motion.div>
      </section>

      {/* 2. THEME SELECTOR & PREVIEW PANEL */}
      <section id="themes" className="glass-panel p-8 flex flex-col gap-6 scroll-mt-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase">
            Interactive Entrance
          </span>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyber-purple" />
            Select Your Research Theme
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-sans max-w-xl">
            Hover over a theme card to preview its styling across the page. Click to set it, then enter the workspace in that custom visual theme.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
          {[
            { id: "cyber", title: "Model 1: Cyber-Lab", color: "text-[#39ff88]", accent: "#39ff88", desc: "Classic neon green console with high-contrast data matrices." },
            { id: "spatial", title: "Model 2: Spatial Nebula", color: "text-[#a855f7]", accent: "#a855f7", desc: "Apple Vision Pro theme with translucent purple glass." },
            { id: "quantum", title: "Model 3: Quantum Grid", color: "text-[#00bcff]", accent: "#00bcff", desc: "Laser gold and electric blue circuit trace lines." },
            { id: "robotics", title: "Model 4: Advanced Robotics", color: "text-[#ff6b00]", accent: "#ff6b00", desc: "Gunmetal and warning orange heavy industrial UI." }
          ].map((themeOpt) => (
            <div
              key={themeOpt.id}
              onClick={() => setTheme(themeOpt.id as any)}
              className={`p-5 glass-card border transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden select-none hover:-translate-y-1 ${
                activeTheme === themeOpt.id
                  ? "border-cyber-purple bg-cyber-purple/5 shadow-[0_0_20px_var(--theme-primary-dim)]"
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              {/* Active glow dot */}
              {activeTheme === themeOpt.id && (
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyber-pink shadow-[0_0_8px_var(--theme-accent)]" />
              )}
              <h4 className={`text-xs font-bold font-mono ${themeOpt.color}`}>
                {themeOpt.title}
              </h4>
              <p className="text-[11px] text-white/50 leading-relaxed font-sans mt-1">
                {themeOpt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE RAG SIMULATOR (HTML-TO-MARKDOWN WORKFLOW) */}
      <section className="glass-panel p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden bg-black/45">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-pink/5 filter blur-[60px] pointer-events-none" />

        <div className="flex flex-col gap-4 justify-center">
          <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            Core Technology Demonstration
          </span>
          <h2 className="text-3xl font-black text-white leading-tight">
            How RAG Ingestion Works <br />
            with Context.dev
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-sans leading-relaxed">
            Standard web crawlers ingest raw HTML full of advertisements, navigation bars, headers, and consent dialogs. Context.dev strips everything except the primary content, converting it into clean, token-efficient Markdown.
          </p>

          <div className="flex flex-col gap-2 bg-black/40 p-4 border border-white/5 rounded-2xl">
            <div className="text-[11px] font-mono text-white/40">SIMULATE SCRAPING PATH</div>
            <div className="flex gap-2">
              <select
                value={simulatorUrl}
                onChange={(e) => {
                  setSimulatorUrl(e.target.value);
                  setSimulatorStatus("idle");
                  setSimStep("idle");
                  setSimTokenSavings(0);
                }}
                disabled={simulatorStatus === "running"}
                className="flex-1 bg-black/80 border border-white/10 p-2.5 rounded-xl text-xs text-white/80 focus:outline-none focus:border-cyber-purple/40"
              >
                <option value="https://techblog.com/nvidia-blackwell-launch">https://techblog.com/nvidia-blackwell-launch</option>
                <option value="https://wikipedia.org/quantum-gate-computing">https://wikipedia.org/quantum-gate-computing</option>
                <option value="https://reuters.com/market-semiconductor-caps">https://reuters.com/market-semiconductor-caps</option>
              </select>
              <button
                type="button"
                onClick={handleRunSimulator}
                disabled={simulatorStatus === "running"}
                className="px-4 py-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {simulatorStatus === "running" ? "Stripping..." : "Run Clean Ingestion"}
              </button>
            </div>
          </div>
        </div>

        {/* Ingestion Split Viewer */}
        <div className="glass-card border border-white/5 overflow-hidden flex flex-col h-72">
          {/* Header toolbar */}
          <div className="bg-black/80 p-3 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-cyber-purple/80" />
            </div>
            <span>SPLIT_VIEWER.exe</span>
          </div>

          <div className="flex-1 grid grid-cols-2 text-[10px] font-mono p-4 gap-4 overflow-hidden divide-x divide-white/5">
            {/* Left side: HTML */}
            <div className="space-y-1.5 overflow-y-auto pr-2 select-none text-white/45">
              <div className="text-red-400 font-bold">&lt;html lang="en"&gt;</div>
              <div className="text-yellow-400 pl-2">&lt;head&gt;...&lt;/head&gt;</div>
              <div className="text-red-400 pl-2">&lt;body&gt;</div>
              <div className="text-blue-400 pl-4">&lt;nav className="nav-container"&gt;...&lt;/nav&gt;</div>
              <div className="text-[#a855f7] pl-4">&lt;div id="cookie-banner"&gt;Cookies...&lt;/div&gt;</div>
              <div className="text-blue-400 pl-4">&lt;aside className="sidebar-ad-wrapper"&gt;</div>
              <div className="text-green-400 pl-6">&lt;iframe src="adsense.com"&gt;&lt;/iframe&gt;</div>
              <div className="text-blue-400 pl-4">&lt;/aside&gt;</div>
              <div className="text-white pl-4 font-bold">&lt;main className="article-content"&gt;</div>
              <div className="text-red-400 pl-6">&lt;h1&gt;NVIDIA Blackwell Architecture&lt;/h1&gt;</div>
              <div className="text-white pl-6">&lt;p&gt;Blackwell packs 208 billion transistors...&lt;/p&gt;</div>
              <div className="text-white pl-4">&lt;/main&gt;</div>
              <div className="text-blue-400 pl-4">&lt;footer className="site-footer"&gt;...&lt;/footer&gt;</div>
              <div className="text-red-400 pl-2">&lt;/body&gt;</div>
              <div className="text-red-400">&lt;/html&gt;</div>
            </div>

            {/* Right side: Markdown Output */}
            <div className="space-y-2 overflow-y-auto pl-4">
              {simulatorStatus === "idle" && (
                <div className="text-white/20 italic h-full flex items-center justify-center text-center p-4">
                  Waiting for clean ingestion command...
                </div>
              )}

              {simulatorStatus === "running" && (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3.5 bg-cyber-purple/20 rounded w-1/3" />
                  <div className="h-2 bg-white/10 rounded w-full" />
                  <div className="h-2 bg-white/10 rounded w-5/6" />
                  <div className="h-2 bg-white/10 rounded w-4/5" />
                  <div className="h-2.5 bg-cyber-pink/20 rounded w-2/3 mt-4" />
                  <div className="h-2 bg-white/10 rounded w-full" />
                </div>
              )}

              {simulatorStatus === "done" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/70 space-y-3 font-sans text-[11px]"
                >
                  <div className="text-cyber-purple font-mono font-bold text-xs select-none"># NVIDIA Blackwell Architecture</div>
                  <div className="leading-relaxed">
                    NVIDIA Blackwell-architecture GPUs pack 208 billion transistors and are manufactured using a custom-built TSMC 4NP process. It delivers up to 20 petaflops of FP4 compute.
                  </div>
                  <div className="text-cyber-pink font-mono font-bold text-xs select-none">## Key Specifications</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Transistors: 208 Billion</li>
                    <li>Processing node: TSMC 4NP</li>
                    <li>Interconnect: 1.8 TB/s NVLink 5</li>
                  </ul>
                  <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-cyber-purple flex justify-between select-none">
                    <span>TOKEN REDUCTION: {simTokenSavings}% SAVED</span>
                    <span>SIZE: 19KB</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Ingestion Pipeline Visualizer */}
        <div className="md:col-span-2 border-t border-white/5 pt-6 mt-4 flex flex-col gap-4">
          <div className="text-[10px] font-mono text-white/40 tracking-wider uppercase select-none">Live Scraping Pipeline Flow</div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-black/30 border border-white/5 rounded-2xl relative overflow-hidden">
            {/* Ambient pipeline background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/5 to-cyber-pink/5 opacity-30 pointer-events-none" />
            
            {[
              { id: "url", label: "Source URL", icon: Globe, log: simulatorStatus === "idle" ? "Waiting..." : "Resolved: 200 OK", desc: "Target Page" },
              { id: "proxy", label: "Proxy Router", icon: Shuffle, log: simStep === "proxy" ? "Routing IP..." : (simStep === "idle" ? "Pending..." : "Tunneled (US East)"), desc: "Residential IP" },
              { id: "waf", label: "WAF Bypass", icon: ShieldCheck, log: simStep === "proxy" || simStep === "idle" ? "Pending..." : (simStep === "waf" ? "Bypassing WAF..." : "Cloudflare Bypassed"), desc: "Anti-Bot Solved" },
              { id: "stripper", label: "HTML Stripper", icon: Layers, log: simStep === "stripper" ? "Stripping HTML..." : (simStep === "output" || simStep === "done" ? "85% Bloat Removed" : "Pending..."), desc: "Clean Parser" },
              { id: "output", label: "Markdown Output", icon: FileText, log: simStep === "done" ? "Size: 19KB | 1.2k tokens" : (simStep === "output" ? "Generating..." : "Pending..."), desc: "Structured MD" }
            ].map((node, index, arr) => {
              const nodeStatus = simulatorStatus === "idle" ? "idle" : (
                node.id === "url" ? "completed" : (
                  simStep === "done" ? "completed" : (
                    simStep === node.id ? "active" : (
                      ["proxy", "waf", "stripper", "output", "done"].indexOf(simStep) > ["proxy", "waf", "stripper", "output"].indexOf(node.id) ? "completed" : "pending"
                    )
                  )
                )
              );

              const isActive = nodeStatus === "active";
              const isCompleted = nodeStatus === "completed";

              return (
                <div key={node.id} className="flex-1 flex flex-col sm:flex-row items-center w-full z-10">
                  {/* Node Card */}
                  <div className={`flex flex-col items-center text-center p-3 rounded-xl border w-full sm:w-auto flex-1 transition-all ${
                    isActive 
                      ? "border-cyber-purple bg-cyber-purple/10 shadow-[0_0_15px_var(--theme-primary-dim)]"
                      : isCompleted
                        ? "border-cyber-pink/40 bg-cyber-pink/5"
                        : "border-white/5 bg-white/2 opacity-40"
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                      isActive 
                        ? "bg-cyber-purple text-black"
                        : isCompleted
                          ? "bg-cyber-pink text-white"
                          : "bg-white/5 text-white/40"
                    }`}>
                      <node.icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
                    </div>
                    <span className="text-[10px] font-bold text-white font-mono">{node.label}</span>
                    <span className="text-[9px] text-white/50 font-sans mt-0.5">{node.desc}</span>
                    <span className={`text-[8px] font-mono mt-1 ${
                      isActive ? "text-cyber-purple font-bold" : isCompleted ? "text-cyber-pink" : "text-white/30"
                    }`}>{node.log}</span>
                  </div>

                  {/* Connector Line (except for last element) */}
                  {index < arr.length - 1 && (
                    <div className="w-0.5 h-6 sm:w-full sm:h-0.5 bg-white/5 relative overflow-hidden my-2 sm:my-0 sm:mx-2 flex-shrink-0">
                      {/* Pulse flow animation */}
                      {((simStep === "proxy" && node.id === "url") || 
                        (simStep === "waf" && node.id === "proxy") || 
                        (simStep === "stripper" && node.id === "waf") || 
                        (simStep === "output" && node.id === "stripper")) && (
                        <motion.div
                          initial={{ left: "-100%" }}
                          animate={{ left: "100%" }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-purple to-transparent"
                        />
                      )}
                      {/* Completed static line */}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-cyber-pink/20" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3b. INTERACTIVE RAG COST & TOKEN SAVINGS CALCULATOR */}
      <section className="glass-panel p-8 flex flex-col gap-6 bg-black/45 relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyber-purple/5 filter blur-[60px] pointer-events-none" />

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 animate-bounce" />
            ROI & Token Efficiency Estimator
          </span>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            RAG Cost & Token Savings Calculator
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-sans max-w-xl">
            Ingesting raw HTML into LLMs wastes 85% of your token budget on ads and headers. Slide the controls below to calculate your savings using Context.dev clean markdown ingestion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2 items-center">
          {/* Controls */}
          <div className="space-y-6">
            {/* Input 1: Daily Scrapes */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Daily Web Scrapes / Queries</span>
                <span className="text-cyber-purple font-bold">{dailyScrapes} / day</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={dailyScrapes}
                onChange={(e) => setDailyScrapes(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-purple"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono select-none">
                <span>10</span>
                <span>1,000</span>
              </div>
            </div>

            {/* Input 2: Avg HTML Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-white/60">Average Raw Webpage HTML Size</span>
                <span className="text-cyber-purple font-bold">{avgHtmlSize} KB</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={avgHtmlSize}
                onChange={(e) => setAvgHtmlSize(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-purple"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono select-none">
                <span>50 KB</span>
                <span>2,000 KB</span>
              </div>
            </div>

            {/* Input 3: LLM Model Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/60 block select-none">Target LLM Model</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(modelPricing).map(([key, model]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedModel(key)}
                    className={`p-2.5 border text-center text-xs rounded-xl font-mono transition-all cursor-pointer select-none ${
                      selectedModel === key
                        ? "border-cyber-purple bg-cyber-purple/10 text-white font-bold"
                        : "border-white/5 bg-white/2 text-white/50 hover:border-white/15"
                    }`}
                  >
                    <div>{model.name}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">${model.rate}/M</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Comparison and Charts */}
          <div className="glass-card border border-white/5 p-6 space-y-6 bg-black/20">
            <div className="text-xs font-mono text-white/40 tracking-wider select-none">MONTHLY COST ESTIMATES</div>
            
            {/* Bars */}
            <div className="space-y-4">
              {/* Raw Ingestion Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70 font-sans">Raw HTML Ingestion (Bloated)</span>
                  <span className="text-red-400 font-mono font-bold">${monthlyRawCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (monthlyRawCost / Math.max(monthlyRawCost, 1)) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                  />
                </div>
              </div>

              {/* Clean Ingestion Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70 font-sans">Context Intel Markdown Ingestion (Cleaned)</span>
                  <span className="text-cyber-purple font-mono font-bold">${monthlyCleanCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(3, (monthlyCleanCost / Math.max(monthlyRawCost, 1)) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full shadow-[0_0_12px_var(--theme-primary-glow)]"
                  />
                </div>
              </div>
            </div>

            {/* Savings Display */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="bg-white/2 border border-white/5 p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-white/40 select-none">MONTHLY COST SAVED</div>
                <div className="text-lg sm:text-2xl font-black text-cyber-purple mt-1 filter drop-shadow-[0_0_10px_var(--theme-primary-glow)]">
                  ${monthlySavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[9px] text-white/50 font-mono mt-0.5 select-none">85% Ingestion Cut</div>
              </div>
              <div className="bg-white/2 border border-white/5 p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-white/40 select-none">TOKENS SAVED</div>
                <div className="text-lg sm:text-2xl font-black text-cyber-pink mt-1">
                  {(monthlySavingsTokens / 1000000).toFixed(1)}M
                </div>
                <div className="text-[9px] text-white/50 font-mono mt-0.5 select-none">Tokens Saved / mo</div>
              </div>
            </div>

            <div className="text-[10px] text-white/30 font-mono flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-cyber-pink/50 flex-shrink-0" />
              Calculations assume 1 KB HTML = 380 tokens. Clean Markdown reduces payload by 85% on average.
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER NARRATIVE & PROFILE ("Why I built this") */}
      <section className="glass-panel p-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 relative overflow-hidden bg-black/45 items-center">
        {/* Creator avatar circle */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyber-purple to-cyber-pink flex items-center justify-center font-extrabold text-white text-3xl shadow-[0_0_30px_var(--theme-primary-glow)] border border-white/20 select-none">
            BR
          </div>
          <div className="text-center">
            <h4 className="text-sm font-bold text-white">Banu Rohit Vutukuri</h4>
            <p className="text-[10px] text-cyber-pink font-mono">GitHub: Vutukuribanurohit02</p>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex flex-col gap-3.5">
          <span className="text-[10px] font-mono text-cyber-purple tracking-widest uppercase flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            Creator Mission
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            "Why I built Context Intel"
          </h2>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
            As a developer building AI agents and RAG pipelines, I kept hitting a constant wall: web parsing is messy. When feeding URLs to LLMs, scraping raw HTML consumes massive token budgets and degrades reasoning accuracy. 
          </p>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
            I built **Context Intel** to solve this. It encapsulates the powerful Context.dev scraping engine in a gorgeous, intuitive cyber research board. I wanted researchers to have a single workspace where they can enter any keyword, pull clean Markdown files, capture live screenshots, extract classified images, and run semantic synthesis securely without compromise.
          </p>
        </div>
      </section>

      {/* 5. "ASK THE FOUNDER" INTERACTIVE CHATBOT Q&A */}
      <section className="glass-panel p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase">
            Interactive Dialogue
          </span>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyber-purple" />
            Ask the Founder
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-sans max-w-xl">
            Have questions about the project? Click a query below to ask me directly, and read my answers in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-2">
          {/* Question panel */}
          <div className="flex flex-col gap-2.5">
            {[
              { key: "why", label: "Why did you build Context Intel?" },
              { key: "tech", label: "How does Context.dev work under the hood?" },
              { key: "api", label: "Is my Context.dev API key secure?" },
              { key: "next", label: "What features are coming next?" }
            ].map((q) => (
              <button
                key={q.key}
                type="button"
                onClick={() => handleAskQA(q.key)}
                className="w-full text-left p-4 text-xs font-semibold text-white/80 bg-white/2 hover:bg-cyber-purple/5 border border-white/5 hover:border-cyber-purple/15 rounded-2xl transition-all cursor-pointer flex items-center justify-between group"
              >
                <span>{q.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-cyber-pink group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>

          {/* Dialog Answer Screen */}
          <div className="glass-card border border-white/5 p-6 min-h-[160px] flex flex-col justify-center bg-black/30 relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 select-none">
              STATUS: FOUNDER_NODE_CONNECTED
            </div>
            
            <AnimatePresence mode="wait">
              {isTypingQA ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-cyber-purple font-mono text-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-cyber-pink animate-ping" />
                  Founder is typing response...
                </motion.div>
              ) : activeQA ? (
                <motion.div
                  key="answer"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 select-none">
                    <span className="w-5 h-5 rounded-full bg-cyber-purple flex items-center justify-center text-[9px] font-bold text-white">BR</span>
                    <span className="text-[10px] font-mono text-cyber-pink font-bold uppercase">Banu Rohit Vutukuri</span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-sans pl-7">
                    {activeQA}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/30 text-xs sm:text-sm italic text-center"
                >
                  Select a question on the left to read my answer.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL-TO-ACTION */}
      <section className="text-center py-8 flex flex-col items-center gap-4 border-t border-white/5">
        <h3 className="text-xl font-bold text-white">Ready to run deep web queries?</h3>
        <button
          type="button"
          onClick={onEnterWorkspace}
          className="px-8 py-4 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-[#c084fc] hover:to-[#f472b6] text-white font-extrabold text-sm rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_30px_var(--theme-primary-glow)]"
        >
          Initialize Research Workspace
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
}
