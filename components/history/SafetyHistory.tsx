"use client";

import React, { useState } from "react";
import { MOCK_HISTORY_RECORDS } from "@/lib/constants";
import { EmergencyRecord } from "@/lib/types";
import {
  Clock,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  X,
  ChevronRight,
  Activity,
  History as HistoryIcon,
  Mic,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function SafetyHistory() {
  const [selectedRecord, setSelectedRecord] = useState<EmergencyRecord | null>(
    MOCK_HISTORY_RECORDS[0] || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "IMPACT" | "ROUTINE">("ALL");

  const records = MOCK_HISTORY_RECORDS.filter((r) => {
    if (filter === "IMPACT") return r.status === "Resolved by user";
    if (filter === "ROUTINE") return r.status === "Routine check";
    return true;
  });

  const todayRecords = records.filter((r) => r.date === "TODAY");
  const yesterdayRecords = records.filter((r) => r.date === "YESTERDAY");

  const handleSelectRecord = (record: EmergencyRecord) => {
    setSelectedRecord(record);
    // On small screens, open modal
    if (window.innerWidth < 1024) {
      setIsModalOpen(true);
    }
  };

  const renderRecordItem = (record: EmergencyRecord) => {
    const isImpact = record.status === "Resolved by user";
    const isSelected = selectedRecord?.id === record.id;

    return (
      <div
        key={record.id}
        onClick={() => handleSelectRecord(record)}
        className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
          isSelected
            ? "border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            : "border-white/10 hover:border-white/25 hover:bg-white/5"
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2.5 rounded-xl mt-0.5 ${
              isImpact
                ? "bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/40"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {isImpact ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300">
                {record.time}
              </span>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                  isImpact
                    ? "bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/30"
                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {record.status}
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {record.eventType}
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{record.location}</span>
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-fade-in pb-28 md:pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase">
              SAFETY INCIDENT HISTORY
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Encrypted on-device event log of all commute telemetry and incident evaluations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
          {(["ALL", "IMPACT", "ROUTINE"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                filter === tab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "ALL" ? "All Events" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Monitored Commutes</span>
          <span className="text-2xl font-mono font-black text-cyan-400">28</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">100% On-Device</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">False Alarms Avoided</span>
          <span className="text-2xl font-mono font-black text-emerald-400">14</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Pocket drops / speed bumps</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Fall-to-Alert Time</span>
          <span className="text-2xl font-mono font-black text-amber-400">3.2s</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Average detection time</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Sensor Uptime</span>
          <span className="text-2xl font-mono font-black text-[#ff2d55]">99.98%</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Zero crashed sessions</span>
        </div>
      </div>

      {/* Main Responsive Grid: 2 Columns on Laptop / Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Events Timeline List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* TODAY SECTION */}
          {todayRecords.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>TODAY&apos;S INCIDENT LOGS</span>
              </div>
              <div className="space-y-2.5">
                {todayRecords.map(renderRecordItem)}
              </div>
            </div>
          )}

          {/* YESTERDAY SECTION */}
          {yesterdayRecords.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span>PREVIOUS LOGS</span>
              </div>
              <div className="space-y-2.5">
                {yesterdayRecords.map(renderRecordItem)}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Embedded Event Inspector on Laptop (5 Cols) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-24">
          {selectedRecord ? (
            <div className="glass-panel p-5 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    INCIDENT TELEMETRY SNAPSHOT
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20 font-bold">
                  {selectedRecord.id}
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Event Classification</span>
                  <div className="text-base font-black text-white mt-0.5">{selectedRecord.eventType}</div>
                  <div className="text-xs text-slate-300 font-mono mt-1 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedRecord.date}, {selectedRecord.time}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">GPS Location Fix</span>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{selectedRecord.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Status</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 block">
                      {selectedRecord.status}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Data Storage</span>
                    <span className="text-xs font-bold text-slate-200 mt-1 block font-mono">
                      Local SQLite Encrypted
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-1">
                    AI Blackbox Diagnostic
                  </span>
                  Sensor stream exhibited deceleration threshold of 2.4G followed by 90-degree lateral pitch. User confirmation was requested and cleared promptly within 5.2 seconds.
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center text-slate-400 text-xs font-mono">
              Select an incident record to inspect detailed telemetry.
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal for Event Details */}
      {isModalOpen && selectedRecord && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm glass-panel-elevated rounded-3xl p-5 border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Event Forensics
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Type</span>
                <span className="text-sm font-bold text-white">{selectedRecord.eventType}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Time &amp; Location</span>
                <span className="text-slate-300 font-mono">{selectedRecord.time} • {selectedRecord.location}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Resolution</span>
                <span className="text-emerald-400 font-bold">{selectedRecord.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
