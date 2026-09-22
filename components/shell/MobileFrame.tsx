"use client";

import React from "react";
import { Wifi, BatteryMedium, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
  enabled: boolean;
}

export default function MobileFrame({ children, enabled }: MobileFrameProps) {
  if (!enabled) {
    return <div className="w-full min-h-screen relative">{children}</div>;
  }

  return (
    <div className="w-full min-h-screen py-6 px-4 flex items-center justify-center bg-[#030407] cyber-grid">
      {/* Smartphone Device Exterior Shell */}
      <div className="relative w-full max-w-[430px] rounded-[48px] bg-[#0c0f18] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] border-4 border-slate-700/60 ring-1 ring-white/20">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black border border-white/10 z-50 flex items-center justify-between px-3">
          <div className="w-2 h-2 rounded-full bg-[#1a2030] border border-white/20" />
          <div className="w-2 h-2 rounded-full bg-cyan-500/80 animate-pulse" />
        </div>

        {/* Screen Display Container */}
        <div className="w-full min-h-[780px] max-h-[880px] rounded-[38px] bg-[#06070a] overflow-y-auto overflow-x-hidden relative border border-white/10 flex flex-col justify-between">
          {/* Mobile Status Bar */}
          <div className="sticky top-0 inset-x-0 z-40 bg-[#06070a]/80 backdrop-blur-md px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span className="font-bold">10:42</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-[10px] font-bold text-cyan-400">5G</span>
              <BatteryMedium className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Child Page Content */}
          <div className="flex-1 flex flex-col">{children}</div>

          {/* Bottom Home Indicator Bar */}
          <div className="sticky bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/30 my-1 pointer-events-none z-50" />
        </div>
      </div>
    </div>
  );
}
