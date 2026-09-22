"use client";

import React, { useEffect, useState } from "react";
import {
  AlertOctagon,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  CheckCircle2,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

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
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEffects.setMuted(nextState);
  };

  useEffect(() => {
    if (countdown <= 0) {
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
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[calc(100vh-80px)] animate-fade-in">
      {/* Warning State Header */}
      <div className="flex flex-col items-center text-center mt-2 sm:mt-4">
        {/* Pulsing Emergency Strobe Badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#ff2d55]/20 border-2 border-[#ff2d55] flex items-center justify-center animate-emergency-strobe mb-4 shadow-[0_0_30px_rgba(255,45,85,0.4)]">
          <AlertOctagon className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff2d55]" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
          ARE YOU OKAY?
        </h1>
        <p className="text-sm sm:text-lg text-slate-300 mt-2 max-w-md font-medium">
          LIFELINE detected an unusual deceleration &amp; tilt anomaly.
        </p>

        {/* Dynamic Countdown and Mute Toggle */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff2d55]/15 border border-[#ff2d55]/40 text-[#ff2d55] text-xs sm:text-sm font-mono font-bold shadow-sm">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Auto-alerting emergency contacts in {countdown}s</span>
          </div>
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute alarm sound" : "Mute alarm sound"}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Content Grid: Side-by-side on laptop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center">
        {/* Verified Telemetry Context Badges */}
        <div className="glass-panel rounded-3xl p-5 border border-white/15 space-y-3 shadow-xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span className="font-bold">Observable Incident Evidence</span>
            <button
              onClick={onViewAnalysis}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Forensic Breakdown →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs font-medium">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#ff2d55] shrink-0" />
              <span>Impact 3.8G spike</span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#ff2d55] shrink-0" />
              <span>Posture slide 84°</span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Location captured</span>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Edge AI classified</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 pt-2 border-t border-white/5">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>17.4435° N, 78.3772° E • Hitech City Main Rd (±4.2m)</span>
          </div>
        </div>

        {/* Two Large Action Buttons */}
        <div className="flex flex-col gap-3.5">
          {/* I'M SAFE BUTTON */}
          <button
            id="btn-im-safe"
            onClick={onSafe}
            className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
          >
            <ShieldCheck className="w-6 h-6" />
            <span>I&apos;M SAFE — FALSE ALARM</span>
          </button>

          {/* GET HELP BUTTON */}
          <button
            id="btn-get-help"
            onClick={onGetHelp}
            className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,45,85,0.45)] transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>GET HELP IMMEDIATELY</span>
          </button>

          <p className="text-[11px] text-center text-slate-400 font-mono mt-1">
            Hackathon Prototype Mode • No real emergency services will be contacted
          </p>
        </div>
      </div>

      <div />
    </div>
  );
}
