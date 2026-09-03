import { useEffect, useRef } from "react";
import {
  Terminal,
  Info,
  AlertTriangle,
  ShieldX,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import type { LogEntry, LogSeverity } from "@/types";

const severityConfig: Record<
  LogSeverity,
  { icon: typeof Info; color: string; bg: string; label: string }
> = {
  info: { icon: Info, color: "text-sky-400", bg: "bg-sky-500/10", label: "INFO" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", label: "WARN" },
  error: { icon: ShieldX, color: "text-red-400", bg: "bg-red-500/10", label: "ERROR" },
  success: { icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "OK" },
};

interface ThreatLogProps {
  logs: LogEntry[];
  aiAnalysis: string | null;
}

export default function ThreatLog({ logs, aiAnalysis }: ThreatLogProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [logs]);

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Event Log */}
      <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <Terminal className="h-4 w-4 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Live Threat Log</h2>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            streaming
          </span>
        </div>
        <div className="max-h-[340px] overflow-y-auto p-3 font-mono text-xs">
          {logs.length === 0 ? (
            <p className="py-8 text-center text-slate-600">No events recorded.</p>
          ) : (
            logs.map((entry) => {
              const cfg = severityConfig[entry.severity];
              const Icon = cfg.icon;
              return (
                <div
                  key={entry.id}
                  className="animate-fade-slide-in flex items-start gap-3 rounded-md px-2 py-2 hover:bg-slate-800/50"
                >
                  <span className="shrink-0 text-slate-600">{entry.timestamp}</span>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${cfg.bg} ${cfg.color}`}
                  >
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                  <span className="text-slate-300">{entry.message}</span>
                </div>
              );
            })
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* AI Analysis */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <Cpu className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">AI Threat Analysis</h2>
        </div>
        <div className="p-4">
          {aiAnalysis ? (
            <div className="animate-fade-slide-in rounded-lg border border-red-500/30 bg-red-950/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <ShieldX className="h-4 w-4 text-red-400" />
                <span className="text-xs font-bold uppercase tracking-wide text-red-400">
                  Threat Identified
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-200">{aiAnalysis}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ShieldCheck className="h-10 w-10 text-emerald-500/40" />
              <p className="mt-3 text-sm font-medium text-slate-400">No threats detected</p>
              <p className="mt-1 text-xs text-slate-600">
                AI analysis engine is monitoring all traffic patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
