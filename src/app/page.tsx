"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import ResearchWorkspace from "@/components/ResearchWorkspace";

export default function Home() {
  const [activeView, setActiveView] = useState<"home" | "workspace">("home");
  const [theme, setTheme] = useState<"cyber" | "spatial" | "quantum" | "robotics">("cyber");
  const [mode, setMode] = useState<"dark" | "classic" | "system">("dark");
  const [prefilledQuery, setPrefilledQuery] = useState("");
  const [prefilledMode, setPrefilledMode] = useState<"quick" | "standard" | "deep">("standard");
  const [prefilledClaim, setPrefilledClaim] = useState("");
  const [initialTab, setInitialTab] = useState<"research" | "truthcheck">("research");

  const handleEnterWorkspaceWithQuery = (query: string, mode: "quick" | "standard" | "deep") => {
    setPrefilledQuery(query);
    setPrefilledMode(mode);
    setPrefilledClaim("");
    setInitialTab("research");
    setActiveView("workspace");
  };

  const handleEnterWorkspaceWithClaim = (claim: string) => {
    setPrefilledClaim(claim);
    setPrefilledQuery("");
    setInitialTab("truthcheck");
    setActiveView("workspace");
  };

  return (
    <div className={`relative min-h-screen flex flex-col font-sans overflow-x-hidden theme-${theme} mode-${mode}`}>
      {/* Cyber background grid overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0 opacity-80" />

      {/* Dynamic glowing background orbs based on the active theme */}
      <div className="absolute top-[8%] left-[10%] w-[380px] h-[380px] rounded-full bg-cyber-purple/10 filter blur-[110px] animate-float-slow pointer-events-none z-0 transition-all duration-700" />
      <div className="absolute bottom-[8%] right-[10%] w-[420px] h-[420px] rounded-full bg-cyber-pink/8 filter blur-[130px] animate-float-delayed pointer-events-none z-0 transition-all duration-700" />

      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <LandingPage
                activeTheme={theme}
                setTheme={setTheme}
                activeMode={mode}
                setMode={setMode}
                onEnterWorkspace={() => {
                  setPrefilledQuery("");
                  setPrefilledClaim("");
                  setInitialTab("research");
                  setActiveView("workspace");
                }}
                onEnterWorkspaceWithQuery={handleEnterWorkspaceWithQuery}
                onEnterWorkspaceWithClaim={handleEnterWorkspaceWithClaim}
              />
            </motion.div>
          ) : (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 p-6"
            >
              <ResearchWorkspace
                theme={theme}
                onBackToHome={() => setActiveView("home")}
                activeMode={mode}
                setMode={setMode}
                prefilledQuery={prefilledQuery}
                prefilledMode={prefilledMode}
                prefilledClaim={prefilledClaim}
                initialTab={initialTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

