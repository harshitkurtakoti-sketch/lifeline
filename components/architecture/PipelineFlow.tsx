"use client";

import React, { useEffect, useState } from "react";
import {
  Smartphone,
  Cpu,
  Zap,
  Radio,
  ShieldCheck,
  PhoneCall,
  UserCheck,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";

export default function PipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      id: "sensors",
      title: "PHONE SENSORS",
      subtitle: "Multi-modal Hardware Inputs",
      detail: "Camera • Microphone • Accelerometer • Gyroscope • Location (GPS)",
      icon: Smartphone,
      color: "text-purple-400",
      border: "border-purple-500/40",
      bg: "bg-purple-500/10",
      metrics: "5 streams @ 50-100Hz",
    },
    {
      id: "signal",
      title: "SIGNAL PROCESSING",
      subtitle: "High-Rate Telemetry Normalization",
      detail: "Bandpass acoustic filtering, gravity vector isolation, sliding window variance",
      icon: Zap,
      color: "text-cyan-400",
      border: "border-cyan-500/40",
      bg: "bg-cyan-500/10",
      metrics: "500ms rolling FIFO buffers",
    },
    {
      id: "local_ai",
      title: "LOCAL AI",
      subtitle: "On-Device Neural Inference",
      detail: "Quantized edge model classifying inertial deceleration & posture deviations",
      icon: Cpu,
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      metrics: "Sub-15ms NPU inference latency",
    },
    {
      id: "context",
      title: "CONTEXT ENGINE",
      subtitle: "Multi-Signal Synthesis",
      detail: "Correlates velocity loss + road acoustic burst + device ground plane tilt",
      icon: Radio,
      color: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      metrics: "Contextual heuristic triangulation",
    },
    {
      id: "decision",
      title: "EMERGENCY DECISION",
      subtitle: "Tri-State Classification",
      detail: "Outputs: Normal (no alert) • Needs Confirmation • Possible Emergency",
      icon: Sparkles,
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]/40",
      bg: "bg-[#ff2d55]/10",
      metrics: "Thresholded confidence gate",
    },
    {
      id: "user",
      title: "USER CONFIRMATION",
      subtitle: "Human-in-the-Loop Override",
      detail: "20-second active response window ('I'm Safe' vs 'Get Help')",
      icon: UserCheck,
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      metrics: "Zero accidental dispatch penalty",
    },
    {
      id: "response",
      title: "RESPONSE",
      subtitle: "Multi-Channel Automated Dispatch",
      detail: "Location payload dispatched to trusted contacts & emergency network",
      icon: PhoneCall,
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]/40",
      bg: "bg-[#ff2d55]/10",
      metrics: "SMS • Priority Network • Mesh Ready",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [pipelineSteps.length]);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-3 flex flex-col gap-4 animate-fade-in pb-20">
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-black tracking-tight text-white uppercase">
            AI ARCHITECTURE
          </h1>
        </div>
        <p className="text-xs text-slate-300">
          How LIFELINE turns raw smartphone signals into actionable emergency response.
        </p>
      </div>

      {/* Tri-State Output Pill Matrix */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
          ENGINE CLASSIFICATION OUTPUTS
        </span>
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="block font-bold">NORMAL</span>
            <span className="text-[9px] text-slate-400">No anomaly</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <span className="block font-bold">CONFIRMATION</span>
            <span className="text-[9px] text-slate-400">Minor jolt</span>
          </div>
          <div className="p-2 rounded-xl bg-[#ff2d55]/15 border border-[#ff2d55]/40 text-[#ff2d55]">
            <span className="block font-bold">EMERGENCY</span>
            <span className="text-[9px] text-slate-400">Impact profile</span>
          </div>
        </div>
      </div>

      {/* Animated Flow Steps */}
      <div className="space-y-2 relative">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === idx;

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => setActiveStep(idx)}
                className={`glass-panel p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? `${step.border} ${step.bg} scale-[1.02] shadow-lg`
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${step.bg} ${step.border} border ${step.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          STAGE 0{idx + 1}
                        </span>
                        <h2 className="text-xs font-black tracking-wide text-white uppercase">
                          {step.title}
                        </h2>
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                    {step.metrics}
                  </span>
                </div>

                {/* Expanded Details */}
                <div className="mt-2 text-xs text-slate-400 border-t border-white/5 pt-2 font-mono">
                  {step.detail}
                </div>
              </div>

              {idx < pipelineSteps.length - 1 && (
                <div className="flex justify-center -my-1 py-0.5">
                  <ChevronDown
                    className={`w-4 h-4 transition-colors ${
                      activeStep === idx
                        ? "text-cyan-400 animate-bounce"
                        : "text-slate-600"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
