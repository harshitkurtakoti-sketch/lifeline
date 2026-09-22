"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Camera,
  Mic,
  Activity,
  MapPin,
  Cpu,
  Layers,
  Zap,
  Lock,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

interface LandingScreenProps {
  onStartSafetyMode: () => void;
  onSeeHowItWorks: () => void;
  onOpenDemo: () => void;
}

export default function LandingScreen({
  onStartSafetyMode,
  onSeeHowItWorks,
  onOpenDemo,
}: LandingScreenProps) {
  const [convergeStage, setConvergeStage] = useState<
    "SIGNALS" | "CONTEXT" | "RESPONSE"
  >("SIGNALS");

  useEffect(() => {
    // Cycle between SIGNALS -> CONTEXT -> RESPONSE every 3.2 seconds
    const interval = setInterval(() => {
      setConvergeStage((prev) => {
        if (prev === "SIGNALS") return "CONTEXT";
        if (prev === "CONTEXT") return "RESPONSE";
        return "SIGNALS";
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const sensorNodes = [
    { label: "Camera", icon: Camera, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", pos: "top-4 left-4 sm:left-6" },
    { label: "Microphone", icon: Mic, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", pos: "top-4 right-4 sm:right-6" },
    { label: "100Hz IMU", icon: Activity, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", pos: "bottom-12 left-2 sm:left-4" },
    { label: "Location", icon: MapPin, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", pos: "bottom-12 right-2 sm:right-4" },
    { label: "Local AI Core", icon: Cpu, color: "text-[#ff2d55]", border: "border-[#ff2d55]/30", bg: "bg-[#ff2d55]/10", pos: "-top-3 left-1/2 -translate-x-1/2" },
  ];

  const highlights = [
    {
      icon: Cpu,
      title: "Local-First On-Device AI",
      desc: "Sub-15ms inference without network reliance. Works inside tunnels, basements, and remote highways.",
      color: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/5",
    },
    {
      icon: Activity,
      title: "Multimodal Fusion",
      desc: "Combines 100Hz accelerometer and gyro curves with acoustic crash peaks and vision telemetry.",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
    },
    {
      icon: Lock,
      title: "Zero Cloud Data Leakage",
      desc: "Camera frames and mic audio remain encrypted in transient RAM and are discarded immediately.",
      color: "text-amber-400",
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
    },
    {
      icon: Zap,
      title: "Smart Incident Triage",
      desc: "Intelligently distinguishes harmless drops from severe impacts to eliminate false alarms.",
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]/20",
      bg: "bg-[#ff2d55]/5",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 flex flex-col justify-between">
      {/* Hero Section: Responsive Split on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Headlines & CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase font-semibold">
              iQOO HACKATHON INNOVATION
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
              100% LOCAL AI
            </span>
          </div>

          {/* Main Hero Header */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase font-sans leading-none">
              LIFE<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#ff2d55] to-[#ff5e00]">LINE</span>
            </h1>
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-200 tracking-wide max-w-2xl uppercase">
              &ldquo;WHEN YOU CAN&apos;T EXPLAIN WHAT HAPPENED, LIFELINE UNDERSTANDS IT.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              An intelligent on-device emergency companion that synthesizes your phone&apos;s 100Hz motion sensors, acoustic spikes, optic camera context, and real-time AI to detect critical incidents and mobilize first response.
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl pt-1">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
              <span className="block text-xl font-mono font-black text-cyan-400">12ms</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Inference Speed</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
              <span className="block text-xl font-mono font-black text-emerald-400">100Hz</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">IMU Sampling</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
              <span className="block text-xl font-mono font-black text-amber-400">0 B</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Cloud Reliance</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
              <span className="block text-xl font-mono font-black text-[#ff2d55]">±4.2m</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">GPS Precision</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="btn-start-safety"
              onClick={onStartSafetyMode}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-[0.98]"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>START SAFETY MODE</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenDemo}
              className="py-4 px-5 rounded-2xl bg-gradient-to-r from-[#ff5e00]/20 to-[#ff2d55]/20 hover:bg-white/10 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-[#ff5e00]/40 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-[#ff5e00]" />
              <span>60s JUDGE TOUR</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Visualization of Converging Telemetry */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-md h-80 sm:h-96 flex items-center justify-center">
            {/* Ambient radial glows */}
            <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="absolute w-48 h-48 rounded-full bg-[#ff2d55]/10 blur-2xl pointer-events-none" />

            {/* Central Phone Hardware Visualizer with Cyber Ring */}
            <div className="relative w-36 h-64 rounded-3xl bg-[#0b0e17] border-2 border-white/20 shadow-2xl flex flex-col items-center justify-between p-3 z-20">
              {/* Speaker pill */}
              <div className="w-10 h-1.5 rounded-full bg-white/20 mt-1" />

              {/* Central Converging Display */}
              <div className="w-full flex-1 flex flex-col items-center justify-center p-2">
                {convergeStage === "SIGNALS" && (
                  <div className="flex flex-col items-center animate-fade-in text-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 animate-pulse mb-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                      MULTIMODAL FUSION
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">Continuous Ingestion</span>
                  </div>
                )}

                {convergeStage === "CONTEXT" && (
                  <div className="flex flex-col items-center animate-scale-up text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-400 animate-bounce mb-2 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-black text-amber-300 uppercase tracking-widest">
                      AI REASONING
                    </span>
                    <span className="text-[9px] text-amber-200/80 mt-0.5">Synthesizing Physics</span>
                  </div>
                )}

                {convergeStage === "RESPONSE" && (
                  <div className="flex flex-col items-center animate-scale-up text-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff2d55]/20 border border-[#ff2d55] flex items-center justify-center text-[#ff2d55] shadow-[0_0_24px_#ff2d55] mb-2">
                      <ShieldCheck className="w-7 h-7 animate-pulse" />
                    </div>
                    <span className="text-xs font-mono font-black text-[#ff2d55] uppercase tracking-widest">
                      ACTIVE GUARDIAN
                    </span>
                    <span className="text-[9px] text-red-200/80 mt-0.5">Emergency Armed</span>
                  </div>
                )}
              </div>

              {/* Bottom indicator */}
              <div className="w-12 h-1 rounded-full bg-white/30 mb-1" />
            </div>

            {/* Orbiting Sensor Nodes with animated positions */}
            {sensorNodes.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div
                  key={idx}
                  className={`absolute ${node.pos} flex items-center gap-1.5 px-3 py-1.5 rounded-full ${node.bg} ${node.border} border backdrop-blur-md z-10 transition-all duration-700 shadow-md ${
                    convergeStage === "CONTEXT"
                      ? "scale-95 opacity-80"
                      : convergeStage === "RESPONSE"
                      ? "scale-105 opacity-100 ring-1 ring-white/30"
                      : "scale-100"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${node.color}`} />
                  <span className={`text-[11px] font-mono font-bold ${node.color}`}>
                    {node.label}
                  </span>
                </div>
              );
            })}

            {/* Stage Status Ribbon */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono px-3 py-1 rounded-full bg-[#0a0d16] border border-white/20 text-slate-300 shadow-lg">
              STAGE: <span className="text-cyan-400 font-bold">{convergeStage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid for Laptop/Desktop & Mobile */}
      <div className="pt-14 pb-8">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            ENGINEERING CAPABILITIES
          </span>
          <button
            onClick={onSeeHowItWorks}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>Explore Technical Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl ${item.bg} border ${item.border} backdrop-blur-md flex flex-col justify-between transition-all hover:border-white/30 hover:translate-y-[-2px] group`}
              >
                <div>
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit mb-3 ${item.color}`}>
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
