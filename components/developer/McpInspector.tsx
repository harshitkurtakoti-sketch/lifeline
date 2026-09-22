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
      // Update execution timestamp
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
    <div className="w-full max-w-lg mx-auto px-4 py-3 flex flex-col gap-4 animate-fade-in pb-20">
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              LIFELINE MCP
            </h1>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase font-bold">
            JSON-RPC 2.0 READY
          </span>
        </div>
        <p className="text-xs text-slate-300 font-medium">
          Expose LIFELINE&apos;s real-time detection tools to other AI agents through the Model Context Protocol.
        </p>
      </div>

      {/* Available Tools Grid */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block px-0.5">
          REGISTERED MCP TOOLS
        </span>
        <div className="grid grid-cols-1 gap-2">
          {tools.map((tool) => {
            const isSelected = selectedTool.name === tool.name;
            return (
              <div
                key={tool.name}
                onClick={() => setSelectedTool(tool)}
                className={`glass-panel p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-cyan-500/60 bg-cyan-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Code
                    className={`w-4 h-4 ${
                      isSelected ? "text-cyan-400" : "text-slate-400"
                    }`}
                  />
                  <div>
                    <span className="font-mono text-xs font-bold text-white">
                      {tool.name}()
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-1 max-w-[260px]">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Tool Inspector & Execution Console */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              TOOL INSPECTOR
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {selectedTool.name}()
            </span>
          </div>

          <button
            onClick={() => handleExecuteTool(selectedTool)}
            disabled={isRunning}
            className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Executing..." : "Execute Tool"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-300">
          {selectedTool.description}
        </p>

        {/* Parameters */}
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
          <span className="text-[10px] text-slate-400 block mb-1 uppercase">
            Parameters Schema
          </span>
          <pre className="text-slate-300 text-[11px] overflow-x-auto">
            {JSON.stringify(selectedTool.parameters, null, 2)}
          </pre>
        </div>

        {/* Live Execution Result */}
        {selectedTool.lastExecution && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-bold uppercase">STATUS: COMPLETED</span>
                <span className="text-slate-500">
                  ({selectedTool.lastExecution.timestamp})
                </span>
              </div>
              <button
                onClick={() => copyJson(selectedTool.lastExecution?.response)}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copied ? "Copied" : "Copy JSON"}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#08090e] border border-cyan-500/20 font-mono text-xs overflow-x-auto shadow-inner text-cyan-300">
              <pre>
                {JSON.stringify(selectedTool.lastExecution.response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Claude Desktop / Cursor MCP Config Box */}
      <div className="glass-panel rounded-2xl p-3.5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLAUDE DESKTOP &amp; CURSOR CONFIG</span>
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
            className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>Copy claude_desktop_config.json</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 font-sans">
          Plug LIFELINE directly into Claude Desktop or Cursor to allow autonomous safety evaluations and dispatch.
        </p>
      </div>

      <div className="text-[10px] font-mono text-center text-slate-500">
        Compatible with Claude Desktop, Cursor, and OpenAI Model Context Protocol clients.
      </div>
    </div>
  );
}
