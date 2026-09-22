"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sensorStream } from "@/lib/simulation/sensorStream";
import { soundEffects } from "@/lib/soundEffects";
import MotionGraph from "../sensors/MotionGraph";
import {
  AlertTriangle,
  Cpu,
  Eye,
  CheckCircle2,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface EmergencySimulationModalProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

export default function EmergencySimulationModal({
  isOpen,
  onComplete,
  onCancel,
}: EmergencySimulationModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      return;
    }

    // Trigger physical shockwave spike on sensor stream and audio thump
    sensorStream.triggerImpactSpike();
    soundEffects.playImpactSound();

    // Step 1: 0ms -> 1800ms (Motion signal spikes, NORMAL -> SPIKE -> IMPACT)
    // Step 2: 1800ms -> 3400ms (Analyzing context... AI processing)
    // Step 3: 3400ms -> 4900ms (Impact pattern detected, checking surrounding context...)
    // Step 4: 4900ms -> 6000ms (User response required) -> transition to confirmation screen

    const t1 = setTimeout(() => setCurrentStep(2), 2000);
    const t2 = setTimeout(() => setCurrentStep(3), 3800);
    const t3 = setTimeout(() => setCurrentStep(4), 5400);
    const t4 = setTimeout(() => {
      onComplete();
    }, 6900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md glass-panel-danger rounded-2xl p-6 border border-[#ff2d55]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
        {/* Ambient background alert glow */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#ff2d55]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2d55] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff2d55] uppercase">
              EMERGENCY INFERENCE ENGINE
            </span>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 transition-colors"
          >
            Cancel Test
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 gap-2 my-4 z-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col gap-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= step
                    ? currentStep === step
                      ? "bg-[#ff2d55] shadow-[0_0_8px_#ff2d55]"
                      : "bg-emerald-400"
                    : "bg-white/10"
                }`}
              />
              <span className="text-[9px] font-mono text-center text-slate-400">
                STEP 0{step}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Cinematic Content Per Step */}
        <div className="flex-1 flex flex-col justify-center py-2 z-10">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ff2d55]/20 border border-[#ff2d55]/40 text-[#ff2d55]">
                    <AlertTriangle className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-wide text-white">
                      ABNORMAL MOTION DETECTED
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Inertial telemetry variance &gt; 2.8G threshold
                    </p>
                  </div>
                </div>

                {/* Motion Spike Graph */}
                <div className="mt-2">
                  <div className="text-[10px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                    <span>ACCELERATION TELEMETRY</span>
                    <span className="text-[#ff2d55] font-bold">
                      NORMAL → SPIKE → IMPACT
                    </span>
                  </div>
                  <MotionGraph height={110} highlightAnomaly={true} />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-4"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-amber-400/40 animate-spin" />
                  <div className="absolute w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    <Cpu className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black tracking-wide text-white">
                    Analyzing context...
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xs mt-1">
                    On-device neural fusion synthesizing multi-axis accelerometer, acoustic impulse &amp; device orientation.
                  </p>
                </div>

                <div className="flex gap-2 text-[10px] font-mono text-amber-300/90 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Cross-referencing transit speed vs shock profile</span>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ff2d55]/20 border border-[#ff2d55]/40 text-[#ff2d55]">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-wide text-white">
                      Impact pattern detected
                    </h3>
                    <p className="text-xs text-amber-400 font-mono">
                      Checking surrounding context...
                    </p>
                  </div>
                </div>

                {/* Checklist of cross-checked context */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs">
                    <span className="text-slate-300">Transit Motion</span>
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Rapid Deceleration Confirmed
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs">
                    <span className="text-slate-300">Device Posture</span>
                    <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5" /> 68° Lateral Ground Tilt
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs">
                    <span className="text-slate-300">Acoustic Signal</span>
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 86 dB Transient Spike
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-3"
              >
                <div className="w-16 h-16 rounded-full bg-[#ff2d55]/20 border-2 border-[#ff2d55] flex items-center justify-center animate-emergency-strobe">
                  <AlertTriangle className="w-8 h-8 text-[#ff2d55]" />
                </div>

                <div>
                  <h3 className="text-xl font-black tracking-wide text-white uppercase">
                    User response required
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xs mt-1">
                    Transitioning to emergency confirmation protocol...
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <span>Launching confirmation screen</span>
                  <ArrowRight className="w-3.5 h-3.5 animate-pulse text-[#ff2d55]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer skip */}
        <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-400 font-mono z-10">
          <span>iQOO ON-DEVICE NPU ACCELERATED</span>
          <button
            onClick={onComplete}
            className="text-cyan-400 hover:text-cyan-300 transition-colors underline cursor-pointer"
          >
            Skip to Confirmation →
          </button>
        </div>
      </div>
    </div>
  );
}
