"use client";

import React, { useEffect, useRef } from "react";
import { SystemSafetyStatus } from "@/lib/types";

interface SafetyCoreProps {
  status: SystemSafetyStatus;
  size?: number;
  className?: string;
  onClick?: () => void;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
  originZ: number;
  radius: number;
  baseColor: string;
  alpha: number;
  speed: number;
}

export default function SafetyCoreCanvas({
  status,
  size = 280,
  className = "",
  onClick,
}: SafetyCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const statusRef = useRef<SystemSafetyStatus>(status);
  statusRef.current = status;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retina display scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Generate 3D sphere points (Fibonacci spiral distribution)
    const count = 130;
    const sphereRadius = size * 0.35;
    const particles: Particle3D[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        originZ: z,
        radius: Math.random() * 1.6 + 1.2,
        baseColor: "#10b981",
        alpha: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let angleX = 0;
    let angleY = 0;
    let time = 0;

    const render = () => {
      time += 0.02;
      const currentStatus = statusRef.current;

      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;

      // Dynamic theme colors & rotation speeds by status
      let primaryColor = "#10b981";
      let glowColor = "rgba(16, 185, 129, 0.25)";
      let rotSpeedX = 0.003;
      let rotSpeedY = 0.007;
      let waveFactor = 1;

      if (currentStatus === "MONITORING") {
        primaryColor = "#06b6d4";
        glowColor = "rgba(6, 182, 212, 0.3)";
        rotSpeedX = 0.006;
        rotSpeedY = 0.012;
      } else if (currentStatus === "ANALYZING") {
        primaryColor = "#f59e0b";
        glowColor = "rgba(245, 158, 11, 0.4)";
        rotSpeedX = 0.012;
        rotSpeedY = 0.024;
      } else if (
        currentStatus === "POSSIBLE_EMERGENCY" ||
        currentStatus === "EMERGENCY_ACTIVE"
      ) {
        primaryColor = "#ff2d55";
        glowColor = "rgba(255, 45, 85, 0.45)";
        rotSpeedX = 0.015;
        rotSpeedY = 0.03;
        waveFactor = 1 + Math.sin(time * 8) * 0.15; // rapid emergency pulse
      }

      angleX += rotSpeedX;
      angleY += rotSpeedY;

      // Outer radial aura / glow
      const auraGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.2,
        centerX,
        centerY,
        sphereRadius * 1.35 * waveFactor
      );
      auraGrad.addColorStop(0, glowColor);
      auraGrad.addColorStop(1, "transparent");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.4 * waveFactor, 0, Math.PI * 2);
      ctx.fill();

      // Project and sort particles by depth (Z)
      const projected = particles.map((p) => {
        let { originX: ox, originY: oy, originZ: oz } = p;

        // Apply state-specific particle deformations
        if (currentStatus === "ANALYZING") {
          // Inward vortex collapse towards center
          const inward = 0.6 + Math.sin(time * 4) * 0.15;
          ox *= inward;
          oy *= inward;
          oz *= inward;
        } else if (
          currentStatus === "POSSIBLE_EMERGENCY" ||
          currentStatus === "EMERGENCY_ACTIVE"
        ) {
          // Outward shock dispersion
          const jitter = (Math.random() - 0.5) * 6;
          ox = ox * 1.15 + jitter;
          oy = oy * 1.15 + jitter;
          oz = oz * 1.15 + jitter;
        } else {
          // Gentle breathing oscillation
          const breathe = 1 + Math.sin(time * 2) * 0.04;
          ox *= breathe;
          oy *= breathe;
          oz *= breathe;
        }

        // 3D Rotation Matrix Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;

        // 3D Rotation Matrix X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = oy * cosX - z1 * sinX;
        const z2 = oy * sinX + z1 * cosX;

        // Perspective projection
        const fov = 340;
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        return {
          ...p,
          projX,
          projY,
          scale,
          z2,
        };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.z2 - b.z2);

      // Draw subtle connective web lines for nearby nodes
      ctx.lineWidth = 0.65;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].projX - projected[j].projX;
          const dy = projected[i].projY - projected[j].projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 38) {
            const lineAlpha = (1 - dist / 38) * 0.22 * projected[i].scale;
            ctx.strokeStyle =
              currentStatus === "POSSIBLE_EMERGENCY" ||
              currentStatus === "EMERGENCY_ACTIVE"
                ? `rgba(255, 45, 85, ${lineAlpha})`
                : currentStatus === "ANALYZING"
                ? `rgba(245, 158, 11, ${lineAlpha})`
                : currentStatus === "MONITORING"
                ? `rgba(6, 182, 212, ${lineAlpha})`
                : `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].projX, projected[i].projY);
            ctx.lineTo(projected[j].projX, projected[j].projY);
            ctx.stroke();
          }
        }
      }

      // Draw particle spheres
      projected.forEach((p) => {
        const particleAlpha = Math.min(1, Math.max(0.15, (p.scale - 0.4) * p.alpha));
        ctx.fillStyle =
          currentStatus === "POSSIBLE_EMERGENCY" ||
          currentStatus === "EMERGENCY_ACTIVE"
            ? `rgba(255, 60, 95, ${particleAlpha})`
            : currentStatus === "ANALYZING"
            ? `rgba(251, 191, 36, ${particleAlpha})`
            : currentStatus === "MONITORING"
            ? `rgba(34, 211, 238, ${particleAlpha})`
            : `rgba(52, 211, 153, ${particleAlpha})`;

        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.radius * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // Concentric orbital rings
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.2);
      ctx.strokeStyle =
        currentStatus === "POSSIBLE_EMERGENCY" ||
        currentStatus === "EMERGENCY_ACTIVE"
          ? "rgba(255, 45, 85, 0.4)"
          : "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 12]);
      ctx.beginPath();
      ctx.ellipse(0, 0, sphereRadius * 1.15, sphereRadius * 0.45, 0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [size]);

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="block"
      />
    </div>
  );
}
