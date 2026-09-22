"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Activity,
  Mic,
  MapPin,
  Smartphone,
  Info,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface SituationAnalysisProps {
  onContinueToResponse: () => void;
  onBackToConfirmation: () => void;
}

export default function SituationAnalysis({
  onContinueToResponse,
  onBackToConfirmation,
}: SituationAnalysisProps) {
  const timelineEvents = [
    {
      time: "10:42:15 PM",
      title: "Inertial Deceleration Spike",
      detail: "3.8G instantaneous deceleration recorded along the Z/forward axis.",
      icon: Activity,
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]/40",
    },
    {
      time: "10:42:16 PM",
      title: "Acoustic Impact Resonance",
      detail: "Transient broadband peak (82 dB) consistent with collision or hard scrape.",
      icon: Mic,
      color: "text-amber-400",
      border: "border-amber-500/40",
    },
    {
      time: "10:42:17 PM",
      title: "Ground Orientation Shift",
      detail: "Device rotational velocity halted at an 84° static tilt angle on road surface.",
      icon: Smartphone,
      color: "text-purple-400",
      border: "border-purple-500/40",
    },
    {
      time: "10:42:18 PM",
      title: "Zero Transit Recovery",
      detail: "Speed dropped from 38 km/h to 0.0 km/h with no post-impact upright motion.",
      icon: MapPin,
      color: "text-cyan-400",
      border: "border-cyan-500/40",
    },
  ];

  const signalsUsed = [
    { name: "Motion IMU", icon: Activity, desc: "3-axis G-vector & Gyro" },
    { name: "Acoustic", icon: Mic, desc: "Acoustic impulse filter" },
    { name: "Location", icon: MapPin, desc: "GPS velocity & heading" },
    { name: "Device state", icon: Smartphone, desc: "Posture & screen activity" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[calc(100vh-80px)] animate-fade-in">
      <div>
        {/* Top bar with back navigation */}
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <button
            onClick={onBackToConfirmation}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Alert
          </button>
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
            ON-DEVICE EDGE INFERENCE
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              AI SITUATION FORENSIC ANALYSIS
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Multi-sensor observable evidence synthesized locally in real-time.
            </p>
          </div>
        </div>

        {/* Responsive Grid: 2 Columns on Laptop / Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Chronological Observable Signals Timeline (7 Cols) */}
          <div className="md:col-span-7 glass-panel rounded-3xl p-5 border border-white/15 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">
                INCIDENT TELEMETRY TIMELINE
              </h2>
              <span className="text-[10px] font-mono text-cyan-400">4 EVENTS RECORDED</span>
            </div>

            <div className="space-y-4 relative before:absolute before:top-3 before:bottom-3 before:left-[105px] sm:before:left-[115px] before:w-[2px] before:bg-white/10">
              {timelineEvents.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 relative z-10">
                    <span className="text-xs font-mono text-slate-400 w-24 sm:w-28 shrink-0 pt-0.5 text-right font-semibold">
                      {evt.time}
                    </span>
                    <div
                      className={`p-1.5 rounded-full bg-[#080a10] border ${evt.border} ${evt.color} shrink-0 mt-0.5 shadow-md`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white">
                        {evt.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {evt.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Assessment & Signals (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* Assessment Card */}
            <div className="glass-panel-danger rounded-3xl p-5 border border-[#ff2d55]/40 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff2d55] font-bold">
                    NEURAL ASSESSMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-1 uppercase">
                    POSSIBLE EMERGENCY
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Synthesized impact pattern matching two-wheeler transit incident with sudden halt and tilt.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    Confidence
                  </span>
                  <div className="text-3xl font-black text-[#ff2d55] font-mono">
                    87%
                  </div>
                </div>
              </div>

              {/* Explicit Hackathon Disclaimer Alert */}
              <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>Demonstration Notice:</strong> Algorithmic prototype heuristic evaluation. Not a certified medical diagnostic.
                </span>
              </div>
            </div>

            {/* Signals Used List */}
            <div className="glass-panel rounded-3xl p-4 border border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5 font-bold">
                TELEMETRY SOURCES FUSED
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {signalsUsed.map((sig, idx) => {
                  const Icon = sig.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5"
                    >
                      <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {sig.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate max-w-[110px]">
                          {sig.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continue CTA */}
            <button
              onClick={onContinueToResponse}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,45,85,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Continue to Emergency Mode</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
