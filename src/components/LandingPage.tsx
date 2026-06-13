"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Search, Sparkles, Terminal, FileText, Code, 
  HelpCircle, MessageSquare, ArrowRight, User, Compass, Zap, Globe, ShieldCheck,
  Shuffle, Layers, Coins, Info, Mail, Send, X, MapPin, GraduationCap, Laptop, Cpu
} from "lucide-react";
import QueryFoundryCard from "./QueryFoundryCard";

const GitHub = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedIn = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .56 1 1.39v4.73h2.8M6.5 8.37a1.37 1.37 0 0 0 1.3-1.3A1.3 1.3 0 0 0 6.5 5.7a1.3 1.3 0 0 0-1.3 1.3 1.3 1.3 0 0 0 1.3 1.37M8 18.5V10.13H5.2V18.5H8z" />
  </svg>
);

interface LandingPageProps {
  activeTheme: "cyber" | "spatial" | "quantum" | "robotics";
  setTheme: (theme: "cyber" | "spatial" | "quantum" | "robotics") => void;
  activeMode: "dark" | "classic" | "system";
  setMode: (mode: "dark" | "classic" | "system") => void;
  onEnterWorkspace: () => void;
  onEnterWorkspaceWithQuery: (query: string, mode: "quick" | "standard" | "deep") => void;
  onEnterWorkspaceWithClaim: (claim: string) => void;
}

