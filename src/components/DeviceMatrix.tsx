import type { Device } from "@/types";
import DeviceCard from "./DeviceCard";

interface DeviceMatrixProps {
  devices: Device[];
}

export default function DeviceMatrix({ devices }: DeviceMatrixProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Device Health Matrix</h2>
        <span className="text-xs font-medium text-slate-500">
          {devices.filter((d) => d.status === "normal").length} of {devices.length} healthy
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </section>
  );
}
