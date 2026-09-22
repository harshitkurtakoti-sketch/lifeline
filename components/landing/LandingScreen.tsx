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
    // Cycle between SIGNALS -> CONTEXT -> RESPONSE every 3.5 seconds
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
    { label: "Camera", icon: Camera, color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10", pos: "top-4 left-6" },
    { label: "Microphone", icon: Mic, color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", pos: "top-4 right-6" },
    { label: "Motion", icon: Activity, color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", pos: "bottom-12 left-4" },
    { label: "Location", icon: MapPin, color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10", pos: "bottom-12 right-4" },
    { label: "AI Core", icon: Cpu, color: "text-[#ff2d55]", border: "border-[#ff2d55]/30", bg: "bg-[#ff2d55]/10", pos: "-top-3 left-1/2 -translate-x-1/2" },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-between min-h-[640px] text-center">
      {/* Brand Badge */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
          iQOO HACKATHON INNOVATION
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
          LIFE<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#ff2d55]">LINE</span>
        </h1>
        <h2 className="text-base sm:text-lg font-bold text-slate-200 tracking-wide max-w-md mx-auto uppercase">
          &ldquo;WHEN YOU CAN&apos;T EXPLAIN WHAT HAPPENED, LIFELINE UNDERSTANDS IT.&rdquo;
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          An intelligent emergency companion that combines your phone&apos;s sensors, camera, audio and on-device AI to understand unusual situations and help you respond.
        </p>
      </div>

      {/* Subtle 3D Visualization: Smartphone surrounded by converging sensor signals */}
      <div className="relative w-full max-w-sm h-64 my-6 flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute w-48 h-48 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        {/* Central Smartphone Mockup Frame */}
        <div className="relative w-28 h-52 rounded-3xl bg-[#0b0e17] border-2 border-white/20 shadow-2xl flex flex-col items-center justify-between p-2 z-20">
          {/* Speaker ear slit */}
          <div className="w-8 h-1 rounded-full bg-white/20 mt-1" />

          {/* Central Converging Display */}
          <div className="w-full flex-1 flex flex-col items-center justify-center p-1">
            {convergeStage === "SIGNALS" && (
              <div className="flex flex-col items-center animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 animate-pulse mb-1">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  FUSION
                </span>
                <span className="text-[7px] text-slate-400">Listening</span>
              </div>
            )}

            {convergeStage === "CONTEXT" && (
              <div className="flex flex-col items-center animate-scale-up">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 animate-bounce mb-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest">
                  CONTEXT
                </span>
                <span className="text-[7px] text-amber-200/80">Synthesizing</span>
              </div>
            )}

            {convergeStage === "RESPONSE" && (
              <div className="flex flex-col items-center animate-scale-up">
                <div className="w-10 h-10 rounded-full bg-[#ff2d55]/20 border border-[#ff2d55] flex items-center justify-center text-[#ff2d55] shadow-[0_0_12px_#ff2d55] mb-1">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#ff2d55] uppercase tracking-widest">
                  RESPONSE
                </span>
                <span className="text-[7px] text-red-200/80">Ready</span>
              </div>
            )}
          </div>

          {/* Home indicator bar */}
          <div className="w-10 h-1 rounded-full bg-white/20 mb-1" />
        </div>

        {/* Orbiting Sensor Nodes with animated directional lines */}
        {sensorNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={idx}
              className={`absolute ${node.pos} flex items-center gap-1.5 px-2.5 py-1 rounded-full ${node.bg} ${node.border} border backdrop-blur-md z-10 transition-transform duration-700 ${
                convergeStage === "CONTEXT"
                  ? "scale-90 opacity-70 translate-y-2"
                  : convergeStage === "RESPONSE"
                  ? "scale-105 opacity-100"
                  : "scale-100"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${node.color}`} />
              <span className={`text-[10px] font-mono font-bold ${node.color}`}>
                {node.label}
              </span>
            </div>
          );
        })}

        {/* Stage Status Ribbon */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-slate-300">
          STAGE: <span className="text-cyan-400 font-bold">{convergeStage}</span>
        </div>
      </div>

      {/* CTA Button Group */}
      <div className="w-full space-y-3 pt-2">
        <button
          id="btn-start-safety"
          onClick={onStartSafetyMode}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-[0.98]"
        >
          <ShieldCheck className="w-6 h-6" />
          <span>START SAFETY MODE</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onSeeHowItWorks}
            className="py-3 px-3 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>SEE HOW IT WORKS</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="py-3 px-3 rounded-xl bg-gradient-to-r from-[#ff5e00]/20 to-[#ff2d55]/20 hover:bg-white/10 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 border border-[#ff5e00]/40 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ff5e00]" />
            <span>60s JUDGE TOUR</span>
          </button>
        </div>
      </div>
    </div>
  );
}
