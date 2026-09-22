import { MotionDataPoint, AudioDataPoint, VisionContext } from "../types";

export type SensorListener = (data: {
  motion: MotionDataPoint;
  audio: AudioDataPoint;
  vision: VisionContext;
}) => void;

class SensorStreamManager {
  private listeners: Set<SensorListener> = new Set();
  private intervalId: NodeJS.Timeout | null = null;
  private isSpiking = false;
  private spikeProgress = 0; // 0 to 1
  private spikePeak = 0;

  // Real-time telemetry cache
  private currentMotion: MotionDataPoint = {
    timestamp: Date.now(),
    accelX: 0.12,
    accelY: 9.78,
    accelZ: 0.45,
    magnitude: 9.81,
    gyroPitch: 0.05,
    gyroRoll: -0.02,
    gyroYaw: 0.01,
    isAnomaly: false,
  };

  private currentAudio: AudioDataPoint = {
    timestamp: Date.now(),
    decibel: 42,
    frequencyHz: 420,
    pattern: "ambient",
  };

  private currentVision: VisionContext = {
    status: "ready",
    confidenceScore: 0.94,
    detectedContext: "Two-wheeler transit corridor",
    environmentalLighting: "streetlamp",
    tiltAngle: 12,
  };

  constructor() {
    this.startStreaming();
  }

  public subscribe(listener: SensorListener) {
    this.listeners.add(listener);
    // Immediate callback with current snapshot
    listener({
      motion: this.currentMotion,
      audio: this.currentAudio,
      vision: this.currentVision,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public startStreaming() {
    if (this.intervalId) return;

    let tick = 0;
    this.intervalId = setInterval(() => {
      tick++;
      const now = Date.now();

      if (this.isSpiking) {
        // Impact simulation progression over ~1.8 seconds (18 ticks at 100ms)
        this.spikeProgress += 0.07;
        const progress = this.spikeProgress;

        if (progress < 0.4) {
          // Rapid impulse deceleration spike
          const factor = Math.sin((progress / 0.4) * Math.PI);
          const shock = 28.5 * factor;
          this.currentMotion = {
            timestamp: now,
            accelX: 14.2 * factor + (Math.random() - 0.5) * 4,
            accelY: 28.4 * factor + (Math.random() - 0.5) * 5,
            accelZ: -19.8 * factor + (Math.random() - 0.5) * 4,
            magnitude: Math.min(36, 9.81 + shock),
            gyroPitch: 3.4 * factor,
            gyroRoll: -2.8 * factor,
            gyroYaw: 1.9 * factor,
            isAnomaly: true,
          };
          this.currentAudio = {
            timestamp: now,
            decibel: Math.min(94, 52 + 40 * factor),
            frequencyHz: 1200 + Math.floor(Math.random() * 800),
            pattern: "abnormal_spike",
          };
          this.currentVision = {
            status: "scanning",
            confidenceScore: 0.88,
            detectedContext: "Sudden trajectory divergence / horizontal tilt",
            environmentalLighting: "streetlamp",
            tiltAngle: 68,
          };
        } else if (progress < 1.0) {
          // Residual decay and post-impact immobility (device at rest)
          const decay = 1 - (progress - 0.4) / 0.6;
          this.currentMotion = {
            timestamp: now,
            accelX: (Math.random() - 0.5) * 0.4 * decay,
            accelY: 8.9 + (Math.random() - 0.5) * 0.3 * decay,
            accelZ: 4.1 + (Math.random() - 0.5) * 0.3 * decay,
            magnitude: 9.81 + 3.2 * decay,
            gyroPitch: 0.1 * decay,
            gyroRoll: 0.05 * decay,
            gyroYaw: 0.02 * decay,
            isAnomaly: decay > 0.3,
          };
          this.currentAudio = {
            timestamp: now,
            decibel: 38 + 10 * decay,
            frequencyHz: 280,
            pattern: "silence",
          };
          this.currentVision = {
            status: "captured",
            confidenceScore: 0.96,
            detectedContext: "Static ground plane context confirmed",
            environmentalLighting: "streetlamp",
            tiltAngle: 72,
          };
        } else {
          // Spike completed - settled in post-incident state
          this.isSpiking = false;
          this.spikeProgress = 0;
          this.currentMotion.isAnomaly = false;
        }
      } else {
        // Standard transit drift (two-wheeler moving at ~35 km/h, road vibration)
        const roadVibe = Math.sin(tick * 0.4) * 0.6 + (Math.random() - 0.5) * 0.4;
        const rollDrift = Math.sin(tick * 0.15) * 0.08;

        this.currentMotion = {
          timestamp: now,
          accelX: 0.15 + roadVibe * 0.5,
          accelY: 9.8 + roadVibe * 0.8,
          accelZ: 0.35 + (Math.random() - 0.5) * 0.3,
          magnitude: 9.81 + roadVibe,
          gyroPitch: 0.03 + (Math.random() - 0.5) * 0.04,
          gyroRoll: rollDrift,
          gyroYaw: (Math.random() - 0.5) * 0.02,
          isAnomaly: false,
        };

        this.currentAudio = {
          timestamp: now,
          decibel: 45 + Math.sin(tick * 0.2) * 5 + Math.random() * 3,
          frequencyHz: 350 + Math.sin(tick * 0.1) * 80,
          pattern: "ambient",
        };

        this.currentVision = {
          status: "ready",
          confidenceScore: 0.95,
          detectedContext: "Stable vehicular transit corridor",
          environmentalLighting: "streetlamp",
          tiltAngle: 12 + Math.floor(Math.sin(tick * 0.1) * 3),
        };
      }

      // Broadcast update
      this.listeners.forEach((listener) => {
        listener({
          motion: this.currentMotion,
          audio: this.currentAudio,
          vision: this.currentVision,
        });
      });
    }, 100);
  }

  public triggerImpactSpike() {
    this.isSpiking = true;
    this.spikeProgress = 0;
    this.spikePeak = 28.4;
  }

  public resetToNormal() {
    this.isSpiking = false;
    this.spikeProgress = 0;
    this.currentMotion = {
      timestamp: Date.now(),
      accelX: 0.12,
      accelY: 9.78,
      accelZ: 0.45,
      magnitude: 9.81,
      gyroPitch: 0.05,
      gyroRoll: -0.02,
      gyroYaw: 0.01,
      isAnomaly: false,
    };
    this.currentVision.status = "ready";
    this.currentVision.detectedContext = "Stable vehicular transit corridor";
    this.currentVision.tiltAngle = 12;
  }

  public getCurrentSnapshot() {
    return {
      motion: this.currentMotion,
      audio: this.currentAudio,
      vision: this.currentVision,
    };
  }

  public stopStreaming() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Global singleton instance for app-wide synchronization
export const sensorStream = new SensorStreamManager();
