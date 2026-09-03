export type DeviceStatus = "normal" | "quarantined";

export interface Device {
  id: string;
  name: string;
  ip: string;
  status: DeviceStatus;
  type: "camera" | "lock" | "meter" | "router";
}

export type LogSeverity = "info" | "warning" | "error" | "success";

export interface LogEntry {
  id: number;
  timestamp: string;
  severity: LogSeverity;
  message: string;
}
