"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Lock,
  EyeOff,
  Radio,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Key,
  DatabaseZap,
} from "lucide-react";

export default function PrivacyPanel() {
  const privacyPrinciples = [
    {
      title: "Motion processed locally",
      detail: "Accelerometer & gyroscope telemetry streams are calculated directly within the device neural sandbox. Raw motion vectors never leave the phone.",
      icon: Cpu,
    },
    {
      title: "Audio processing designed for local analysis",
      detail: "Acoustic decibel and transient impulse filters run entirely in volatile memory on-device. No audio recordings or ambient sound clips are stored or uploaded.",
      icon: EyeOff,
    },
    {
      title: "Camera vision edge execution",
      detail: "Computer vision horizon & tilt classification executes on edge NPU runtime. Visual frames are processed transiently in RAM and immediately discarded.",
      icon: Lock,
    },
    {
      title: "Location shared only during emergency workflow",
      detail: "Tactical GPS coordinates remain sandboxed on your device and are exclusively packaged into dispatch payloads when an emergency is triggered.",
      icon: MapPin,
    },
    {
      title: "User controls emergency activation",
      detail: "A mandatory confirmation window gives you continuous override authority to cancel false alerts before any contact notification occurs.",
      icon: Radio,
    },
    {
      title: "Cryptographic local persistence",
      detail: "Historical event summaries are stored in encrypted on-device SQLite storage protected by hardware keystore keys.",
      icon: Key,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-fade-in pb-28 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              LOCAL-FIRST PRIVACY ARCHITECTURE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            LIFELINE is strictly designed around local-first processing. Your personal telemetry never leaves your device.
          </p>
        </div>

        {/* Glowing Status Indicator */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
            LOCAL-FIRST AI ENGINE
          </span>
        </div>
      </div>

      {/* Main Responsive Grid: 2 Columns on Laptop / Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Zero Cloud Hero Card & Architecture Sandbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main explanation badge */}
          <div className="glass-panel p-6 rounded-3xl border border-white/15 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wide">
                  Zero Cloud Dependency for Core Detection
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  Every stage of emergency inference—from high-rate inertial signal processing to contextual reasoning—runs locally within your phone&apos;s on-device neural runtime.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Guarantees Comparison */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
              DATA FLOW COMPARISON
            </span>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                <span>LIFELINE LOCAL ARCHITECTURE</span>
                <span className="font-mono">0 BYTES UPLOADED</span>
              </div>
              <p className="text-xs text-slate-300">
                Sensors → Volatile RAM Buffer → Local NPU → Instant Decision. No server hops.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 opacity-70">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-1">
                <span>CONVENTIONAL CLOUD SAFETY APPS</span>
                <span className="font-mono text-red-400">HIGH RISK</span>
              </div>
              <p className="text-xs text-slate-400">
                Continuous background location tracking + microphone audio streaming to remote cloud databases.
              </p>
            </div>
          </div>

          {/* Transparent Disclaimer Box */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 text-xs text-slate-400">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-slate-300">Hackathon Prototype Notice:</strong>{" "}
              This application operates purely as an interactive demonstration. Sensor streams are simulated or locally scoped via standard browser APIs. No cloud telemetry pipelines are activated.
            </div>
          </div>
        </div>

        {/* Right Column: Privacy Safeguards Grid (7 Cols on Laptop) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block px-1 font-bold">
            DEVICE ARCHITECTURE &amp; SAFEGUARDS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {privacyPrinciples.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between transition-all hover:border-white/25 hover:bg-white/5 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-3 pt-2 border-t border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ENFORCED BY LOCAL HARDWARE</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
