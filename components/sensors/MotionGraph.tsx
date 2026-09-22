"use client";

import React, { useEffect, useRef, useState } from "react";
import { sensorStream } from "@/lib/simulation/sensorStream";
import { MotionDataPoint } from "@/lib/types";

interface MotionGraphProps {
  height?: number;
  showLabels?: boolean;
  highlightAnomaly?: boolean;
}

export default function MotionGraph({
  height = 110,
  showLabels = true,
  highlightAnomaly = true,
}: MotionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentSnapshot, setCurrentSnapshot] = useState<MotionDataPoint>({
    timestamp: Date.now(),
    accelX: 0,
    accelY: 9.8,
    accelZ: 0,
    magnitude: 9.81,
    gyroPitch: 0,
    gyroRoll: 0,
    gyroYaw: 0,
    isAnomaly: false,
  });

  const historyRef = useRef<number[]>([]);

  useEffect(() => {
    // Fill initial buffer with ~60 points
    if (historyRef.current.length === 0) {
      historyRef.current = new Array(60).fill(9.81);
    }

    const unsubscribe = sensorStream.subscribe(({ motion }) => {
      setCurrentSnapshot(motion);
      historyRef.current.push(motion.magnitude);
      if (historyRef.current.length > 70) {
        historyRef.current.shift();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const points = historyRef.current;
      const isSpike = currentSnapshot.isAnomaly;

      ctx.clearRect(0, 0, w, h);

      // Background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = 10; y < h; y += 22) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Draw horizontal baseline for 1G (9.8 m/s²)
      const baselineY = h * 0.72;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, baselineY);
      ctx.lineTo(w, baselineY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (points.length < 2) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Graph trace
      const stepX = w / (points.length - 1);
      ctx.beginPath();

      points.forEach((val, idx) => {
        // Map 0 to 35 m/s² onto canvas height
        const normalized = Math.min(36, Math.max(0, val));
        const y = h - (normalized / 36) * (h - 14) - 4;
        const x = idx * stepX;

        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      // Style line depending on anomaly
      if (isSpike && highlightAnomaly) {
        ctx.strokeStyle = "#ff2d55";
        ctx.lineWidth = 2.4;
        ctx.shadowColor = "rgba(255, 45, 85, 0.6)";
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "rgba(16, 185, 129, 0.3)";
        ctx.shadowBlur = 4;
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Gradient area under the line
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const areaGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (isSpike && highlightAnomaly) {
        areaGrad.addColorStop(0, "rgba(255, 45, 85, 0.25)");
        areaGrad.addColorStop(1, "rgba(255, 45, 85, 0)");
      } else {
        areaGrad.addColorStop(0, "rgba(16, 185, 129, 0.15)");
        areaGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
      }
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // Draw current leading pulse dot
      const latestVal = points[points.length - 1];
      const latestY = h - (Math.min(36, latestVal) / 36) * (h - 14) - 4;
      ctx.fillStyle = isSpike ? "#ff2d55" : "#10b981";
      ctx.beginPath();
      ctx.arc(w - 2, latestY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [currentSnapshot.isAnomaly, highlightAnomaly]);

  return (
    <div className="w-full flex flex-col">
      {showLabels && (
        <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                currentSnapshot.isAnomaly
                  ? "bg-[#ff2d55] animate-ping"
                  : "bg-emerald-400"
              }`}
            />
            <span className="font-semibold text-slate-200 tracking-wide text-[11px] uppercase">
              Inertial Vector (G)
            </span>
          </div>
          <span
            className={`font-mono font-bold text-xs ${
              currentSnapshot.isAnomaly ? "text-[#ff2d55]" : "text-emerald-400"
            }`}
          >
            {(currentSnapshot.magnitude / 9.81).toFixed(2)} G{" "}
            <span className="text-[10px] text-slate-400">
              ({currentSnapshot.magnitude.toFixed(1)} m/s²)
            </span>
          </span>
        </div>
      )}

      <div className="relative rounded-lg overflow-hidden bg-black/40 border border-white/5 p-1">
        <canvas
          ref={canvasRef}
          width={320}
          height={height}
          className="w-full h-auto block"
        />
        {currentSnapshot.isAnomaly && highlightAnomaly && (
          <div className="absolute top-1.5 right-2 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#ff2d55]/90 text-white animate-pulse">
            SPIKE DETECTED
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono px-1">
        <span>X: {currentSnapshot.accelX.toFixed(1)}</span>
        <span>Y: {currentSnapshot.accelY.toFixed(1)}</span>
        <span>Z: {currentSnapshot.accelZ.toFixed(1)}</span>
        <span>Tilt: {currentSnapshot.gyroPitch.toFixed(2)} rad</span>
      </div>
    </div>
  );
}
