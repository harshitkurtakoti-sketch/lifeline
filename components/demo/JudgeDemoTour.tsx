"use client";

import React from "react";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface JudgeDemoTourProps {
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
  onClose: () => void;
  onReset: () => void;
}

export const DEMO_STEPS = [
  { id: "landing", label: "Intro", screen: "landing", desc: "Hero, converging multi-sensor signals" },
  { id: "dashboard", label: "Dashboard", screen: "dashboard", desc: "Live Safety Core & 5-sensor matrix" },
  { id: "simulation", label: "Simulate Impact", screen: "simulation", desc: "4-step inertial shockwave sequence" },
  { id: "confirmation", label: "Are You Okay?", screen: "confirmation", desc: "Human confirmation & countdown" },
  { id: "analysis", label: "AI Analysis", screen: "analysis", desc: "Observable telemetry timeline & 87% confidence" },
  { id: "response", label: "Emergency Mode", screen: "response", desc: "Message preview & contact notification" },
  { id: "mcp", label: "MCP Tools", screen: "developer", desc: "Model Context Protocol JSON-RPC" },
];

export default function JudgeDemoTour({
  currentStepIndex,
  onSelectStep,
  onClose,
  onReset,
}: JudgeDemoTourProps) {
  const currentStep = DEMO_STEPS[currentStepIndex] || DEMO_STEPS[0];

  return (
    <div className="fixed bottom-20 md:bottom-6 inset-x-2 sm:inset-x-auto sm:right-6 sm:w-96 z-50 glass-panel-elevated p-3.5 rounded-2xl border border-amber-500/40 shadow-2xl animate-scale-up">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5e00] animate-ping" />
          <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest">
            iQOO DEMO ENVIRONMENT (60s TOUR)
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onReset}
            title="Restart Tour"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Close Tour"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Current Step Info */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-xs font-black text-white uppercase flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-amber-400">
              {currentStepIndex + 1}/{DEMO_STEPS.length}:
            </span>
            <span>{currentStep.label}</span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium">
            {currentStep.desc}
          </p>
        </div>
      </div>

      {/* Step Pills */}
      <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar mb-2.5">
        {DEMO_STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => onSelectStep(idx)}
            className={`px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
              idx === currentStepIndex
                ? "bg-amber-500 text-black font-black shadow-[0_0_8px_#f59e0b]"
                : idx < currentStepIndex
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {idx + 1}. {step.label}
          </button>
        ))}
      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
        <button
          onClick={() => onSelectStep(Math.max(0, currentStepIndex - 1))}
          disabled={currentStepIndex === 0}
          className="px-2.5 py-1 rounded-lg glass-panel hover:bg-white/10 text-[10px] font-mono text-slate-300 disabled:opacity-30 cursor-pointer flex items-center gap-1"
        >
          <ChevronLeft className="w-3 h-3" /> Prev
        </button>

        <span className="text-[10px] font-mono text-slate-400">
          Under 60s Flow
        </span>

        <button
          onClick={() =>
            onSelectStep(Math.min(DEMO_STEPS.length - 1, currentStepIndex + 1))
          }
          disabled={currentStepIndex === DEMO_STEPS.length - 1}
          className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-mono font-bold cursor-pointer flex items-center gap-1 disabled:opacity-30"
        >
          Next <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
