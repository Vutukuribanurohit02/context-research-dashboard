# ⚡ QueryFoundry AI

> **Premium AI-Powered Factual Research, Verification & Smart-Response Workspace**
> Built using Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion, and Google Gemini AI.

QueryFoundry AI is a state-of-the-art cognitive workspace designed to solve factual grounding, news verification, and hardware design research. By combining deep search web indexing, resident-crawling web parsers, and structured Gemini-driven synthesis, it turns rough topics or claims into structured, cited insights. 

The application is built with a premium **Spatial Glassmorphism UI** (inspired by Apple Vision Pro aesthetics) featuring rich cyber-grid overlays, floating background light orbs, and custom micro-interactions.

---

## 🚀 Key Features

### 1. Query Foundry Card (Entry Architect)
An interactive entry bridge card on the homepage. Users can input a rough keyword, idea, or claim and receive a structured AI-style preview:
*   **Suggested Research Direction**: A roadmap of how to investigate the topic.
*   **Suggested Keywords**: Key terms to include in deep queries.
*   **Confidence Score**: AI-generated baseline confidence rating.
*   **Recommended Dashboard Mode**: Suggests *Quick*, *Standard*, or *Deep* exploration.
*   *With a single click, users can migrate their pre-filled query directly into the main workspace.*

### 2. Live Research Workspace Dashboard
A robust real-time research panel connected to live index search APIs.
*   **Depth Control**: Toggle search scopes between *Quick* (fast scanning), *Standard* (balanced sources), and *Deep* (heavy verification).
*   **Source Filters**: Target specific subsets of the web: *Scientific Papers*, *News Articles*, *Tech Blogs*, or *Company Pages*.
*   **Structured Research Board**: Organizes findings into logical sections with verifiable citations, metadata blocks, and clean summaries.
*   **Search History & Sidebar**: Stores search queries in client storage (`localStorage`) for session persistence.

### 3. TruthCheck AI (Factual Assertion Verifier)
A dedicated, full-width workspace designed to fact-check statements regarding computer architecture, CPU performance, general news, or claims.
*   **Truth Status Badges**: Classifies claims into *Verified*, *Partially True*, or *False*.
*   **Evidence Quotations**: Extracts direct quotes from crawled articles as grounding proof.
*   **Confidence Sliders**: Visual score meters of factual credibility.
*   **Fix This Claim**: Suggests a revised, factual rewording of the original claim to correct misinformation.

### 4. Interactive Tech Demonstrations
*   **Ingestion Pipeline Simulator**: A step-by-step visual workflow explaining how QueryFoundry strips web bloat (cookielaw banners, Google AdSense frames, navbars) to output clean, token-efficient Markdown, saving up to **85%** of LLM token costs.
*   **ROI Token Calculator**: Slides for daily crawls and average page sizes, calculating monthly API token savings and financial ROI in real-time.

### 5. Smart AI Responder (Founder Q&A Node)
A chat interface acting as a personal research assistant. Powered by Gemini, it emulates the first-person voice of the developer and founder, **Banu Rohit Vutukuri**, answering queries regarding:
*   Hardware design verification (SystemVerilog, UVM, SVA).
*   ASIC RTL-to-GDSII physical implementation (SkyWater 130nm PDK).
*   High-Performance Computing (HPC) simulation checkpoints.
*   Direct link integration to developer portfolio projects.

### 6. Interactive Theme & Mode Engine
*   **Four Visual Themes**:
    *   🟢 **Model 1: Cyber-Lab (Default)**: Bright neon-green consoles and matrix grid trace lines.
    *   🟣 **Model 2: Spatial Nebula**: Apple-style translucent glass with deep-purple glow orbs.
    *   🔵 **Model 3: Quantum Grid**: Laser gold and electric blue circuit indicators.
    *   🟠 **Model 4: Advanced Robotics**: Warning orange and gunmetal heavy industrial UI.
*   **Three Interface Modes**:
    *   **Dark Mode (Default)**: Frost blurs, gradient glows, and glass panels.
    *   **Classic Mode**: Solid retro dark-gray cards (`#0b0c10`), no blurs/glows, and high contrast.
    *   **System Mode**: Adapts to the operating system's light/dark settings. If system light-mode is active, it translates all cards, forms, inputs, and switchers into clean, high-contrast light styling.

---

## 🛠️ Tech Stack & Architecture

### Frontend
*   **Core**: React 19 (TypeScript), Next.js 16 (Turbopack)
*   **Styles**: Tailwind CSS v4 & PostCSS (utilizing relative colors, CSS variable bindings, and `@theme` definitions)
*   **Animations**: Framer Motion (for smooth view transitions, accordion panels, and loading flows)
*   **Icons**: Lucide React

### Backend (Serverless API Handlers)
*   `src/app/api/query-foundry/route.ts`: Synthesizes keyword roadmaps.
*   `src/app/api/verify-claim/route.ts`: Evaluates assertions and cross-references them against web sources.
*   `src/app/api/smart-responder/route.ts`: Speaks in the first-person voice of founder Banu Rohit Vutukuri.
*   `src/app/api/contact/route.ts`: Validates and submits contact forms.
*   `src/app/api/research/route.ts`: Synthesizes research boards from query inputs.

---

## 📦 Installation & Local Setup

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed.

### 1. Clone & Navigate
```bash
git clone https://github.com/Vutukuribanurohit02/context-research-dashboard.git
cd context-research-dashboard
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build
To build and check TypeScript/PostCSS compilation:
```bash
npm.cmd run build
```

---

## 💡 Accessibility & Contrast Focus
Every interactive component was rigorously designed to ensure readability:
*   **Adaptive Button Text**: Primary and accent buttons dynamically swap text colors between black and white depending on the background brightness of the active theme (e.g. black text on Cyber green; white text on Spatial purple).
*   **Contrast-Aware Disable States**: Disabled buttons map to system-level light or dark opacity colors (instead of browser defaults), ensuring they are legible and consistent in all configurations.
*   **Mode Swapping**: Full support for Dark, Classic, and System configurations ensures users can customize contrast to fit their visual preferences.
