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
} from "lucide-react";

export default function SafetyHistory() {
  const [selectedRecord, setSelectedRecord] = useState<EmergencyRecord | null>(null);
  const [filter, setFilter] = useState<"ALL" | "IMPACT" | "ROUTINE">("ALL");

  const records = MOCK_HISTORY_RECORDS.filter((r) => {
    if (filter === "IMPACT") return r.status === "Resolved by user";
    if (filter === "ROUTINE") return r.status === "Routine check";
    return true;
  });

  const todayRecords = records.filter((r) => r.date === "TODAY");
  const yesterdayRecords = records.filter((r) => r.date === "YESTERDAY");

  const renderRecordItem = (record: EmergencyRecord) => {
    const isImpact = record.status === "Resolved by user";

    return (
      <div
        key={record.id}
        onClick={() => setSelectedRecord(record)}
        className="glass-panel p-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between group hover:scale-[1.01]"
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg mt-0.5 ${
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
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                  isImpact
                    ? "bg-[#ff2d55]/20 text-[#ff2d55]"
                    : "bg-emerald-500/15 text-emerald-400"
                }`}
              >
                {record.status}
              </span>
            </div>
            <div className="text-sm font-semibold text-white mt-0.5">
              {record.eventType}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{record.location}</span>
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-3 flex flex-col gap-4 animate-fade-in pb-20">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-cyan-400" />
          <h1 className="text-lg font-black tracking-wider text-white uppercase">
            SAFETY HISTORY
          </h1>
        </div>
        <div className="flex gap-1">
          {(["ALL", "IMPACT", "ROUTINE"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                filter === tab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TODAY SECTION */}
      {todayRecords.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>TODAY</span>
          </div>
          <div className="space-y-2">
            {todayRecords.map(renderRecordItem)}
          </div>
        </div>
      )}

      {/* YESTERDAY SECTION */}
      {yesterdayRecords.length > 0 && (
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span>YESTERDAY</span>
          </div>
          <div className="space-y-2">
            {yesterdayRecords.map(renderRecordItem)}
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm glass-panel-elevated rounded-2xl p-5 border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400">
                {selectedRecord.date} • {selectedRecord.time}
              </span>
            </div>

            <h3 className="text-lg font-black text-white uppercase mb-1">
              {selectedRecord.eventType}
            </h3>

            <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-white/10 text-slate-200 mb-4">
              Status: {selectedRecord.status}
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Location
                </span>
                <span className="text-slate-200">{selectedRecord.location}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase">
                  AI Assessment Confidence
                </span>
                <span className="text-cyan-400 font-bold">
                  {selectedRecord.confidence}% (Heuristic Prototype Score)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px] uppercase mb-1">
                  Recorded Sensor Signals
                </span>
                <ul className="space-y-1 text-slate-300">
                  {selectedRecord.signals.map((sig, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-cyan-400" />
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
