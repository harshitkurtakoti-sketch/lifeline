"use client";

import React, { useEffect, useState } from "react";
import { soundEffects } from "@/lib/soundEffects";
import {
  ShieldCheck,
  PhoneCall,
  AlertOctagon,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ConfirmationScreenProps {
  onSafe: () => void;
  onGetHelp: () => void;
  onViewAnalysis: () => void;
}

export default function ConfirmationScreen({
  onSafe,
  onGetHelp,
  onViewAnalysis,
}: ConfirmationScreenProps) {
  const [countdown, setCountdown] = useState(20);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted);

  const toggleMute = () => {
    soundEffects.isMuted = !soundEffects.isMuted;
    setIsMuted(soundEffects.isMuted);
  };

  useEffect(() => {
    if (countdown <= 0) {
      // Auto-escalate if user does not respond
      onGetHelp();
      return;
    }

    // Play audible alert beep on each countdown tick (higher pitch for final 5 seconds)
    soundEffects.playWarningBeep(countdown <= 5 ? 1046 : 880);

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, onGetHelp]);

  return (
    <div className="w-full max-w-lg mx-auto p-4 flex flex-col justify-between min-h-[580px] animate-fade-in">
      {/* Warning State Header */}
      <div className="flex flex-col items-center text-center mt-2">
        {/* Pulsing Emergency Strobe Badge */}
        <div className="w-20 h-20 rounded-full bg-[#ff2d55]/20 border-2 border-[#ff2d55] flex items-center justify-center animate-emergency-strobe mb-4">
          <AlertOctagon className="w-10 h-10 text-[#ff2d55]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
          ARE YOU OKAY?
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-xs font-medium">
          We detected an unusual impact pattern.
        </p>

        {/* Dynamic Countdown and Mute Toggle */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/40 text-[#ff2d55] text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>Auto-alerting emergency contact in {countdown}s</span>
          </div>
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute alarm sound" : "Mute alarm sound"}
            className="p-1 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Verified Telemetry Context Badges */}
      <div className="glass-panel rounded-2xl p-4 my-5 border border-white/10 space-y-2.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Observable Incident Signals</span>
          <button
            onClick={onViewAnalysis}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold underline cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> View AI Breakdown →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-medium">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#ff2d55] shrink-0" />
            <span>Impact detected</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#ff2d55] shrink-0" />
            <span>Motion anomaly</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Location captured</span>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Context analysis complete</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 pt-1">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span>17.4435° N, 78.3772° E • Hitech City Main Rd</span>
        </div>
      </div>

      {/* Two Large Action Buttons */}
      <div className="flex flex-col gap-3 pb-2">
        {/* I'M SAFE BUTTON */}
        <button
          id="btn-im-safe"
          onClick={onSafe}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
        >
          <ShieldCheck className="w-6 h-6" />
          <span>I&apos;M SAFE</span>
        </button>

        {/* GET HELP BUTTON */}
        <button
          id="btn-get-help"
          onClick={onGetHelp}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,45,85,0.45)] transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
        >
          <PhoneCall className="w-6 h-6 animate-pulse" />
          <span>GET HELP</span>
        </button>

        <p className="text-[10px] text-center text-slate-400 font-mono mt-1">
          Hackathon Prototype Mode • No real emergency services will be contacted
        </p>
      </div>
    </div>
  );
}
