"use client";

import React, { useEffect, useState } from "react";
import { DEFAULT_LOCATION } from "@/lib/constants";
import { LocationTelemetry } from "@/lib/types";
import { MapPin, Navigation, Compass, Crosshair } from "lucide-react";

interface LocationRadarProps {
  telemetry?: LocationTelemetry;
}

export default function LocationRadar({
  telemetry = DEFAULT_LOCATION,
}: LocationRadarProps) {
  const [location, setLocation] = useState<LocationTelemetry>(telemetry);
  const [hasRealGps, setHasRealGps] = useState(false);

  useEffect(() => {
    // Attempt browser geolocation if user grants permission
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setHasRealGps(true);
          setLocation((prev) => ({
            ...prev,
            latitude: Number(pos.coords.latitude.toFixed(4)),
            longitude: Number(pos.coords.longitude.toFixed(4)),
            accuracyMeters: Number(pos.coords.accuracy.toFixed(1)),
            speedKmh: pos.coords.speed ? Number((pos.coords.speed * 3.6).toFixed(1)) : prev.speedKmh,
            headingDegrees: pos.coords.heading ? Math.round(pos.coords.heading) : prev.headingDegrees,
          }));
        },
        () => {
          // Fallback to high-precision demo coordinates
          setHasRealGps(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200 tracking-wide text-[11px] uppercase">
            LOCATION TELEMETRY
          </span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          {hasRealGps ? "LIVE GPS LOCK" : "SIMULATED FIX (±4.2m)"}
        </span>
      </div>

      {/* High-tech tactical dark radar map viewport */}
      <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#07090f] border border-white/10 shadow-inner p-2.5 flex flex-col justify-between">
        {/* Tactical grid & radial circles */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Concentric rings */}
          <div className="w-20 h-20 rounded-full border border-cyan-500/15" />
          <div className="absolute w-36 h-36 rounded-full border border-cyan-500/10" />
          <div className="absolute w-52 h-52 rounded-full border border-white/5" />
          {/* Radar sweep */}
          <div className="absolute w-44 h-44 rounded-full radar-sweep animate-spin" style={{ animationDuration: "6s" }} />
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-cyan-500/10" />
          <div className="absolute h-full w-[1px] bg-cyan-500/10" />
        </div>

        {/* Center Pulsing GPS Target Beacon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute w-7 h-7 rounded-full bg-cyan-400/25 animate-ping" />
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-[#07090f] shadow-[0_0_10px_#22d3ee]" />
          </div>
          <span className="text-[9px] font-mono font-bold text-cyan-300 mt-1 bg-black/60 px-1 rounded">
            VEHICLE LOC
          </span>
        </div>

        {/* Coordinates top card */}
        <div className="relative z-10 flex justify-between items-start text-[10px] font-mono">
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-slate-200">
            <div>{location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E</div>
            <div className="text-[9px] text-slate-400">{location.landmark}</div>
          </div>
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-right text-slate-300">
            <span className="text-cyan-400 font-bold">{location.speedKmh} km/h</span>
            <div className="text-[9px] text-slate-400">HDG: {location.headingDegrees}°</div>
          </div>
        </div>

        {/* Bottom Address badge */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
          <span className="truncate max-w-[210px]">{location.addressSnippet}</span>
          <span className="text-emerald-400 text-[9px] font-bold">ACC: ±{location.accuracyMeters}m</span>
        </div>
      </div>
    </div>
  );
}
