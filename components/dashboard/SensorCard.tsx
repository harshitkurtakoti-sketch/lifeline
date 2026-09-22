"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  status: string;
  subValue?: string;
  icon: LucideIcon;
  variant?: "safe" | "monitoring" | "warning" | "emergency";
  onClick?: () => void;
}

export default function SensorCard({
  title,
  status,
  subValue,
  icon: Icon,
  variant = "safe",
  onClick,
}: SensorCardProps) {
  const getColors = () => {
    switch (variant) {
      case "safe":
        return {
          bg: "bg-emerald-500/5",
          border: "border-emerald-500/20 hover:border-emerald-500/40",
          text: "text-emerald-400",
          dot: "bg-emerald-400",
          iconColor: "text-emerald-400",
        };
      case "monitoring":
        return {
          bg: "bg-cyan-500/5",
          border: "border-cyan-500/20 hover:border-cyan-500/40",
          text: "text-cyan-400",
          dot: "bg-cyan-400",
          iconColor: "text-cyan-400",
        };
      case "warning":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30 hover:border-amber-500/50",
          text: "text-amber-400",
          dot: "bg-amber-400",
          iconColor: "text-amber-400",
        };
      case "emergency":
        return {
          bg: "bg-[#ff2d55]/15",
          border: "border-[#ff2d55]/40 hover:border-[#ff2d55]/60",
          text: "text-[#ff2d55]",
          dot: "bg-[#ff2d55]",
          iconColor: "text-[#ff2d55]",
        };
    }
  };

  const colors = getColors();

  return (
    <div
      onClick={onClick}
      className={`glass-panel p-3 rounded-xl border ${colors.border} transition-all duration-200 cursor-pointer flex flex-col justify-between hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white/5">
            <Icon className={`w-4 h-4 ${colors.iconColor}`} />
          </div>
          <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${
              variant === "emergency" ? "animate-ping" : ""
            }`}
          />
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-0.5">
        <span className={`text-sm font-bold tracking-wide ${colors.text}`}>
          {status}
        </span>
        {subValue && (
          <span className="text-[10px] font-mono text-slate-400">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}
