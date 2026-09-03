import { ShieldCheck, Activity } from "lucide-react";

interface HeaderProps {
  deviceCount: number;
  hasActiveThreat: boolean;
}

export default function Header({ deviceCount, hasActiveThreat }: HeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-emerald-950/20" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 ring-1 ring-blue-500/40">
            <ShieldCheck className="h-7 w-7 text-blue-400" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="h-full w-full rounded-full bg-emerald-400" />
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              AegisNet
            </h1>
            <p className="text-sm font-medium text-slate-400">
              Autonomous IoT Incident Response
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-500 ${
            hasActiveThreat
              ? "bg-red-500/15 text-red-300 ring-red-500/40"
              : "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40"
          }`}
        >
          <Activity className={`h-4 w-4 ${hasActiveThreat ? "animate-pulse" : ""}`} />
          <span>
            {hasActiveThreat ? "Threat Detected" : "System Active"}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-300">{deviceCount} Devices Monitored</span>
        </div>
      </div>
    </header>
  );
}
