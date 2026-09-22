"use client";

import React, { useState } from "react";
import SafetyCoreCanvas from "../safety-core/SafetyCoreCanvas";
import CoreStatusBadge from "../safety-core/CoreStatusBadge";
import SensorCard from "./SensorCard";
import MotionGraph from "../sensors/MotionGraph";
import AudioWaveform from "../sensors/AudioWaveform";
import CameraVisionHud from "../sensors/CameraVisionHud";
import LocationRadar from "../sensors/LocationRadar";
import { SystemSafetyStatus } from "@/lib/types";
import {
  Activity,
  Mic,
  Eye,
  MapPin,
  Cpu,
  Radio,
  Flame,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface LiveDashboardProps {
  safetyStatus: SystemSafetyStatus;
  onSimulateEmergency: () => void;
  onOpenDemoTour: () => void;
}

export default function LiveDashboard({
  safetyStatus,
  onSimulateEmergency,
  onOpenDemoTour,
}: LiveDashboardProps) {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<
    "all" | "motion" | "audio" | "camera" | "location"
  >("all");

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-3 flex flex-col gap-4 animate-fade-in pb-20">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              LIFELINE
            </span>
            <span className="text-[10px] text-slate-400 font-mono">|</span>
            <span className="text-[11px] font-semibold text-slate-300">
              Safety Mode
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Two-Wheeler Solo Commute
          </div>
        </div>

        {/* Protection Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">
            PROTECTED
          </span>
        </div>
      </div>

      {/* Hero Safety Core */}
      <div className="relative flex flex-col items-center justify-center pt-1 pb-3">
        {/* 3D Dynamic Particle Sphere */}
        <div className="relative">
          <SafetyCoreCanvas
            status={safetyStatus}
            size={270}
            onClick={onSimulateEmergency}
          />
          {/* Overlaid Center Disc */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <CoreStatusBadge
              status={safetyStatus}
              statusLabel="SAFE"
              subLabel="CONTINUOUS PASSIVE MONITORING"
            />
          </div>
        </div>

        <span className="text-[10px] font-mono text-slate-400 mt-1 text-center">
          Tap Safety Core or button below to trigger evaluation
        </span>
      </div>

      {/* PRIMARY CTA: SIMULATE EMERGENCY */}
      <div className="w-full">
        <button
          id="btn-simulate-emergency"
          onClick={onSimulateEmergency}
          className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#ff2d55] via-red-600 to-[#ff5e00] hover:from-[#ff3d64] hover:to-[#ff701e] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,45,85,0.45)] transition-all flex items-center justify-center gap-3 cursor-pointer transform active:scale-[0.98] group relative overflow-hidden"
        >
          {/* Subtle shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <Flame className="w-6 h-6 animate-pulse text-amber-300" />
          <div className="flex flex-col items-start text-left">
            <span className="leading-tight">SIMULATE EMERGENCY</span>
            <span className="text-[10px] font-mono font-normal text-red-100/80">
              Trigger two-wheeler abnormal deceleration spike
            </span>
          </div>
          <ChevronRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* AI Context Card */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
          <Radio className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              AI CONTEXT
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">
              NOMINAL (0.02G Jitter)
            </span>
          </div>
          <p className="text-xs text-slate-200 mt-1 font-medium leading-snug">
            Monitoring your environment for unusual events.
          </p>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Correlating forward momentum (34.8 km/h) with road acoustic frequencies.
          </div>
        </div>
      </div>

      {/* Telemetry Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1 pt-1">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          SENSOR TELEMETRY MATRIX
        </span>
        <div className="flex gap-1">
          {(["all", "motion", "audio", "camera", "location"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTelemetryTab(tab)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                  activeTelemetryTab === tab
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <SensorCard
          title="MOTION"
          status="Normal"
          subValue="0.98 G"
          icon={Activity}
          variant="safe"
          onClick={() => setActiveTelemetryTab("motion")}
        />
        <SensorCard
          title="AUDIO"
          status="Monitoring"
          subValue="45 dB"
          icon={Mic}
          variant="monitoring"
          onClick={() => setActiveTelemetryTab("audio")}
        />
        <SensorCard
          title="CAMERA"
          status="Ready"
          subValue="CV Edge"
          icon={Eye}
          variant="monitoring"
          onClick={() => setActiveTelemetryTab("camera")}
        />
        <SensorCard
          title="LOCATION"
          status="Active"
          subValue="±4.2m"
          icon={MapPin}
          variant="safe"
          onClick={() => setActiveTelemetryTab("location")}
        />
        <SensorCard
          title="AI"
          status="Monitoring"
          subValue="Local NPU"
          icon={Cpu}
          variant="monitoring"
        />
        <div
          onClick={onOpenDemoTour}
          className="glass-panel p-3 rounded-xl border border-amber-500/30 hover:border-amber-500/50 bg-amber-500/5 transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
              DEMO TOUR
            </span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-amber-400">
            60s Judge Walkthrough →
          </span>
        </div>
      </div>

      {/* Expanded Live Visualizers depending on tab */}
      <div className="space-y-3 pt-1">
        {(activeTelemetryTab === "all" || activeTelemetryTab === "motion") && (
          <div className="glass-panel p-3 rounded-xl border border-white/10">
            <MotionGraph height={90} />
          </div>
        )}

        {(activeTelemetryTab === "all" || activeTelemetryTab === "audio") && (
          <div className="glass-panel p-3 rounded-xl border border-white/10">
            <AudioWaveform height={65} />
          </div>
        )}

        {(activeTelemetryTab === "all" || activeTelemetryTab === "camera") && (
          <div className="glass-panel p-3 rounded-xl border border-white/10">
            <CameraVisionHud />
          </div>
        )}

        {(activeTelemetryTab === "all" || activeTelemetryTab === "location") && (
          <div className="glass-panel p-3 rounded-xl border border-white/10">
            <LocationRadar />
          </div>
        )}
      </div>
    </div>
  );
}
