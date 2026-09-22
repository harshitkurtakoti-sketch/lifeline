import { EmergencyRecord, LocationTelemetry, MCPToolDefinition } from "./types";

export const DEFAULT_LOCATION: LocationTelemetry = {
  latitude: 17.4435,
  longitude: 78.3772,
  accuracyMeters: 4.2,
  speedKmh: 34.8, // typical two-wheeler speed before incident
  headingDegrees: 142,
  addressSnippet: "Hitech City Main Rd, Madhapur",
  landmark: "Near Cyber Towers Flyover, Hyderabad",
};

export const MOCK_EMERGENCY_CONTACT = {
  name: "Dr. Ananya Sharma",
  relationship: "Primary Contact / Spouse",
  phone: "+91 98765 43210",
  secondaryContact: "Emergency Response Network (112)",
};

export const MOCK_HISTORY_RECORDS: EmergencyRecord[] = [
  {
    id: "rec-001",
    date: "TODAY",
    time: "10:42 PM",
    eventType: "Possible impact pattern detected",
    status: "Resolved by user",
    confidence: 87,
    location: "Hitech City Main Rd (Two-wheeler transit)",
    durationSeconds: 18,
    signals: ["Sudden Deceleration (28.4 m/s²)", "Acoustic Impulse (86 dB)", "Gyro Tilt Anomaly (64°)"],
  },
  {
    id: "rec-002",
    date: "TODAY",
    time: "06:18 PM",
    eventType: "Safety mode activated",
    status: "Routine check",
    confidence: 12,
    location: "Financial District Outer Ring Rd",
    durationSeconds: 0,
    signals: ["Commute Started", "Speed Profile Normal (42 km/h)"],
  },
  {
    id: "rec-003",
    date: "YESTERDAY",
    time: "09:31 PM",
    eventType: "Abrupt brake / pothole jolt",
    status: "Resolved by user",
    confidence: 42,
    location: "Gachibowli Stadium Road",
    durationSeconds: 11,
    signals: ["Vertical G-Force Spike (14.2 m/s²)", "Speed Resumed Immediately"],
  },
  {
    id: "rec-004",
    date: "YESTERDAY",
    time: "08:15 AM",
    eventType: "Morning commute protection active",
    status: "Routine check",
    confidence: 8,
    location: "Kondapur to Knowledge City",
    durationSeconds: 0,
    signals: ["No anomalies detected", "Continuous sensor fusion steady"],
  },
];

export const INITIAL_MCP_TOOLS: MCPToolDefinition[] = [
  {
    name: "detect_event",
    description: "Evaluates multi-modal sensor streams to flag abrupt inertial deceleration or orientation shifts.",
    parameters: {
      window_ms: "integer (e.g. 500ms)",
      sensitivity: "float (0.1 - 1.0)",
    },
    lastExecution: {
      timestamp: "10:42:18 PM",
      status: "completed",
      response: {
        event_detected: true,
        pattern: "two_wheeler_sudden_impact",
        g_force_peak: "2.9G",
        tilt_deviation: "64.2°",
      },
    },
  },
  {
    name: "get_sensor_context",
    description: "Fetches on-device synchronized telemetry snapshot across accelerometer, gyroscope, and ambient acoustics.",
    parameters: {
      include_raw_telemetry: "boolean",
      sample_rate_hz: "integer",
    },
    lastExecution: {
      timestamp: "10:42:19 PM",
      status: "completed",
      response: {
        motion_variance: 4.88,
        audio_impulse_db: 86.4,
        ambient_noise_profile: "traffic_road_noise",
        device_orientation: "flat_sideways_ground",
      },
    },
  },
  {
    name: "analyze_situation",
    description: "Executes local-first lightweight reasoning model to compute emergency likelihood score and observable evidence.",
    parameters: {
      fusion_mode: "string ('conservative' | 'balanced' | 'high_recall')",
      user_feedback_timeout_sec: "integer",
    },
    lastExecution: {
      timestamp: "10:42:20 PM",
      status: "completed",
      response: {
        possible_emergency: true,
        event_type: "impact",
        requires_confirmation: true,
        confidence_percent: 87,
        confidence_nature: "prototype_heuristic_score",
        observable_signals: ["abrupt_deceleration", "post_impact_immobility", "audio_transient"],
      },
    },
  },
  {
    name: "get_location_context",
    description: "Extracts high-precision tactical GPS telemetry, heading, nearest roadway landmark, and accuracy radius.",
    parameters: {
      high_accuracy: "boolean",
    },
    lastExecution: {
      timestamp: "10:42:21 PM",
      status: "completed",
      response: {
        latitude: 17.4435,
        longitude: 78.3772,
        accuracy_meters: 4.2,
        speed_kmh: 0.0,
        address: "Hitech City Main Rd, Madhapur, Hyderabad",
      },
    },
  },
  {
    name: "prepare_emergency_message",
    description: "Assembles standardized, context-rich first response dispatch payload for trusted contacts or emergency gateway.",
    parameters: {
      include_coordinates: "boolean",
      include_ai_summary: "boolean",
      channel: "string ('sms' | 'satellite' | 'mesh')",
    },
    lastExecution: {
      timestamp: "10:42:22 PM",
      status: "completed",
      response: {
        prepared_text: "LIFELINE ALERT: Possible two-wheeler impact pattern detected. User has not confirmed safety.\nLocation: 17.4435°N, 78.3772°E (Near Cyber Towers Flyover)\nTime: 10:42 PM.\nPlease check on me immediately.",
        delivery_ready: true,
      },
    },
  },
];
