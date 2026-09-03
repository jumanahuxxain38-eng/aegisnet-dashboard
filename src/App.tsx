import { useState, useCallback } from "react";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
import DeviceMatrix from "@/components/DeviceMatrix";
import ThreatLog from "@/components/ThreatLog";
import MetricsRow from "@/components/MetricsRow";
import type { Device, LogEntry } from "@/types";

const initialDevices: Device[] = [
  { id: "cam-01", name: "Smart IP Camera 01", ip: "192.168.1.105", status: "normal", type: "camera" },
  { id: "lock-01", name: "Office Smart Lock", ip: "192.168.1.108", status: "normal", type: "lock" },
  { id: "meter-03", name: "Industrial Meter 03", ip: "192.168.1.112", status: "normal", type: "meter" },
  { id: "router-01", name: "Gateway Router", ip: "192.168.1.1", status: "normal", type: "router" },
];

const ATTACK_ANALYSIS =
  "Anomalous outbound packet flood detected from 192.168.1.105 toward unknown external IP (45.33.21.9). Automatically isolated device from network.";

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}

export default function App() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 0,
      timestamp: formatTimestamp(new Date()),
      severity: "success",
      message: "AegisNet initialized — all devices reporting normal.",
    },
  ]);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [hasActiveThreat, setHasActiveThreat] = useState(false);
  const [logIdCounter, setLogIdCounter] = useState(1);

  const addLog = useCallback(
    (severity: LogEntry["severity"], message: string) => {
      setLogIdCounter((prev) => {
        setLogs((current) => [
          ...current,
          {
            id: prev,
            timestamp: formatTimestamp(new Date()),
            severity,
            message,
          },
        ]);
        return prev + 1;
      });
    },
    []
  );

  const handleSimulateNormal = useCallback(() => {
    setDevices(initialDevices.map((d) => ({ ...d, status: "normal" })));
    setAiAnalysis(null);
    setHasActiveThreat(false);
    addLog("success", "Normal traffic pattern restored — all devices back to safe status.");
  }, [addLog]);

  const handleSimulateAttack = useCallback(() => {
    if (hasActiveThreat) return;

    setDevices((prev) =>
      prev.map((d) =>
        d.id === "cam-01" ? { ...d, status: "quarantined" } : d
      )
    );
    setAiAnalysis(ATTACK_ANALYSIS);
    setThreatsBlocked((prev) => prev + 1);
    setHasActiveThreat(true);
    addLog(
      "error",
      "ALERT: Outbound packet flood from 192.168.1.105 to 45.33.21.9 — device quarantined."
    );
  }, [hasActiveThreat, addLog]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background grid effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative">
        <Header deviceCount={devices.length} hasActiveThreat={hasActiveThreat} />

        <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
          <ActionBar
            onSimulateNormal={handleSimulateNormal}
            onSimulateAttack={handleSimulateAttack}
            hasActiveThreat={hasActiveThreat}
          />

          <DeviceMatrix devices={devices} />

          <ThreatLog logs={logs} aiAnalysis={aiAnalysis} />

          <MetricsRow
            totalDevices={devices.length}
            threatsBlocked={threatsBlocked}
            networkSecured={!hasActiveThreat}
          />
        </main>

        <footer className="border-t border-slate-800/80 px-6 py-4 text-center text-xs text-slate-600">
          AegisNet — Autonomous IoT Incident Response · Simulated environment
        </footer>
      </div>
    </div>
  );
}
