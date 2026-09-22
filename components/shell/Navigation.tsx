"use client";

import React from "react";
import { ActiveScreen } from "@/lib/types";
import {
  ShieldCheck,
  History,
  Lock,
  Layers,
  Terminal,
  Flame,
  Home,
} from "lucide-react";

interface NavigationProps {
  currentScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  onTriggerEmergency: () => void;
}

export default function Navigation({
  currentScreen,
  onSelectScreen,
  onTriggerEmergency,
}: NavigationProps) {
  const navItems = [
    { id: "dashboard" as const, label: "Safety", icon: ShieldCheck },
    { id: "architecture" as const, label: "Pipeline", icon: Layers },
    { id: "history" as const, label: "History", icon: History },
    { id: "privacy" as const, label: "Privacy", icon: Lock },
    { id: "developer" as const, label: "MCP", icon: Terminal },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#07090f]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around max-w-lg mx-auto sm:rounded-t-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? "text-cyan-400 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div
              className={`p-1 rounded-lg transition-transform ${
                isActive ? "bg-cyan-500/20 scale-110" : ""
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-wide mt-0.5 font-sans">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Emergency Simulation Quick Trigger Pill */}
      <button
        onClick={onTriggerEmergency}
        title="Quick Simulate Impact"
        className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[#ff2d55] hover:text-white transition-all cursor-pointer group"
      >
        <div className="p-1 rounded-lg bg-[#ff2d55]/20 border border-[#ff2d55]/40 group-hover:bg-[#ff2d55] transition-colors">
          <Flame className="w-4 h-4 animate-pulse group-hover:text-white text-[#ff2d55]" />
        </div>
        <span className="text-[9px] font-mono uppercase tracking-tight text-[#ff2d55] mt-0.5">
          SIM
        </span>
      </button>
    </nav>
  );
}
