"use client";

import React from "react";
import { ActiveScreen } from "@/lib/types";
import {
  ShieldAlert,
  Smartphone,
  Monitor,
  Sparkles,
  Zap,
  Info,
} from "lucide-react";

interface HeaderProps {
  currentScreen: ActiveScreen;
  onOpenDemoTour: () => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onGoHome: () => void;
}

export default function Header({
  currentScreen,
  onOpenDemoTour,
  isDeviceFrame,
  onToggleDeviceFrame,
  onGoHome,
}: HeaderProps) {
  return (
    <header className="w-full max-w-lg mx-auto px-4 pt-3 pb-2 flex items-center justify-between border-b border-white/5">
      {/* Brand */}
      <button
        onClick={onGoHome}
        className="flex items-center gap-2 group cursor-pointer text-left"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#ff2d55] to-[#ff5e00] flex items-center justify-center shadow-[0_0_12px_rgba(255,45,85,0.4)]">
          <ShieldAlert className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="font-black text-sm tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
            LIFELINE
          </span>
          <span className="text-[9px] font-mono text-[#ff5e00] ml-1.5 font-bold uppercase tracking-widest">
            iQOO
          </span>
        </div>
      </button>

      {/* Quick Controls */}
      <div className="flex items-center gap-2">
        {/* 60s Demo Mode Badge Button */}
        <button
          onClick={onOpenDemoTour}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-[#ff5e00]/15 hover:from-amber-500/25 hover:to-[#ff5e00]/25 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
        >
          <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
          <span>Demo Tour</span>
        </button>

        {/* Desktop Viewport Switcher */}
        <button
          onClick={onToggleDeviceFrame}
          title={isDeviceFrame ? "Switch to fluid view" : "Switch to mobile frame view"}
          className="hidden md:flex items-center p-1.5 rounded-lg glass-panel hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          {isDeviceFrame ? (
            <Monitor className="w-3.5 h-3.5" />
          ) : (
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
          )}
        </button>
      </div>
    </header>
  );
}
