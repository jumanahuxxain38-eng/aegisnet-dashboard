import { Shield, AlertTriangle, RotateCcw } from "lucide-react";

interface ActionBarProps {
  onSimulateNormal: () => void;
  onSimulateAttack: () => void;
  hasActiveThreat: boolean;
}

export default function ActionBar({
  onSimulateNormal,
  onSimulateAttack,
  hasActiveThreat,
}: ActionBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white">Simulation Controls</h2>
        <p className="text-sm text-slate-400">
          Trigger network scenarios to test the autonomous response engine.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onSimulateNormal}
          className="group flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:ring-1 hover:ring-emerald-500/50 active:scale-[0.98]"
        >
          <Shield className="h-4 w-4 transition-transform group-hover:scale-110" />
          Simulate Normal Traffic
        </button>
        <button
          onClick={onSimulateAttack}
          disabled={hasActiveThreat}
          className={`group flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all active:scale-[0.98] ${
            hasActiveThreat
              ? "cursor-not-allowed border border-red-500/20 bg-red-500/5 text-red-400/40"
              : "border border-red-500/40 bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white shadow-lg shadow-red-900/40 hover:from-red-600 hover:to-orange-600 hover:shadow-red-900/60"
          }`}
        >
          {hasActiveThreat ? (
            <>
              <RotateCcw className="h-4 w-4 animate-spin" />
              Threat Active…
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4 transition-transform group-hover:scale-110" />
              Simulate Cyber Attack
            </>
          )}
        </button>
      </div>
    </div>
  );
}
