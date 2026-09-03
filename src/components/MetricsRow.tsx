import { Activity, ShieldX, ShieldCheck } from "lucide-react";

interface MetricsRowProps {
  totalDevices: number;
  threatsBlocked: number;
  networkSecured: boolean;
}

export default function MetricsRow({
  totalDevices,
  threatsBlocked,
  networkSecured,
}: MetricsRowProps) {
  const metrics = [
    {
      label: "Total Devices Monitored",
      value: totalDevices,
      icon: Activity,
      color: "text-blue-400",
      ring: "ring-blue-500/20",
      bg: "bg-blue-500/10",
    },
    {
      label: "Threats Blocked",
      value: threatsBlocked,
      icon: ShieldX,
      color: "text-red-400",
      ring: "ring-red-500/20",
      bg: "bg-red-500/10",
    },
    {
      label: "Network Status",
      value: networkSecured ? "Secured" : "Compromised",
      icon: ShieldCheck,
      color: networkSecured ? "text-emerald-400" : "text-red-400",
      ring: networkSecured ? "ring-emerald-500/20" : "ring-red-500/20",
      bg: networkSecured ? "bg-emerald-500/10" : "bg-red-500/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ring-1 ${m.bg} ${m.color} ${m.ring}`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {m.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
