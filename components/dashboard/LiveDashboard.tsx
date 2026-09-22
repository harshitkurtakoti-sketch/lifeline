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
  CheckCircle2,
  Sliders,
  Maximize2,
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-fade-in pb-28 md:pb-12">
      {/* Top Mission Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-black tracking-widest text-white uppercase">
              LIFELINE MISSION CONTROL
            </span>
            <span className="text-slate-500 font-mono">/</span>
            <span className="text-xs font-semibold text-cyan-400 font-mono">
              ACTIVE SAFETY MODE
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Profile: Two-Wheeler Solo Commute</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">On-Device Edge Guardian</span>
          </div>
        </div>

        {/* Protection Badges */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Telemetry: 100Hz Local IMU</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-black text-emerald-400 tracking-wider uppercase">
              PROTECTED
            </span>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid: 2 Columns on Laptop / Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Safety Core & Emergency Trigger Deck (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Hero Safety Core Sphere Card */}
          <div className="glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="uppercase tracking-widest text-[11px]">NEURAL SAFETY CORE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> NOMINAL
              </span>
            </div>

            {/* 3D Dynamic Particle Sphere */}
            <div className="relative my-2">
              <SafetyCoreCanvas
                status={safetyStatus}
                size={290}
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

            <span className="text-[11px] font-mono text-slate-400 mt-2">
              Interactive 3D Core: Click sphere or CTA below to simulate incident
            </span>
          </div>

          {/* PRIMARY CTA: SIMULATE EMERGENCY */}
          <button
            id="btn-simulate-emergency"
            onClick={onSimulateEmergency}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] via-red-600 to-[#ff5e00] hover:from-[#ff3d64] hover:to-[#ff701e] text-white font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,45,85,0.45)] transition-all flex items-center justify-between gap-3 cursor-pointer transform active:scale-[0.98] group relative overflow-hidden"
          >
            {/* Subtle shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6 animate-pulse text-amber-200" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="leading-tight text-white font-black">SIMULATE EMERGENCY</span>
                <span className="text-[11px] font-mono font-normal text-red-100/85">
                  Inject two-wheeler crash & deceleration event
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 ml-auto group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* AI Context Card */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  AI LOCAL REASONING ENGINE
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  NOMINAL (0.02G Jitter)
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-1.5 font-medium leading-relaxed">
                Continuously fusing multi-modal motion patterns with acoustic environmental signatures.
              </p>
              <div className="text-[10px] text-slate-400 font-mono mt-1.5 pt-1.5 border-t border-white/5 flex items-center justify-between">
                <span>Momentum: 34.8 km/h</span>
                <span>Incident Risk: 0.01% (Safe)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Multimodal Telemetry Command Center (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Telemetry Filter Tabs & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                SENSOR TELEMETRY MATRIX
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(["all", "motion", "audio", "camera", "location"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTelemetryTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer font-bold ${
                      activeTelemetryTab === tab
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {tab === "all" ? "All Streams" : tab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quick Sensor Metric Cards (Grid of 6) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <SensorCard
              title="100Hz IMU"
              status="Normal"
              subValue="0.98 G"
              icon={Activity}
              variant="safe"
              onClick={() => setActiveTelemetryTab("motion")}
            />
            <SensorCard
              title="ACOUSTIC"
              status="Monitoring"
              subValue="45 dB"
              icon={Mic}
              variant="monitoring"
              onClick={() => setActiveTelemetryTab("audio")}
            />
            <SensorCard
              title="VISION CV"
              status="Edge Ready"
              subValue="CV Edge"
              icon={Eye}
              variant="monitoring"
              onClick={() => setActiveTelemetryTab("camera")}
            />
            <SensorCard
              title="LOCATION"
              status="GPS Locked"
              subValue="±4.2m"
              icon={MapPin}
              variant="safe"
              onClick={() => setActiveTelemetryTab("location")}
            />
            <SensorCard
              title="LOCAL NPU"
              status="Active"
              subValue="12ms Latency"
              icon={Cpu}
              variant="monitoring"
            />
            <div
              onClick={onOpenDemoTour}
              className="glass-panel p-3 rounded-xl border border-amber-500/30 hover:border-amber-500/60 bg-amber-500/10 transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.02] shadow-sm group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase font-mono">
                  DEMO TOUR
                </span>
                <Zap className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold text-amber-400">
                60s Judge Walkthrough →
              </span>
            </div>
          </div>

          {/* Responsive Visualizer Workspace: 2x2 Grid on Laptop when "all" is selected */}
          <div className="space-y-4 pt-1">
            {activeTelemetryTab === "all" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visualizer 1: Motion IMU */}
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase">
                      <Activity className="w-3.5 h-3.5" /> 3-Axis IMU Acceleration
                    </span>
                    <button
                      onClick={() => setActiveTelemetryTab("motion")}
                      className="text-slate-500 hover:text-white transition-colors"
                      title="Focus motion graph"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                  <MotionGraph height={110} />
                </div>

                {/* Visualizer 2: Acoustic Spectrum */}
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase">
                      <Mic className="w-3.5 h-3.5" /> Road Acoustic Signature
                    </span>
                    <button
                      onClick={() => setActiveTelemetryTab("audio")}
                      className="text-slate-500 hover:text-white transition-colors"
                      title="Focus audio waveform"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                  <AudioWaveform height={110} />
                </div>

                {/* Visualizer 3: Camera Vision HUD */}
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-purple-400 font-bold uppercase">
                      <Eye className="w-3.5 h-3.5" /> Edge CV Optic Stream
                    </span>
                    <button
                      onClick={() => setActiveTelemetryTab("camera")}
                      className="text-slate-500 hover:text-white transition-colors"
                      title="Focus camera vision"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                  <CameraVisionHud />
                </div>

                {/* Visualizer 4: Location Radar */}
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase">
                      <MapPin className="w-3.5 h-3.5" /> GPS Geofence &amp; Radar
                    </span>
                    <button
                      onClick={() => setActiveTelemetryTab("location")}
                      className="text-slate-500 hover:text-white transition-colors"
                      title="Focus location radar"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                  <LocationRadar />
                </div>
              </div>
            ) : (
              // Single Focused Telemetry View
              <div className="glass-panel p-5 rounded-2xl border border-white/15 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    Focused Stream Telemetry
                  </span>
                  <button
                    onClick={() => setActiveTelemetryTab("all")}
                    className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Back to All Streams
                  </button>
                </div>

                {activeTelemetryTab === "motion" && <MotionGraph height={220} />}
                {activeTelemetryTab === "audio" && <AudioWaveform height={200} />}
                {activeTelemetryTab === "camera" && <CameraVisionHud />}
                {activeTelemetryTab === "location" && <LocationRadar />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
