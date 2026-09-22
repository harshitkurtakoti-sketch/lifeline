"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundEffects } from "@/lib/soundEffects";
import {
  MapPin,
  UserCheck,
  Clock,
  Send,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Radio,
  PhoneCall,
  Sparkles,
  MessageSquareText,
  Navigation,
} from "lucide-react";
import { MOCK_EMERGENCY_CONTACT, DEFAULT_LOCATION } from "@/lib/constants";

interface EmergencyResponseScreenProps {
  onCancelEmergency: () => void;
  onReturnToDashboard: () => void;
}

export default function EmergencyResponseScreen({
  onCancelEmergency,
  onReturnToDashboard,
}: EmergencyResponseScreenProps) {
  const [isNotified, setIsNotified] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);

  const handleNotify = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsNotified(true);
      soundEffects.playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#10b981", "#06b6d4", "#f59e0b", "#ff2d55"],
      });
    }, 1200);
  };

  const emergencyMessage = `LIFELINE EMERGENCY ALERT:
Possible accident detected.
Please check on me.

Location:
${DEFAULT_LOCATION.latitude}° N, ${DEFAULT_LOCATION.longitude}° E
${DEFAULT_LOCATION.landmark}
Time: 10:42 PM
Context: Possible two-wheeler impact pattern detected.`;

  return (
    <div className="w-full max-w-lg mx-auto p-4 flex flex-col justify-between min-h-[600px] animate-fade-in">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff2d55] animate-ping" />
            <h1 className="text-xl font-black tracking-widest text-[#ff2d55] uppercase">
              EMERGENCY MODE
            </h1>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff2d55]/15 text-[#ff2d55] border border-[#ff2d55]/30 uppercase font-bold">
            STAGE 2 ACTIVATED
          </span>
        </div>

        {/* Telemetry Summary Cards */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="glass-panel p-2.5 rounded-xl border border-white/10 flex flex-col">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mb-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Location</span>
            </div>
            <span className="text-xs font-bold text-slate-100">Captured</span>
            <span className="text-[9px] font-mono text-emerald-400">±4.2m precision</span>
          </div>

          <div className="glass-panel p-2.5 rounded-xl border border-white/10 flex flex-col">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mb-1">
              <UserCheck className="w-3 h-3 text-emerald-400" />
              <span>Contact</span>
            </div>
            <span className="text-xs font-bold text-slate-100">
              {isNotified ? "Notified" : "Ready"}
            </span>
            <span className="text-[9px] font-mono text-slate-400 truncate">
              {MOCK_EMERGENCY_CONTACT.name}
            </span>
          </div>

          <div className="glass-panel p-2.5 rounded-xl border border-white/10 flex flex-col">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mb-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Event Time</span>
            </div>
            <span className="text-xs font-bold text-slate-100">10:42 PM</span>
            <span className="text-[9px] font-mono text-slate-400">Just now</span>
          </div>
        </div>

        {/* AI Context Card */}
        <div className="glass-panel-danger rounded-2xl p-4 border border-[#ff2d55]/40 mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-4 h-4 text-[#ff2d55] animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff2d55] uppercase">
              AI CONTEXT
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-100 leading-snug">
            Possible two-wheeler impact detected. User has not confirmed safety.
          </p>
          <div className="mt-2 text-[10px] text-slate-300 font-mono">
            Sensor telemetry indicates abrupt deceleration (28.4 m/s²) followed by stationary ground posture.
          </div>
        </div>

        {/* Emergency Message Ready / Preview */}
        <div className="glass-panel rounded-2xl p-4 border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
              EMERGENCY MESSAGE READY
            </span>
            <span className="text-[10px] font-mono text-cyan-400">
              SMS / Priority Gateway
            </span>
          </div>

          <div className="p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed selection:bg-cyan-500/20">
            {emergencyMessage}
          </div>

          <div className="flex items-center justify-between mt-2.5 text-[10px] text-slate-400 font-mono">
            <span>Recipient: {MOCK_EMERGENCY_CONTACT.name} ({MOCK_EMERGENCY_CONTACT.phone})</span>
            <span className="text-emerald-400">Encrypted Payload</span>
          </div>
        </div>

        {/* Animated Confirmation Card if Notified */}
        {isNotified && (
          <div className="space-y-3 mb-4 animate-scale-up">
            <div className="glass-panel-elevated rounded-2xl p-4 border border-emerald-500/50 bg-emerald-950/40 text-emerald-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-wide text-white uppercase">
                    CONTACT NOTIFIED
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Help workflow initiated. Emergency coordinates dispatched.
                  </p>
                </div>
              </div>
            </div>

            {/* Recipient Incoming Response Preview */}
            <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span className="flex items-center gap-1 font-bold">
                  <MessageSquareText className="w-3.5 h-3.5" /> RECIPIENT ACKNOWLEDGEMENT
                </span>
                <span>Just now</span>
              </div>
              <p className="text-xs font-medium text-slate-100">
                &ldquo;Received SOS! Coordinates acquired (Cyber Towers Flyover). Emergency network alerted. I am on my way!&rdquo;
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <Navigation className="w-3 h-3 text-cyan-400" />
                <span>Dr. Ananya Sharma • ETA: 4 mins • Live Responder Tracking</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        {!isNotified ? (
          <button
            id="btn-notify-contact"
            onClick={handleNotify}
            disabled={isDispatching}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,45,85,0.45)] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            {isDispatching ? (
              <>
                <Radio className="w-6 h-6 animate-spin" />
                <span>DISPATCHING SOS PAYLOAD...</span>
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                <span>NOTIFY CONTACT</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onReturnToDashboard}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-base tracking-wider uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Return to Safety Dashboard</span>
          </button>
        )}

        <button
          id="btn-cancel-emergency"
          onClick={onCancelEmergency}
          className="w-full py-3 px-4 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
        >
          <XCircle className="w-4 h-4 text-slate-400" />
          <span>CANCEL EMERGENCY</span>
        </button>

        <p className="text-[10px] text-center text-slate-400 font-mono">
          Prototype test environment • Safe simulation demo
        </p>
      </div>
    </div>
  );
}
