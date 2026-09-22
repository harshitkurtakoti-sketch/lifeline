"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  UserCheck,
  Send,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  AlertTriangle,
  Radio,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { DEFAULT_LOCATION, MOCK_EMERGENCY_CONTACT } from "@/lib/constants";
import confetti from "canvas-confetti";

interface EmergencyResponseScreenProps {
  onCancelEmergency: () => void;
  onReturnToDashboard: () => void;
}

export default function EmergencyResponseScreen({
  onCancelEmergency,
  onReturnToDashboard,
}: EmergencyResponseScreenProps) {
  const [isNotified, setIsNotified] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNotifyNow = () => {
    setIsNotified(true);
    // Fire subtle alert confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10b981", "#06b6d4", "#ffffff"],
      });
    } catch (e) {
      // safe fallback
    }
  };

  const emergencyMessage = `[LIFELINE CRITICAL ALERT]
Possible accident detected.
Please check on me.

Location:
${DEFAULT_LOCATION.latitude}° N, ${DEFAULT_LOCATION.longitude}° E
${DEFAULT_LOCATION.landmark}
Time: 10:42 PM
Context: Possible two-wheeler impact pattern detected.`;

  const copyMessage = () => {
    navigator.clipboard.writeText(emergencyMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between min-h-[calc(100vh-80px)] animate-fade-in pb-20">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-[#ff2d55] animate-ping" />
            <h1 className="text-xl sm:text-2xl font-black tracking-widest text-[#ff2d55] uppercase">
              ACTIVE EMERGENCY DISPATCH
            </h1>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#ff2d55]/15 text-[#ff2d55] border border-[#ff2d55]/30 uppercase font-bold">
            STAGE 2 ACTIVATED
          </span>
        </div>

        {/* Telemetry Summary Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Location Captured</span>
            </div>
            <span className="text-sm font-bold text-slate-100">Hitech City Main Rd</span>
            <span className="text-[10px] font-mono text-emerald-400 mt-0.5">±4.2m precision lock</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Emergency Contact</span>
            </div>
            <span className="text-sm font-bold text-slate-100">
              {isNotified ? "Notified & Dispatched" : "Ready to Alert"}
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
              {MOCK_EMERGENCY_CONTACT.name} ({MOCK_EMERGENCY_CONTACT.phone})
            </span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Incident Timestamp</span>
            </div>
            <span className="text-sm font-bold text-slate-100">10:42 PM</span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5">Automated Event Log</span>
          </div>
        </div>

        {/* Responsive Grid: 2 Columns on Laptop / Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: AI Context & Status (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* AI Context Card */}
            <div className="glass-panel-danger rounded-3xl p-5 border border-[#ff2d55]/40 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-[#ff2d55] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#ff2d55] uppercase">
                  AI SYNTHESIZED INCIDENT CONTEXT
                </span>
              </div>
              <p className="text-sm font-bold text-slate-100 leading-snug">
                Possible two-wheeler impact detected. User has not confirmed safety.
              </p>
              <div className="mt-2 text-xs text-slate-300 font-mono leading-relaxed">
                Sensor telemetry indicates abrupt deceleration (28.4 m/s²) followed by stationary ground posture.
              </div>
            </div>

            {/* Verification State */}
            <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between text-slate-200 font-mono font-bold">
                <span>LOCAL INCIDENT DISPATCH</span>
                <span className="text-emerald-400">STATUS: ARMED</span>
              </div>
              <p>
                In production, LIFELINE triggers an immediate carrier emergency SMS broadcast, transmits the incident payload over available mesh gateways, and initiates priority audio recording.
              </p>
            </div>
          </div>

          {/* Right Column: Emergency Message Payload & Dispatch Actions (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* Emergency Message Ready / Preview */}
            <div className="glass-panel rounded-3xl p-5 border border-white/15 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                  AUTONOMOUS EMERGENCY PAYLOAD
                </span>
                <button
                  onClick={copyMessage}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? "Copied" : "Copy Payload"}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/5 font-mono text-xs text-slate-200 whitespace-pre-line leading-relaxed selection:bg-cyan-500/20">
                {emergencyMessage}
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-slate-400 font-mono">
                <span>Target: {MOCK_EMERGENCY_CONTACT.name}</span>
                <span className="text-emerald-400">Ready for instant dispatch</span>
              </div>
            </div>

            {/* Notification Confirmation Card */}
            {isNotified ? (
              <div className="glass-panel-elevated rounded-3xl p-5 border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 shadow-xl animate-scale-up space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400 shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-wide text-white uppercase">
                      CONTACT DISPATCHED
                    </h3>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Emergency payload transmitted to {MOCK_EMERGENCY_CONTACT.name}.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onReturnToDashboard}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Return to Normal Safety Monitoring
                </button>
              </div>
            ) : (
              /* Action Buttons */
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="btn-notify-now"
                  onClick={handleNotifyNow}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff2d55] to-red-600 hover:from-[#ff3860] hover:to-red-500 text-white font-black text-base tracking-wider uppercase shadow-[0_0_30px_rgba(255,45,85,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-5 h-5 animate-pulse" />
                  <span>NOTIFY CONTACT NOW</span>
                </button>

                <button
                  onClick={onCancelEmergency}
                  className="py-4 px-6 rounded-2xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors border border-white/10 cursor-pointer active:scale-98"
                >
                  Cancel / False Alarm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
