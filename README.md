# 🚨 LIFELINE — AI-Powered Emergency Detection & First Response

> **When you can't explain what happened, LIFELINE understands it.**  
> *Built for the iQOO Hackathon.*

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MCP Ready](https://img.shields.io/badge/MCP-Ready-8b5cf6?style=for-the-badge)](https://modelcontextprotocol.io/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_On--Device-10b981?style=for-the-badge)](https://github.com/harshitkurtakoti-sketch/lifeline)

---

## 📌 Problem & Vision

In sudden accidents, vehicular collisions, or medical emergencies, victims are frequently unconscious, disoriented, or physically unable to reach their phone to dial emergency services or explain what happened. 

Traditional crash detection tools are either binary or cloud-reliant:
- High false-positive rates (dropping a phone triggers false alarms).
- Cloud dependency causes delays in low-connectivity zones.
- Generic SOS triggers lack contextual evidence (first responders don't know the impact severity, speed, or orientation).

**LIFELINE** solves this by turning any smartphone into an **autonomous on-device first-response unit**. Using real-time sensor fusion and contextual AI reasoning, LIFELINE analyzes abnormal motion spikes, audio trauma signatures, camera scene orientation, and GPS coordinates to verify genuine emergencies and dispatch critical evidence immediately.

---

## ✨ Key Features

### 1. 🌐 Live Multi-Sensor Matrix & 3D Safety Core
- **Interactive 3D Safety Core**: Dynamic particle sphere that visually communicates the phone's safety state (`SAFE`, `MONITORING`, `IMPACT SPIKE`, `ANALYZING`, `RESPONSE`).
- **Inertial Vector Telemetry**: Continuous 50–100Hz monitoring of multi-axis acceleration ($G$-force, X/Y/Z) and device tilt angle.
- **Acoustic Decibel Waveform**: Passive noise monitoring detecting sudden high-decibel crash sounds.
- **Computer Vision Scene HUD**: Real-time edge reticles verifying stationary horizon or rollover orientation.
- **Tactical GPS Radar**: Live coordinate tracking with $\pm 4.2\text{m}$ precision accuracy.

### 2. ⚡ Cinematic 4-Stage Detection Flow
1. **Abnormal Motion Spike**: High-G deceleration ($28.4\text{ m/s}^2$) detected.
2. **Context Triangulation**: Sudden acoustic burst ($86\text{ dB}$) correlated with 90° orientation shift.
3. **Pattern Classification**: Differentiates casual phone drops from vehicle/two-wheeler collisions.
4. **User Verification**: 20-second audible/haptic countdown before autonomous dispatch.

### 3. 🛡️ Human-in-the-Loop Safety
- **"I'M SAFE"**: Immediate one-tap override with false alarm logging.
- **"GET HELP"**: Immediate dispatch override bypassing the countdown timer.
- **AI Situation Analysis**: Comprehensive breakdown showing timeline reasoning, observable sensor signals, and an 87% confidence breakdown.

### 4. 📲 Context-Rich Emergency Dispatch
- Automatically compiles a structured SOS payload with:
  - Exact GPS coordinates & reverse-geocoded landmark (e.g. *Cyber Towers Flyover, Hyderabad*).
  - Detected event category & impact force.
  - Device battery and vital context.
- Previews the encrypted message for trusted contacts (e.g. *Dr. Ananya Sharma*).
- Interactive simulated notification dispatch with feedback confirmation.

### 5. 🔌 Model Context Protocol (MCP) Integration
LIFELINE natively implements the **Model Context Protocol**, allowing AI desktop agents (Claude Desktop, Cursor, OpenAI Agents) to inspect and orchestrate phone safety tools:
- `analyze_situation()`: Evaluates multi-modal sensor state.
- `get_location_context()`: Returns high-precision tactical coordinates.
- `prepare_emergency_message()`: Formats actionable emergency responder payloads.
- Includes an in-app **MCP Tool Inspector** to test tool calls with live JSON output.

### 6. 🔒 100% Local-First Privacy Architecture
- All neural heuristic evaluations run entirely on-device (sub-15ms NPU latency).
- Zero continuous streaming of raw microphone audio or camera frames to external servers.
- GPS data is only packaged when the thresholded emergency state is confirmed.

---

## 🏗️ Technical Architecture

```
Hardware Sensors (IMU, Mic, Camera, GPS)
                   │
                   ▼ (50–100Hz)
       [ Signal Processing Engine ]  <-- 500ms Rolling FIFO Buffers
                   │
                   ▼
         [ On-Device Local AI ]      <-- Sub-15ms NPU Latency
                   │
                   ▼
        [ Context Triangulation ]    <-- Multi-Modal Synthesis
                   │
                   ▼
       [ Emergency Decision Gate ]
        ├── NOMINAL   --> Continuous Passive Monitoring
        ├── SUSPICIOUS--> Soft Probe / Haptic Check
        └── CRITICAL  --> 20s Confirmation Countdown
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
        [ "I'm Safe" ]               [ "Get Help" / Timeout ]
        Reset & Log Event            Autonomous SOS Dispatch + MCP Payload
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshitkurtakoti-sketch/lifeline.git

# 2. Navigate to project directory
cd lifeline

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Hackathon Demo Walkthrough (60 Seconds)

1. **Dashboard & Safety Core**: Observe the 3D particle sphere pulsing in `SAFE` mode with live sensor graphs.
2. **Device Bezel Toggle**: Click the mobile frame icon in the top right to switch between realistic smartphone view and fluid widescreen desktop view.
3. **Trigger Emergency Simulation**:
   - Click **"SIMULATE EMERGENCY"** on the dashboard.
   - Watch the 4-step detection sequence.
4. **Inspect AI Breakdown**: On the *"ARE YOU OKAY?"* screen, click **"View AI Breakdown"** to see the 87% confidence rating and timeline evidence.
5. **Simulate Dispatch**: Click **"Continue to Emergency Mode"** and click **"NOTIFY CONTACT"** to test the SOS dispatch.
6. **Explore Navigation Tabs**:
   - **Pipeline**: Interactive 6-stage dataflow diagram.
   - **History**: Historical incident log with inspectable modal details.
   - **Privacy**: Local-first sandboxing guarantees.
   - **MCP**: Interactive Model Context Protocol tool runner with executable JSON.
7. **Judge Tour**: Click **"Demo Tour"** in the top navigation bar for a guided walkthrough.

---

## 📄 License

MIT License © 2026 Harshit Kurtakoti. Built for the iQOO Hackathon.
