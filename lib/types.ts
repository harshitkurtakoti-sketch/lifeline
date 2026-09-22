export type SystemSafetyStatus = 
  | "PROTECTED"
  | "MONITORING"
  | "ANALYZING"
  | "POSSIBLE_EMERGENCY"
  | "EMERGENCY_ACTIVE"
  | "RESOLVED_SAFE";

export type ActiveScreen = 
  | "landing"
  | "dashboard"
  | "simulation"
  | "confirmation"
  | "analysis"
  | "response"
  | "history"
  | "privacy"
  | "architecture"
  | "developer";

export interface MotionDataPoint {
  timestamp: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  magnitude: number;
  gyroPitch: number;
  gyroRoll: number;
  gyroYaw: number;
  isAnomaly: boolean;
}

export interface AudioDataPoint {
  timestamp: number;
  decibel: number;
  frequencyHz: number;
  pattern: "ambient" | "wind" | "abnormal_spike" | "silence";
}

export interface LocationTelemetry {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
  speedKmh: number;
  headingDegrees: number;
  addressSnippet: string;
  landmark: string;
}

export interface VisionContext {
  status: "idle" | "ready" | "scanning" | "captured";
  confidenceScore: number;
  detectedContext: string;
  environmentalLighting: "daylight" | "low_light" | "streetlamp" | "obstructed";
  tiltAngle: number;
}

export interface EmergencyTimelineEvent {
  id: string;
  timestamp: string;
  rawTime: number;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical" | "resolved";
  sensorSource: "MOTION" | "AUDIO" | "CAMERA" | "LOCATION" | "AI" | "USER";
}

export interface EmergencyRecord {
  id: string;
  date: string;
  time: string;
  eventType: string;
  status: "Resolved by user" | "Assistance requested" | "Routine check" | "Simulation test";
  confidence: number;
  location: string;
  durationSeconds: number;
  signals: string[];
}

export interface MCPToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, string>;
  lastExecution?: {
    timestamp: string;
    status: "idle" | "running" | "completed" | "error";
    response: Record<string, any>;
  };
}
