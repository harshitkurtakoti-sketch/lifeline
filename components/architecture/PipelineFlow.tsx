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
  CheckCircle2,
  Code2,
  Terminal,
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
      technicalDeepDive: {
        inputs: "Raw continuous kernel buffers from Android SensorManager HAL",
        processing: "Hardware FIFO ring buffers with zero lock contention",
        output: "Time-synchronized multi-axis float32 tensors [100, 6]",
        latency: "< 2.1 ms",
      },
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
      technicalDeepDive: {
        inputs: "Raw accelerometer + gyro + 44.1kHz audio samples",
        processing: "Butterworth 4th-order bandpass filter (20Hz - 4kHz) + low-pass gravity removal",
        output: "Decoupled dynamic acceleration vector + spectral energy distribution",
        latency: "< 1.4 ms",
      },
    },
    {
      id: "local_ai",
      title: "LOCAL AI ENGINE",
      subtitle: "On-Device Neural Inference",
      detail: "Quantized edge model classifying inertial deceleration & posture deviations",
      icon: Cpu,
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      metrics: "Sub-15ms NPU inference latency",
      technicalDeepDive: {
        inputs: "500ms multi-modal tensor window",
        processing: "Quantized INT8 MobileNetV3 + 1D ConvNet running on Qualcomm/MediaTek NPU",
        output: "Impact probability score [0.000 - 1.000] + anomaly confidence",
        latency: "11.8 ms",
      },
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
      technicalDeepDive: {
        inputs: "Model score + GPS velocity delta + microphone crash impulse + vision ground plane",
        processing: "Bayesian decision tree distinguishing phone pocket drops from actual motorcycle falls",
        output: "Triangulated incident classification vector",
        latency: "< 3.0 ms",
      },
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
      technicalDeepDive: {
        inputs: "Triangulated classification score >= 0.85 threshold",
        processing: "Failsafe state machine transition logic",
        output: "SystemSafetyStatus -> 'POSSIBLE_EMERGENCY'",
        latency: "< 0.5 ms",
      },
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
      technicalDeepDive: {
        inputs: "Audible alarm + high-contrast visual prompt + accelerometer tap detection",
        processing: "Non-blocking countdown timer with immediate user cancel trigger",
        output: "User confirmation event or timeout expiration trigger",
        latency: "20.0s window",
      },
    },
    {
      id: "response",
      title: "AUTOMATED RESPONSE",
      subtitle: "Multi-Channel Automated Dispatch",
      detail: "Location payload dispatched to trusted contacts & emergency network",
      icon: PhoneCall,
      color: "text-[#ff2d55]",
      border: "border-[#ff2d55]/40",
      bg: "bg-[#ff2d55]/10",
      metrics: "SMS • Priority Network • Mesh Ready",
      technicalDeepDive: {
        inputs: "Exact GPS coordinates (±4.2m) + incident timestamp + synthesized reason summary",
        processing: "Emergency SMS broadcast + MCP tool execution + local encrypted incident log",
        output: "First responder packet delivered to emergency contact",
        latency: "< 850 ms",
      },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [pipelineSteps.length]);

  const currentStep = pipelineSteps[activeStep];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-fade-in pb-28 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              AI PIPELINE ARCHITECTURE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            How LIFELINE turns raw smartphone sensors into verified autonomous emergency response.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-bold">
            7-STAGE DETERMINISTIC PIPELINE
          </span>
        </div>
      </div>

      {/* Tri-State Output Pill Matrix */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2.5 font-bold">
          CORE CLASSIFICATION OUTPUT STATES
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="block font-bold text-sm">NORMAL</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Standard commuting noise &amp; vibrations (0 alerts)</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <span className="block font-bold text-sm">CONFIRMATION</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Sudden jolt / dropped phone (20s safety check)</span>
          </div>
          <div className="p-3 rounded-xl bg-[#ff2d55]/15 border border-[#ff2d55]/40 text-[#ff2d55]">
            <span className="block font-bold text-sm">EMERGENCY</span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">High-G impact + road slide (Immediate dispatch)</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid: 2 Columns on Laptop / Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Pipeline Steps Flow (7 Cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1 px-1">
            <span>PIPELINE STAGES (CLICK TO INSPECT)</span>
            <span className="text-cyan-400">STEP {activeStep + 1} OF {pipelineSteps.length}</span>
          </div>

          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;

            return (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => setActiveStep(idx)}
                  className={`glass-panel p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? `${step.border} ${step.bg} shadow-lg ring-1 ring-white/20 translate-x-1`
                      : "border-white/10 hover:border-white/25 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl ${step.bg} ${step.border} border ${step.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400 font-bold">
                            STAGE 0{idx + 1}
                          </span>
                          <h2 className="text-sm font-black tracking-wide text-white uppercase">
                            {step.title}
                          </h2>
                        </div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">
                          {step.subtitle}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-cyan-300 px-2.5 py-1 rounded bg-black/50 border border-white/10 font-bold">
                      {step.metrics}
                    </span>
                  </div>

                  {/* Summary Text */}
                  <div className="mt-2.5 text-xs text-slate-400 border-t border-white/5 pt-2 font-mono">
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

        {/* Right Column: Stage Technical Inspector (5 Cols on Laptop) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="glass-panel p-5 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase mb-3">
              <Terminal className="w-4 h-4" />
              <span>STAGE TELEMETRY INSPECTOR</span>
            </div>

            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <div className={`p-3 rounded-2xl ${currentStep.bg} ${currentStep.border} border ${currentStep.color}`}>
                <currentStep.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                  Stage 0{activeStep + 1}
                </span>
                <h3 className="text-base font-black text-white uppercase">
                  {currentStep.title}
                </h3>
                <span className="text-xs text-slate-300 font-mono">
                  {currentStep.subtitle}
                </span>
              </div>
            </div>

            {/* Technical Specification Fields */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase block mb-1">
                  INPUT DATA STREAM
                </span>
                <span className="text-slate-200">
                  {currentStep.technicalDeepDive.inputs}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-cyan-400 uppercase block mb-1">
                  EXECUTION ALGORITHM
                </span>
                <span className="text-slate-200">
                  {currentStep.technicalDeepDive.processing}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-emerald-400 uppercase block mb-1">
                  STAGE OUTPUT
                </span>
                <span className="text-emerald-300 font-bold">
                  {currentStep.technicalDeepDive.output}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase">
                  EXECUTION LATENCY
                </span>
                <span className="text-amber-400 font-bold">
                  {currentStep.technicalDeepDive.latency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
