"use client";

import React, { useState } from "react";
import { INITIAL_MCP_TOOLS } from "@/lib/constants";
import { MCPToolDefinition } from "@/lib/types";
import {
  Terminal,
  Play,
  CheckCircle2,
  Code,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Zap,
} from "lucide-react";

export default function McpInspector() {
  const [tools, setTools] = useState<MCPToolDefinition[]>(INITIAL_MCP_TOOLS);
  const [selectedTool, setSelectedTool] = useState<MCPToolDefinition>(
    INITIAL_MCP_TOOLS[2] // analyze_situation
  );
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExecuteTool = (tool: MCPToolDefinition) => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      const updated = {
        ...tool,
        lastExecution: {
          timestamp: new Date().toLocaleTimeString(),
          status: "completed" as const,
          response: tool.lastExecution?.response || { status: "ok" },
        },
      };
      setSelectedTool(updated);
      setTools((prev) => prev.map((t) => (t.name === tool.name ? updated : t)));
    }, 600);
  };

  const copyJson = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 animate-fade-in pb-28 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              MODEL CONTEXT PROTOCOL (MCP) SUITE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Expose LIFELINE&apos;s real-time detection and dispatch capabilities directly to external AI agents via Anthropic/Cursor MCP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            JSON-RPC 2.0 READY
          </span>
        </div>
      </div>

      {/* Main Responsive Grid: 2 Columns on Laptop / Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tools Directory & Config Setup (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="uppercase font-bold">REGISTERED MCP TOOLS</span>
            <span className="text-emerald-400">{tools.length} TOOLS ONLINE</span>
          </div>

          <div className="space-y-2.5">
            {tools.map((tool) => {
              const isSelected = selectedTool.name === tool.name;
              return (
                <div
                  key={tool.name}
                  onClick={() => setSelectedTool(tool)}
                  className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "border-cyan-500/60 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-white/10"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5 text-slate-400"}`}>
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-white block">
                        {tool.name}()
                      </span>
                      <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[240px] mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                    Ready
                  </span>
                </div>
              );
            })}
          </div>

          {/* Claude Desktop & Cursor Integration Card */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>CLAUDE DESKTOP / CURSOR MCP</span>
              </div>
              <button
                onClick={() =>
                  copyJson({
                    mcpServers: {
                      lifeline: {
                        command: "node",
                        args: ["./mcp-server/index.js"],
                        env: {
                          LIFELINE_TELEMETRY_PORT: "8080",
                          LIFELINE_DEVICE_LOCAL: "true",
                        },
                      },
                    },
                  })
                }
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy Config"}</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equip Claude or other autonomous agents with LIFELINE&apos;s real-time safety telemetry tools.
            </p>
          </div>
        </div>

        {/* Right Column: Tool Execution Console & Schema Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                    TOOL INSPECTOR &amp; SIMULATOR
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-mono font-black text-cyan-400 mt-0.5">
                  {selectedTool.name}()
                </h2>
              </div>

              <button
                onClick={() => handleExecuteTool(selectedTool)}
                disabled={isRunning}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md active:scale-95 w-fit"
              >
                <Play className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
                <span>{isRunning ? "Simulating Execution..." : "Execute MCP Tool Call"}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedTool.description}
            </p>

            {/* Input Parameter Schema Box */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/5 font-mono text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-slate-400 uppercase font-bold">
                  INPUT PARAMETERS JSON SCHEMA
                </span>
                <span className="text-[10px] text-slate-500">application/schema+json</span>
              </div>
              <pre className="text-slate-300 text-xs overflow-x-auto p-2 bg-[#090b12] rounded-xl border border-white/5">
                {JSON.stringify(selectedTool.parameters, null, 2)}
              </pre>
            </div>

            {/* Live Execution Result Payload */}
            {selectedTool.lastExecution && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-bold uppercase">EXECUTION SUCCESSFUL</span>
                    <span className="text-slate-500 font-normal">
                      ({selectedTool.lastExecution.timestamp})
                    </span>
                  </div>
                  <button
                    onClick={() => copyJson(selectedTool.lastExecution?.response)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Copied" : "Copy Output"}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#060810] border border-cyan-500/30 font-mono text-xs overflow-x-auto shadow-inner text-cyan-300">
                  <pre>
                    {JSON.stringify(selectedTool.lastExecution.response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
