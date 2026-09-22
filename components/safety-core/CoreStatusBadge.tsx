"use client";

import React from "react";
import { SystemSafetyStatus } from "@/lib/types";
import { ShieldCheck, AlertTriangle, Activity, Flame } from "lucide-react";

interface CoreStatusBadgeProps {
  status: SystemSafetyStatus;
  statusLabel?: string;
  subLabel?: string;
}

export default function CoreStatusBadge({
  status,
  statusLabel,
  subLabel,
}: CoreStatusBadgeProps) {
  const getBadgeConfig = () => {
    switch (status) {
      case "PROTECTED":
        return {
          label: statusLabel || "SAFE",
          sub: subLabel || "LIFELINE SHIELD ACTIVE",
          icon: ShieldCheck,
          textColor: "text-emerald-400",
          glowBg: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          pulseColor: "bg-emerald-500",
        };
      case "MONITORING":
        return {
          label: statusLabel || "SCANNING",
          sub: subLabel || "SURROUNDING TELEMETRY STEADY",
          icon: Activity,
          textColor: "text-cyan-400",
          glowBg: "bg-cyan-500/10",
          borderColor: "border-cyan-500/30",
          pulseColor: "bg-cyan-500",
        };
      case "ANALYZING":
        return {
          label: statusLabel || "ANALYZING",
          sub: subLabel || "EVALUATING INERTIAL CONTEXT",
          icon: AlertTriangle,
          textColor: "text-amber-400",
          glowBg: "bg-amber-500/15",
          borderColor: "border-amber-500/40",
          pulseColor: "bg-amber-500",
        };
      case "POSSIBLE_EMERGENCY":
      case "EMERGENCY_ACTIVE":
        return {
          label: statusLabel || "IMPACT DETECTED",
          sub: subLabel || "USER RESPONSE REQUIRED",
          icon: Flame,
          textColor: "text-[#ff2d55]",
          glowBg: "bg-[#ff2d55]/20",
          borderColor: "border-[#ff2d55]/50",
          pulseColor: "bg-[#ff2d55]",
        };
      case "RESOLVED_SAFE":
        return {
          label: statusLabel || "SAFE",
          sub: subLabel || "STANDBY - COMMUTE RESOLVED",
          icon: ShieldCheck,
          textColor: "text-emerald-400",
          glowBg: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30",
          pulseColor: "bg-emerald-500",
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center text-center pointer-events-none select-none">
      {/* Central Glass Disc Inside Core */}
      <div
        className={`w-28 h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md border ${config.borderColor} ${config.glowBg} transition-all duration-500 shadow-2xl relative`}
      >
        {/* Breathing Inner Ring */}
        <div
          className={`absolute inset-1 rounded-full border border-white/10 animate-pulse-subtle`}
        />

        <Icon className={`w-7 h-7 mb-1 ${config.textColor}`} />
        <span
          className={`text-xl font-black tracking-widest uppercase ${config.textColor}`}
        >
          {config.label}
        </span>
      </div>

      {/* Subtext description */}
      <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm">
        <span className={`w-1.5 h-1.5 rounded-full ${config.pulseColor} animate-ping`} />
        <span className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
          {config.sub}
        </span>
      </div>
    </div>
  );
}
