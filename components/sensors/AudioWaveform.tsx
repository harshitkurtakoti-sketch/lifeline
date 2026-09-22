"use client";

import React, { useEffect, useRef, useState } from "react";
import { sensorStream } from "@/lib/simulation/sensorStream";
import { AudioDataPoint } from "@/lib/types";
import { Mic, Volume2 } from "lucide-react";

interface AudioWaveformProps {
  height?: number;
}

export default function AudioWaveform({ height = 75 }: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioData, setAudioData] = useState<AudioDataPoint>({
    timestamp: Date.now(),
    decibel: 42,
    frequencyHz: 420,
    pattern: "ambient",
  });

  useEffect(() => {
    const unsub = sensorStream.subscribe(({ audio }) => {
      setAudioData(audio);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const draw = () => {
      phase += 0.12;
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;
      const isSpike = audioData.pattern === "abnormal_spike";

      ctx.clearRect(0, 0, w, h);

      // Draw bars or multi-harmonic continuous wave
      const barCount = 36;
      const barWidth = w / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2);
        // Intensity curve
        const centerDist = Math.abs(i - barCount / 2) / (barCount / 2);
        const envelope = Math.max(0.2, 1 - centerDist * 0.7);

        let amplitude;
        if (isSpike) {
          // Sharp irregular peaks during impact
          amplitude =
            (Math.sin(phase * 2 + i * 0.8) * 0.5 + 0.5) * (h * 0.45) * envelope +
            (Math.random() - 0.5) * 8;
        } else {
          // Gentle ambient wave
          amplitude =
            (Math.sin(phase + i * 0.3) * 0.3 + 0.4) * (h * 0.22) * envelope;
        }

        const barHeight = Math.max(3, amplitude * 2);
        const y = midY - barHeight / 2;

        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isSpike) {
          grad.addColorStop(0, "#ff2d55");
          grad.addColorStop(0.5, "#f59e0b");
          grad.addColorStop(1, "#ff2d55");
        } else {
          grad.addColorStop(0, "#38bdf8");
          grad.addColorStop(0.5, "#06b6d4");
          grad.addColorStop(1, "#0284c7");
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [audioData.pattern]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200 tracking-wide text-[11px] uppercase">
            AUDIO MONITORING
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
              audioData.pattern === "abnormal_spike"
                ? "bg-[#ff2d55]/20 text-[#ff2d55] border border-[#ff2d55]/40 animate-pulse"
                : "text-cyan-400 bg-cyan-500/10"
            }`}
          >
            {audioData.pattern === "abnormal_spike"
              ? "Context signal detected"
              : "Ambient road noise"}
          </span>
          <span className="font-mono text-xs text-slate-300 font-semibold">
            {audioData.decibel.toFixed(0)} dB
          </span>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden bg-black/40 border border-white/5 p-1.5">
        <canvas
          ref={canvasRef}
          width={320}
          height={height}
          className="w-full h-auto block"
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono px-1">
        <span>Freq: {audioData.frequencyHz} Hz</span>
        <span className="text-[9px] text-slate-400 italic">
          Simulated local acoustic envelope
        </span>
      </div>
    </div>
  );
}
