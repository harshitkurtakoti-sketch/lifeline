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
      detail: "Acoustic decibel and transient impulse filters run entirely in memory on-device. No audio recordings or ambient sound clips are stored or uploaded.",
      icon: EyeOff,
    },
    {
      title: "Camera context processed locally where supported",
      detail: "Computer vision horizon & tilt classification executes on edge NPU runtime. Visual frames are processed transiently and immediately discarded.",
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
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-3 flex flex-col gap-4 animate-fade-in pb-20">
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-black tracking-tight text-white uppercase">
            YOUR DATA. YOUR DEVICE.
          </h1>
          {/* Glowing Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
              LOCAL-FIRST AI
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-300 font-medium">
          LIFELINE is designed around local-first processing.
        </p>
      </div>

      {/* Main explanation badge */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wide">
              Zero Cloud Dependency for Core Detection
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every stage of emergency inference—from high-rate inertial signal processing to contextual reasoning—runs locally within your phone&apos;s on-device AI runtime.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Guarantees List */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block px-0.5">
          DEVICE ARCHITECTURE &amp; SAFEGUARDS
        </span>

        {privacyPrinciples.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-3.5 rounded-xl border border-white/10 flex items-start gap-3 transition-colors hover:border-white/20"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-2.5 text-[11px] text-slate-400">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-300">Hackathon Prototype Notice:</strong>{" "}
          This application operates purely as an interactive demonstration. Sensor streams are simulated or locally scoped via standard browser APIs. No cloud telemetry pipelines are activated.
        </div>
      </div>
    </div>
  );
}
