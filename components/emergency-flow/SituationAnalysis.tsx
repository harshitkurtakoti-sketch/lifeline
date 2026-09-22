"use client";

import React from "react";
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Activity,
  Mic,
  MapPin,
  Smartphone,
  ArrowLeft,
  Info,
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
      time: "10:42:18",
      title: "Motion anomaly detected",
      detail: "Inertial magnitude spiked to 28.4 m/s² (2.9G)",
      icon: Activity,
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]",
    },
    {
      time: "10:42:19",
      title: "Impact pattern identified",
      detail: "Sudden horizontal tilt (68°) + 86 dB acoustic impulse",
      icon: ShieldAlert,
      color: "text-amber-400",
      border: "border-amber-400",
    },
    {
      time: "10:42:20",
      title: "No user response",
      detail: "Screen touch / accelerometer interaction absent",
      icon: Clock,
      color: "text-amber-400",
      border: "border-amber-400",
    },
    {
      time: "10:42:21",
      title: "Location acquired",
      detail: "High-precision GPS fix: Hitech City Main Rd, Madhapur",
      icon: MapPin,
      color: "text-emerald-400",
      border: "border-emerald-400",
    },
  ];

  const signalsUsed = [
    { name: "Motion", icon: Activity, desc: "3-axis G-vector & Gyro" },
    { name: "Audio", icon: Mic, desc: "Acoustic impulse filter" },
    { name: "Location", icon: MapPin, desc: "GPS velocity & heading" },
    { name: "Device state", icon: Smartphone, desc: "Posture & screen activity" },
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-4 flex flex-col justify-between min-h-[580px] animate-fade-in">
      <div>
        {/* Top bar with back navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBackToConfirmation}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Alert
          </button>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            LOCAL-FIRST INFERENCE
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              AI SITUATION ANALYSIS
            </h1>
            <p className="text-xs text-slate-400">
              Concise observable evidence synthesized on-device.
            </p>
          </div>
        </div>

        {/* Chronological Observable Signals Timeline */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 mb-4">
          <h2 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
            TELEMETRY TIMELINE
          </h2>

          <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[35px] before:w-[1px] before:bg-white/10">
            {timelineEvents.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <span className="text-[11px] font-mono text-slate-400 w-14 shrink-0 pt-0.5">
                    {evt.time}
                  </span>
                  <div
                    className={`p-1 rounded-full bg-[#080a10] border ${evt.border} ${evt.color} shrink-0 mt-0.5`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-100">
                      {evt.title}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {evt.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Card */}
        <div className="glass-panel-danger rounded-2xl p-4 border border-[#ff2d55]/40 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff2d55]">
                ASSESSMENT
              </span>
              <h3 className="text-xl font-black text-white tracking-wide mt-0.5 uppercase">
                POSSIBLE EMERGENCY
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Synthesized impact pattern matching two-wheeler transit incident.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Confidence
              </span>
              <div className="text-3xl font-black text-[#ff2d55] font-mono">
                87%
              </div>
            </div>
          </div>

          {/* Explicit Hackathon Disclaimer Alert */}
          <div className="mt-3 p-2.5 rounded-lg bg-black/50 border border-white/5 flex items-start gap-2 text-[10px] text-slate-300">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> This is an algorithmic prototype heuristic score, not a certified medical or emergency dispatch diagnostic.
            </span>
          </div>
        </div>

        {/* Signals Used List */}
        <div className="glass-panel rounded-2xl p-3 border border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            SIGNALS USED
          </span>
          <div className="grid grid-cols-2 gap-2">
            {signalsUsed.map((sig, idx) => {
              const Icon = sig.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {sig.name}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono truncate max-w-[120px]">
                      {sig.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      <div className="pt-4">
        <button
          onClick={onContinueToResponse}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-base tracking-wider uppercase shadow-[0_0_25px_rgba(255,45,85,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Emergency Mode</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
