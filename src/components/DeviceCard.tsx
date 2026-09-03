import {
  Camera,
  Lock,
  Gauge,
  Router,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import type { Device } from "@/types";

const deviceIcons: Record<Device["type"], typeof Camera> = {
  camera: Camera,
  lock: Lock,
  meter: Gauge,
  router: Router,
};

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const Icon = deviceIcons[device.type];
  const isQuarantined = device.status === "quarantined";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-500 ${
        isQuarantined
          ? "border-red-500/50 bg-red-950/30 animate-pulse-ring"
          : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 transition-colors ${
            isQuarantined
              ? "bg-red-500/15 text-red-400 ring-red-500/30"
              : "bg-blue-500/10 text-blue-400 ring-blue-500/20"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
            isQuarantined
              ? "animate-blink-badge bg-red-500/20 text-red-300 ring-1 ring-red-500/50"
              : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
          }`}
        >
          {isQuarantined ? (
            <ShieldAlert className="h-3.5 w-3.5" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}
          {isQuarantined ? "Quarantined" : "Normal"}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold text-white">{device.name}</h3>
        <p className="mt-1 font-mono text-sm text-slate-400">{device.ip}</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            isQuarantined ? "bg-red-500" : "bg-emerald-500"
          }`}
        />
        <span className="text-xs font-medium text-slate-500">
          {isQuarantined ? "Isolated from network" : "Connected & monitored"}
        </span>
      </div>
    </div>
  );
}
