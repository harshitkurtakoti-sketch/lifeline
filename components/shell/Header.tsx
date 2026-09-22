"use client";

import React from "react";
import { ActiveScreen } from "@/lib/types";
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Layers,
  History,
  Lock,
  Terminal,
  Flame,
  Radio,
} from "lucide-react";

interface HeaderProps {
  currentScreen: ActiveScreen;
  onSelectScreen?: (screen: ActiveScreen) => void;
  onOpenDemoTour: () => void;
  onTriggerEmergency?: () => void;
  onGoHome: () => void;
}

export default function Header({
  currentScreen,
  onSelectScreen,
  onOpenDemoTour,
  onTriggerEmergency,
  onGoHome,
}: HeaderProps) {
  const navLinks = [
    { id: "dashboard" as const, label: "Safety Core", icon: ShieldCheck },
    { id: "architecture" as const, label: "AI Pipeline", icon: Layers },
    { id: "history" as const, label: "Incident History", icon: History },
    { id: "privacy" as const, label: "Local Privacy", icon: Lock },
    { id: "developer" as const, label: "MCP Tools", icon: Terminal },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#06070a]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0 transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff2d55] to-[#ff5e00] flex items-center justify-center shadow-[0_0_16px_rgba(255,45,85,0.45)] ring-1 ring-white/20">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                LIFELINE
              </span>
              <span className="text-[9px] font-mono text-[#ff5e00] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#ff5e00]/10 border border-[#ff5e00]/30">
                iQOO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              On-Device Emergency AI Companion
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links (Laptop / Desktop) */}
        {onSelectScreen && currentScreen !== "landing" && (
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectScreen(link.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] border border-cyan-500/40"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions & Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Sensor Mode Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              100Hz Local IMU
            </span>
          </div>

          {/* Quick Trigger Emergency CTA (Desktop) */}
          {onTriggerEmergency && currentScreen !== "confirmation" && currentScreen !== "response" && (
            <button
              onClick={onTriggerEmergency}
              title="Simulate sudden impact anomaly"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#ff2d55]/20 to-red-600/20 hover:from-[#ff2d55]/30 hover:to-red-600/30 text-[#ff2d55] hover:text-white border border-[#ff2d55]/40 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95 group"
            >
              <Flame className="w-3.5 h-3.5 text-[#ff2d55] group-hover:scale-110 transition-transform animate-pulse" />
              <span>Test Sim</span>
            </button>
          )}

          {/* 60s Demo Mode Badge Button */}
          <button
            onClick={onOpenDemoTour}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-[#ff5e00]/15 hover:from-amber-500/25 hover:to-[#ff5e00]/25 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="hidden xs:inline">Judge</span>
            <span>Demo Tour</span>
          </button>
        </div>
      </div>
    </header>
  );
}