export default function LandingPage({ 
  activeTheme, 
  setTheme, 
  activeMode,
  setMode,
  onEnterWorkspace,
  onEnterWorkspaceWithQuery,
  onEnterWorkspaceWithClaim
}: LandingPageProps) {
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

  // 3. Smart AI Responder State
  const [chatbotQuestion, setChatbotQuestion] = useState("");
  const [chatbotConversation, setChatbotConversation] = useState<Array<{ sender: "user" | "founder"; text: string }>>([
    { sender: "founder", text: "Hi, I'm Banu Rohit. Ask me anything about my hardware verification research, ASIC PDK implementations, high-performance computing, or QueryFoundry AI." }
  ]);
  const [isBotLoading, setIsBotLoading] = useState(false);

  // 4. Contact Modal Form State
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  // 5. Image Fallback State
  const [imageError, setImageError] = useState(false);

  // 6. Homepage TruthCheck State
  const [homeClaim, setHomeClaim] = useState("");

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

  const handleSendChatbot = async () => {
    const trimmed = chatbotQuestion.trim();
    if (!trimmed) return;

    setChatbotConversation((prev) => [...prev, { sender: "user", text: trimmed }]);
    setChatbotQuestion("");
    setIsBotLoading(true);

    try {
      const res = await fetch("/api/smart-responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed })
      });

      if (!res.ok) {
        throw new Error("Responder endpoint failed");
      }

      const data = await res.json();
      setChatbotConversation((prev) => [...prev, { sender: "founder", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setChatbotConversation((prev) => [
        ...prev, 
        { sender: "founder", text: "I'm having a connection issue on my server node right now, but feel free to check out my research cards below or email me directly!" }
      ]);
    } finally {
      setIsBotLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    setContactSuccess(null);
    setContactError(null);

    // Basic Validation
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("All fields are required.");
      setIsContactSubmitting(false);
      return;
    }

    if (!contactEmail.includes("@")) {
      setContactError("Please enter a valid email address.");
      setIsContactSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setContactSuccess("Thanks — I'll get back to you soon.");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (err: any) {
      console.error(err);
      setContactError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 0. STICKY GLASS HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/40 border-b border-white/5 select-none">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyber-purple to-cyber-pink flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-mono text-sm font-bold text-white tracking-wider">QueryFoundry AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-white/60">
            <a href="#features" className="hover:text-cyber-purple transition-colors">Features</a>
            <a href="#themes" className="hover:text-cyber-purple transition-colors">Themes</a>
            <a href="#simulator" className="hover:text-cyber-purple transition-colors">Simulator</a>
            <a href="#about" className="hover:text-cyber-purple transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Mode Switcher */}
            <div className="flex bg-black/60 border border-white/10 p-0.5 rounded-xl font-mono text-[9px] items-center">
              {(["dark", "classic", "system"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-2 py-1 rounded-lg capitalize cursor-pointer transition-colors ${
                    activeMode === m 
                      ? "bg-cyber-purple text-black font-extrabold" 
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onEnterWorkspace}
              className="px-4 py-2 bg-white/5 hover:bg-cyber-purple/10 border border-white/10 hover:border-cyber-purple/50 rounded-xl text-white font-mono text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-6xl py-8 px-4 space-y-16">
        
        {/* 1. HERO SECTION & ENTRANCE CARDS */}
        <section className="text-center relative py-12 flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-cyber-pink bg-cyber-purple-dim border border-cyber-purple-glow/20 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-cyber-pink animate-spin" style={{ animationDuration: "3s" }} />
            Introducing QueryFoundry AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white max-w-4xl"
          >
            Hardware Verification & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-pink">
              Factual Research Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-lg font-sans max-w-2xl leading-relaxed"
          >
            An advanced cognitive workspace built to solve factual grounding. Strip advertisements, verify news claims or design parameters against live sources, and explore scientific data.
          </motion.p>

          {/* Interactive Portal Grid */}
          <div id="features" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-stretch scroll-mt-24">
            
            {/* Left: Query Foundry Interactive Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-full"
            >
              <QueryFoundryCard onOpenInDashboard={onEnterWorkspaceWithQuery} />
            </motion.div>

            {/* Right: Motherboard Entrance Portal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={onEnterWorkspace}
              className="glass-panel overflow-hidden border border-cyber-purple/35 hover:border-cyber-purple/60 bg-black/40 hover:bg-black/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:shadow-[0_0_40px_var(--theme-primary-dim)] cursor-pointer group transition-all duration-500 rounded-3xl relative select-none flex flex-col justify-between"
            >
              {/* Holographic scanner sweep overlay */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-pink to-transparent animate-scanner opacity-85 z-20 pointer-events-none" />

              {/* Electronic Motherboard Background Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-1">
                <img 
                  src="/cyber_portal_core.png" 
                  alt="Holographic Motherboard Portal Core" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 filter saturate-100" 
                />
                
                {/* Dark gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                {/* Glowing component status indicators */}
                <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-cyber-purple animate-ping opacity-60 z-20 pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-cyber-pink animate-ping opacity-50 z-20 pointer-events-none" style={{ animationDelay: "0.5s" }} />

                {/* Electronic specifications HUD elements overlay */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-cyber-purple/90 z-20 bg-black/80 px-2.5 py-1 rounded-md border border-cyber-purple/30 flex flex-col items-start gap-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39ff88] animate-pulse" />
                    PORTAL_STATE: CONNECTED
                  </span>
                  <span>SYSTEM_COGNITION: 100%</span>
                </div>

                <div className="absolute top-4 right-4 font-mono text-[9px] text-cyber-pink/90 z-20 bg-black/80 px-2.5 py-1 rounded-md border border-cyber-pink/30 font-bold uppercase tracking-wider">
                  LAUNCH RESEARCH CORE
                </div>

                {/* Centered Glowing Portal Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-16 h-16 rounded-full bg-black/80 border border-cyber-purple/60 group-hover:border-cyber-pink flex items-center justify-center shadow-[0_0_20px_var(--theme-primary-glow)] group-hover:shadow-[0_0_35px_var(--theme-accent-glow)] group-hover:scale-110 transition-all duration-500">
                      <Zap className="w-8 h-8 text-cyber-purple group-hover:text-cyber-pink group-hover:rotate-12 transition-all duration-500" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyber-purple-dim border border-cyber-purple-glow/30 font-mono text-[10px] font-bold text-white tracking-widest uppercase group-hover:bg-cyber-pink-dim group-hover:border-cyber-pink-glow/40 transition-colors">
                      OPEN RESEARCH DASHBOARD
                    </span>
                  </div>
                </div>
              </div>

              {/* Card footer description */}
              <div className="p-4.5 border-t border-white/5 bg-black/40 flex items-center justify-between z-20 relative font-mono text-[10px]">
                <div className="flex flex-col text-left">
                  <span className="text-white/40">CONNECTION INTERFACE</span>
                  <span className="text-white/80 font-sans text-xs font-semibold mt-0.5 group-hover:text-cyber-purple transition-colors">
                    Access live RAG indexes & supercomputer data
                  </span>
                </div>
                <span className="text-cyber-pink font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-1 uppercase tracking-wider text-[9px]">
                  Launch Dashboard &rarr;
                </span>
              </div>
            </motion.div>
          </div>

          {/* TruthCheck AI Homepage Entrance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-5xl glass-panel p-6 bg-black/50 border border-cyber-pink/25 hover:border-cyber-pink/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-pink-glow/5 filter blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="text-left space-y-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyber-pink/30 bg-cyber-pink-dim/20 text-cyber-pink text-[10px] font-mono font-bold uppercase select-none">
                  <ShieldCheck className="w-3.5 h-3.5" /> TruthCheck AI
                </span>
                <h3 className="text-lg font-bold text-white">Fact-Check Statements and parameters</h3>
                <p className="text-white/50 text-xs font-sans max-w-xl">
                  Paste a claim regarding computer architecture, CPU performance, or general news. Our fact-checker returns credibility scores and identifies conflicting sources.
                </p>
              </div>

              <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch gap-2.5 shrink-0">
                <input
                  type="text"
                  placeholder="Paste claim to verify..."
                  value={homeClaim}
                  onChange={(e) => setHomeClaim(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && homeClaim.trim() && onEnterWorkspaceWithClaim(homeClaim)}
                  className="bg-black/60 border border-white/10 focus:border-cyber-pink rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none transition-all font-sans min-w-[260px]"
                />
                <button
                  type="button"
                  onClick={() => homeClaim.trim() && onEnterWorkspaceWithClaim(homeClaim)}
                  disabled={!homeClaim.trim()}
                  className="px-5 py-2.5 bg-cyber-pink hover:bg-cyber-pink/85 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer font-mono shadow-[0_0_15px_rgba(236,72,153,0.25)] hover:shadow-[0_0_22px_rgba(236,72,153,0.4)] disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed select-none whitespace-nowrap"
                >
                  Verify Claim
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. THEME SELECTOR & PREVIEW PANEL */}
        <section id="themes" className="glass-panel p-8 flex flex-col gap-6 scroll-mt-24">
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
                    ? "border-cyber-purple bg-cyber-purple/15 shadow-[0_0_25px_var(--theme-primary-glow)]"
                    : "border-cyber-purple/15 bg-black/40 hover:bg-cyber-purple/5 hover:border-cyber-purple/40"
                }`}
              >
                {/* Active glow dot */}
                {activeTheme === themeOpt.id && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyber-pink shadow-[0_0_8px_var(--theme-accent)] animate-pulse" />
                )}
                <h4 className={`text-xs font-bold font-mono ${themeOpt.color}`}>
                  {themeOpt.title}
                </h4>
                <p className="text-[11px] text-white/55 leading-relaxed font-sans mt-1">
                  {themeOpt.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. INTERACTIVE RAG SIMULATOR (HTML-TO-MARKDOWN WORKFLOW) */}
        <section id="simulator" className="glass-panel p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden bg-black/45 scroll-mt-24">
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

            <div className="flex flex-col gap-2 bg-black/40 p-4 border border-cyber-purple/20 rounded-2xl">
              <div className="text-[11px] font-mono text-white/45">SIMULATE SCRAPING PATH</div>
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
                  className="flex-1 bg-black/80 border border-cyber-purple/35 focus:border-cyber-purple p-2.5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-cyber-purple transition-all font-semibold shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                >
                  <option value="https://techblog.com/nvidia-blackwell-launch">https://techblog.com/nvidia-blackwell-launch</option>
                  <option value="https://wikipedia.org/quantum-gate-computing">https://wikipedia.org/quantum-gate-computing</option>
                  <option value="https://reuters.com/market-semiconductor-caps">https://reuters.com/market-semiconductor-caps</option>
                </select>
                <button
                  type="button"
                  onClick={handleRunSimulator}
                  disabled={simulatorStatus === "running"}
                  className="px-4 py-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed select-none shadow-[0_0_15px_var(--theme-primary-dim)] hover:shadow-[0_0_20px_var(--theme-primary-glow)]"
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
              Ingesting raw HTML into LLMs wastes 85% of your token budget on ads and headers. Slide the controls below to calculate your savings using QueryFoundry AI clean markdown ingestion.
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
                  className="w-full h-1.5 bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg appearance-none cursor-pointer accent-cyber-purple transition-all"
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
                  className="w-full h-1.5 bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg appearance-none cursor-pointer accent-cyber-purple transition-all"
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
                          ? "border-cyber-purple bg-cyber-purple/15 text-white font-bold shadow-[0_0_10px_var(--theme-primary-dim)]"
                          : "border-cyber-purple/15 bg-black/40 text-white/60 hover:border-cyber-purple/40 hover:text-white"
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
                    <span className="text-white/70 font-sans">QueryFoundry AI Ingestion (Cleaned)</span>
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

        {/* 4. UPGRADED SMART AI RESPONDER */}
        <section className="glass-panel p-8 flex flex-col gap-6 bg-black/45">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase">
              Interactive Dialogue Node
            </span>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyber-purple" />
              Smart AI Responder
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-sans max-w-xl">
              Connect to the Banu Rohit research node. Type custom questions below, or click suggestions to test real-time responses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 mt-2">
            {/* suggestions panel */}
            <div className="flex flex-col gap-2.5">
              {[
                "Why did you build QueryFoundry AI?",
                "What is your TA role in ECE 5397?",
                "How does the hemodynamics pipeline filter 50M models?",
                "Tell me about your APB UART RTL-to-GDSII chip project."
              ].map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setChatbotQuestion(q);
                  }}
                  className="w-full text-left p-3.5 text-xs font-semibold text-white bg-black/40 hover:bg-cyber-purple/10 border border-cyber-purple/25 hover:border-cyber-purple/60 rounded-2xl transition-all cursor-pointer flex items-center justify-between group shadow-[0_0_15px_rgba(0,0,0,0.3)]"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-cyber-pink group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Smart Response Chat Screen */}
            <div className="glass-card border border-cyber-purple/25 p-5 flex flex-col justify-between bg-black/50 shadow-[inset_0_0_20px_var(--theme-primary-dim)] relative rounded-2xl min-h-[300px] h-[340px]">
              
              {/* Header Status */}
              <div className="flex items-center justify-between text-[9px] font-mono text-white/30 pb-2 border-b border-white/5 select-none">
                <span>NODE_REF: BANU_ROHIT_VUTUKURI</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39ff88] animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-3 space-y-4 font-sans text-xs scrollbar-thin">
                {chatbotConversation.map((msg, index) => (
                  <div key={index} className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "founder" && (
                      <div className="w-6 h-6 rounded-full bg-cyber-purple flex items-center justify-center text-[9px] font-bold text-white select-none shrink-0">
                        BR
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-cyber-purple text-black font-semibold rounded-tr-none" 
                        : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isBotLoading && (
                  <div className="flex gap-2.5 items-center text-cyber-pink font-mono text-[10px] select-none pl-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink animate-ping" />
                    Querying research node...
                  </div>
                )}
              </div>

              {/* Chat Input Field */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <input
                  type="text"
                  placeholder="Ask a custom question..."
                  value={chatbotQuestion}
                  onChange={(e) => setChatbotQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !isBotLoading && handleSendChatbot()}
                  disabled={isBotLoading}
                  className="flex-1 bg-black/60 border border-white/10 focus:border-cyber-purple rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={handleSendChatbot}
                  disabled={isBotLoading || !chatbotQuestion.trim()}
                  className="p-2.5 bg-cyber-purple hover:bg-cyber-purple/80 text-black rounded-xl transition-all cursor-pointer disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed select-none shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ABOUT THE FOUNDER & RESEARCH SECTION */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono text-cyber-pink tracking-widest uppercase flex items-center justify-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Founder & Engineering Research
            </span>
            <h2 className="text-3xl font-extrabold text-white">About the Founder & Research</h2>
            <p className="text-white/50 text-xs sm:text-sm font-sans max-w-xl mx-auto">
              Introducing the engineering foundations, supercomputing pipelines, and research motivations behind QueryFoundry AI.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Block 1 — Founder Intro */}
            <div className="glass-panel p-8 bg-black/45 border border-cyber-purple/25 hover:border-cyber-purple/50 transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
                {/* Left: circular profile image in glowing ring */}
                <div className="flex justify-center">
                  <div className="w-40 h-40 rounded-full p-1 border-2 border-cyber-purple shadow-[0_0_20px_var(--theme-primary-dim)] relative shrink-0">
                    {!imageError ? (
                      <img 
                        src="/founder.jpg" 
                        alt="Banu Rohit Vutukuri" 
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyber-purple to-cyber-pink flex items-center justify-center font-extrabold text-white text-4xl select-none">
                        BR
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: details */}
                <div className="text-left space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-black text-white">Banu Rohit Vutukuri</h3>
                    <p className="text-xs text-cyber-purple font-mono font-bold flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-cyber-purple" />
                      Hardware & Systems Engineer &bull; Builder of AI + Hardware Tools
                    </p>
                    <p className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-white/30" /> Houston / Austin, Texas
                    </p>
                  </div>
                  
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans">
                    I'm a hardware and systems engineer with a Master's in Electrical Engineering (Computer & Embedded Systems) from the University of Houston and a B.Tech in Electronics & Communication Engineering from SRM Institute of Science and Technology, Chennai. I work across hardware design verification, RTL and ASIC design, computer architecture, and large-scale scientific computing. QueryFoundry AI is my attempt to make fast, source-verified research feel as clean and trustworthy as good engineering.
                  </p>
                </div>
              </div>
            </div>

            {/* Block 2 — Research & Work Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Current Roles */}
              <div className="glass-panel p-6 bg-black/45 hover:border-cyber-purple/50 transition-colors flex flex-col gap-4">
                <h4 className="text-xs font-bold font-mono text-cyber-pink uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <GraduationCap className="w-4 h-4 text-cyber-pink" /> Current Roles
                </h4>
                
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1">
                    <span className="font-extrabold text-white">Teaching Assistant — Hardware Verification (ECE 5397)</span>
                    <p className="text-white/60 leading-relaxed">
                      Mentor students in SystemVerilog and UVM-based design verification at the University of Houston.
                    </p>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="font-extrabold text-white">Research Staff — Computational Hemodynamics Lab</span>
                    <p className="text-white/60 leading-relaxed">
                      Run large-scale HPC simulation pipelines on a university supercomputing cluster (SLURM, Python, MATLAB) studying cerebral blood flow. One project screened 50 million candidate models through staged filtering to isolate a small set of physiologically valid configurations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Research & Engineering Domains */}
              <div className="glass-panel p-6 bg-black/45 hover:border-cyber-purple/50 transition-colors flex flex-col gap-4">
                <h4 className="text-xs font-bold font-mono text-cyber-pink uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Laptop className="w-4 h-4 text-cyber-pink" /> Research Domains
                </h4>

                <ul className="space-y-2.5 font-sans text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>Hardware Design Verification (SystemVerilog / UVM / SVA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>RTL Design & ASIC Physical Design (RTL-to-GDSII)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>Computer Architecture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>FPGA & Embedded Firmware (STM32, FreeRTOS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>High-Performance & Cluster Computing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple mt-1.5 shrink-0" />
                    <span>AI-assisted engineering tools</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Selected Projects */}
              <div className="glass-panel p-6 bg-black/45 hover:border-cyber-purple/50 transition-colors flex flex-col gap-4">
                <h4 className="text-xs font-bold font-mono text-cyber-pink uppercase tracking-wider flex items-center gap-1.5 select-none">
                  <Code className="w-4 h-4 text-cyber-pink" /> Selected Projects
                </h4>

                <div className="space-y-3 font-sans text-xs flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="space-y-0.5">
                      <a 
                        href="https://GitHub.com/Vutukuribanurohit02" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-white hover:text-cyber-purple transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        UVM Verification IP <GitHub className="w-3 h-3 text-white/40" />
                      </a>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Reusable APB + AXI4-Lite verification environment (RAL, SVA, scoreboard).
                      </p>
                    </div>

                    <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                      <a 
                        href="https://GitHub.com/Vutukuribanurohit02" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-white hover:text-cyber-purple transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        APB UART RTL-to-GDSII <GitHub className="w-3 h-3 text-white/40" />
                      </a>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Full ASIC implementation on SkyWater 130nm open PDK, closed at 100 MHz.
                      </p>
                    </div>

                    <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                      <a 
                        href="https://GitHub.com/Vutukuribanurohit02" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-white hover:text-cyber-purple transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        HPC Hemodynamics Pipeline <GitHub className="w-3 h-3 text-white/40" />
                      </a>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Checkpoint-resumable simulation pipeline at 50M-model scale.
                      </p>
                    </div>

                    <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                      <a 
                        href="https://GitHub.com/Vutukuribanurohit02" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-white hover:text-cyber-purple transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        FORGE Tracker <GitHub className="w-3 h-3 text-white/40" />
                      </a>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Personal fitness-tracking app designed and built from scratch.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <a 
                      href="https://GitHub.com/Vutukuribanurohit02" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-bold text-cyber-purple hover:text-cyber-pink transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      QueryFoundry AI <GitHub className="w-3.5 h-3.5" />
                    </a>
                    <p className="text-[10px] text-white/40 mt-0.5">
                      This application research dashboard.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Block 3 — Motivation / Ideology */}
            <div className="glass-panel p-8 bg-black/45 border border-cyber-purple/25 text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyber-purple-glow/5 filter blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-3 z-10 relative">
                <span className="text-[10px] font-mono text-cyber-purple font-bold tracking-widest uppercase">Ideology Statement</span>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans italic">
                  "I believe the best engineering — and the best decisions — start with fast, honest, well-sourced research. I build tools that sit at the intersection of AI and hardware, and I care about accuracy over hype. Outside of work I cook, train, and stay involved in my local community. I'm always happy to trade ideas with people building serious things."
                </p>
              </div>
            </div>

            {/* Collaboration Call to Action Panel */}
            <div className="glass-panel p-8 bg-black/45 border border-cyber-purple/25 text-center space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-white">Interested in the research? Let's build together.</h3>
              <p className="text-white/60 text-xs sm:text-sm font-sans max-w-2xl mx-auto leading-relaxed">
                If you're working on hardware verification, computer architecture, scientific computing, or AI-powered tools — or just want to collaborate on the research behind QueryFoundry — reach out. I'm open to conversations, projects, and partnerships.
              </p>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-2.5 bg-cyber-purple hover:bg-cyber-purple/80 text-black font-extrabold text-xs font-mono rounded-xl transition-all cursor-pointer shadow-[0_0_15px_var(--theme-primary-dim)] select-none hover:shadow-[0_0_22px_var(--theme-primary-glow)]"
              >
                Get in Touch
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* 6. BOTTOM CALL-TO-ACTION */}
      <section className="text-center py-12 flex flex-col items-center gap-4 border-t border-cyber-purple/25 w-full bg-black/25">
        <h3 className="text-lg font-bold text-white">Ready to run deep web queries?</h3>
        <button
          type="button"
          onClick={onEnterWorkspace}
          className="px-8 py-3.5 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-[#c084fc] hover:to-[#f472b6] text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_35px_var(--theme-primary-glow)] hover:shadow-[0_0_50px_var(--theme-primary-glow)] font-mono"
        >
          Initialize Research Workspace
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </section>

      {/* 7. COLLABORATION CONTACT MODAL */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="glass-panel max-w-lg w-full p-8 relative overflow-hidden bg-black border border-cyber-purple/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsContactOpen(false);
                  setContactSuccess(null);
                  setContactError(null);
                }}
                className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-1 text-left">
                  <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">Get in Touch</h3>
                  <p className="text-xs text-white/40">Connect directly or submit a message below.</p>
                </div>

                {/* Direct links */}
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="mailto:vutukuribanurohit02@gmail.com"
                    className="p-3 bg-white/2 hover:bg-cyber-purple/10 border border-white/5 hover:border-cyber-purple/40 rounded-xl transition-all flex flex-col items-center gap-1.5 text-center font-mono text-[9px] text-white/70 hover:text-white cursor-pointer select-none"
                  >
                    <Mail className="w-4 h-4 text-cyber-purple" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://www.LinkedIn.com/in/banurohit-vutukuri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/2 hover:bg-cyber-purple/10 border border-white/5 hover:border-cyber-purple/40 rounded-xl transition-all flex flex-col items-center gap-1.5 text-center font-mono text-[9px] text-white/70 hover:text-white cursor-pointer select-none"
                  >
                    <LinkedIn className="w-4 h-4 text-cyber-purple" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://GitHub.com/Vutukuribanurohit02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/2 hover:bg-cyber-purple/10 border border-white/5 hover:border-cyber-purple/40 rounded-xl transition-all flex flex-col items-center gap-1.5 text-center font-mono text-[9px] text-white/70 hover:text-white cursor-pointer select-none"
                  >
                    <GitHub className="w-4 h-4 text-cyber-purple" />
                    <span>GitHub</span>
                  </a>
                </div>

                <div className="relative flex py-1 items-center select-none">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-white/20 font-mono text-[9px] uppercase">OR SEND MESSAGE</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Message form */}
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                  {contactError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[11px] text-red-400 font-mono">
                      {contactError}
                    </div>
                  )}

                  {contactSuccess && (
                    <div className="p-3 bg-[#39ff88]/10 border border-[#39ff88]/20 rounded-xl text-[11px] text-[#39ff88] font-mono">
                      {contactSuccess}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="text-[10px] font-mono text-white/40 uppercase">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={isContactSubmitting}
                      className="w-full bg-black border border-white/10 focus:border-cyber-purple rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-[10px] font-mono text-white/40 uppercase">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={isContactSubmitting}
                      className="w-full bg-black border border-white/10 focus:border-cyber-purple rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-msg" className="text-[10px] font-mono text-white/40 uppercase">Your Message</label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      required
                      placeholder="Discuss hardware design verification, research projects, or collaboration ideas..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      disabled={isContactSubmitting}
                      className="w-full bg-black border border-white/10 focus:border-cyber-purple rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 outline-none transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full py-2.5 bg-cyber-purple hover:bg-cyber-purple/85 text-black font-extrabold text-xs font-mono rounded-xl transition-all cursor-pointer disabled:bg-white/5 disabled:text-white/30 disabled:border disabled:border-white/5 disabled:cursor-not-allowed select-none shadow-[0_0_15px_var(--theme-primary-dim)]"
                  >
                    {isContactSubmitting ? "Sending message..." : "Send Message"}
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
