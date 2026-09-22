"use client";

import React, { useEffect, useRef, useState } from "react";
import { sensorStream } from "@/lib/simulation/sensorStream";
import { VisionContext } from "@/lib/types";
import { Camera, Eye, Scan, Video, VideoOff } from "lucide-react";

interface CameraVisionHudProps {
  isSimulating?: boolean;
}

export default function CameraVisionHud({ isSimulating }: CameraVisionHudProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [visionState, setVisionState] = useState<VisionContext>({
    status: "ready",
    confidenceScore: 0.94,
    detectedContext: "Stable vehicular transit corridor",
    environmentalLighting: "streetlamp",
    tiltAngle: 12,
  });

  const [useRealCamera, setUseRealCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = sensorStream.subscribe(({ vision }) => {
      setVisionState(vision);
    });
    return () => unsub();
  }, []);

  const toggleRealCamera = async () => {
    if (useRealCamera) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      setUseRealCamera(false);
      setCameraError(null);
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Camera API not available in this browser");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setUseRealCamera(true);
      setCameraError(null);
    } catch (err: any) {
      setCameraError("Camera permission denied (using high-res synthetic feed)");
      setUseRealCamera(false);
    }
  };

  const isScanning = isSimulating || visionState.status === "scanning";
  const isCaptured = visionState.status === "captured";

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200 tracking-wide text-[11px] uppercase">
            ENVIRONMENT CONTEXT
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
              isCaptured
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : isScanning
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse"
                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            }`}
          >
            {isCaptured
              ? "Context captured"
              : isScanning
              ? "Analyzing scene..."
              : "Camera ready"}
          </span>
        </div>
      </div>

      {/* Main HUD Viewport */}
      <div className="relative w-full h-36 rounded-lg overflow-hidden bg-[#0a0d14] border border-white/10 shadow-inner flex items-center justify-center">
        {/* Real video if enabled */}
        <video
          ref={videoRef}
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            useRealCamera ? "opacity-75" : "hidden"
          }`}
        />

        {/* Synthetic Road / CV Backdrop if real camera not active */}
        {!useRealCamera && (
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0e121e] via-[#090b12] to-[#04060a]">
            {/* Perspective road grid */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `radial-gradient(ellipse at 50% 120%, rgba(6, 182, 212, 0.4), transparent 70%),
                  repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 16px)`,
              }}
            />
            {/* Simulated horizon line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-cyan-500/20 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>
        )}

        {/* Tactical Computer Vision Overlays */}
        <div className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between">
          {/* Top telemetry bar */}
          <div className="flex justify-between items-center text-[9px] font-mono text-cyan-300/80">
            <span className="flex items-center gap-1">
              <Scan className="w-3 h-3 text-cyan-400" /> CV-CVT v2.4 (EDGE_AI)
            </span>
            <span>TILT: {visionState.tiltAngle}°</span>
          </div>

          {/* Center reticle and bounding box */}
          <div className="self-center flex flex-col items-center justify-center">
            <div
              className={`w-28 h-16 border transition-colors duration-300 rounded relative flex items-center justify-center ${
                isCaptured
                  ? "border-emerald-500/70 bg-emerald-500/10"
                  : isScanning
                  ? "border-[#ff2d55]/80 bg-[#ff2d55]/10 animate-pulse"
                  : "border-cyan-500/40 bg-cyan-500/5"
              }`}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

              <span className="text-[10px] font-mono font-bold text-center px-1 text-slate-200">
                {isCaptured
                  ? "INCIDENT CONFIRMED"
                  : isScanning
                  ? "SCANNING..."
                  : "ROAD TRANSIT"}
              </span>
            </div>
          </div>

          {/* Bottom telemetry */}
          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
            <span className="truncate max-w-[200px]">
              CTX: {visionState.detectedContext}
            </span>
            <span>CONF: {(visionState.confidenceScore * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Animated Scanning Laser Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#ff2d55] to-transparent shadow-[0_0_12px_#ff2d55] animate-scanner" />
        )}
      </div>

      {/* Optional real camera toggle */}
      <div className="flex items-center justify-between mt-1 px-1 text-[10px]">
        <button
          onClick={toggleRealCamera}
          className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          {useRealCamera ? (
            <>
              <VideoOff className="w-3 h-3 text-red-400" />
              <span>Switch to Synthetic Feed</span>
            </>
          ) : (
            <>
              <Video className="w-3 h-3 text-cyan-400" />
              <span>Optional: Activate Live Camera</span>
            </>
          )}
        </button>
        {cameraError && (
          <span className="text-[9px] text-amber-400/80 truncate max-w-[170px]">
            {cameraError}
          </span>
        )}
      </div>
    </div>
  );
}
