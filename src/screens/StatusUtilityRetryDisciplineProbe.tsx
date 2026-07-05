// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Retry Discipline Probe
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { CheckCircle2, CircleAlert, CircleHelp, RadioTower, RefreshCw, Settings, TriangleAlert } from "lucide-react";


export type StatusUtilityRetryDisciplineProbeActionId = "settings-1" | "help-2" | "toggle-probe-status-3" | "refresh-probe-4";

export interface StatusUtilityRetryDisciplineProbeProps {
  actions?: Partial<Record<StatusUtilityRetryDisciplineProbeActionId, () => void>>;

}

export function StatusUtilityRetryDisciplineProbe({ actions }: StatusUtilityRetryDisciplineProbeProps) {
  return (
    <>
      {/* TopNav - Destination Shell */}
      <header className="fixed top-0 left-0 w-full bg-background border-b border-outline-variant flex justify-between items-center h-16 px-gutter max-w-[1280px] mx-auto z-50">
      <div className="flex items-center gap-2">
      <RadioTower className="text-primary" aria-hidden={true} focusable="false" />
      <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">Retry Discipline Probe</span>
      </div>
      <div className="flex items-center gap-4">
      <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-DEFAULT active:opacity-80" type="button" aria-label="Settings" data-action-id="settings-1" onClick={actions?.["settings-1"]}>
      <Settings aria-hidden={true} focusable="false" />
      </button>
      <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-DEFAULT active:opacity-80" type="button" aria-label="Help" data-action-id="help-2" onClick={actions?.["help-2"]}>
      <CircleHelp aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      <main className="w-full max-w-[600px] mt-24">
      {/* Header */}
      <div className="mb-gutter flex flex-col gap-unit">
      <h1 className="font-headline-lg text-headline-lg text-on-surface">Status Utility</h1>
      <p className="text-on-surface-variant">System diagnostics and manual intervention controls.</p>
      </div>
      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-stack-gap mb-gutter">
      {/* Probe Status */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-card-padding flex flex-col justify-between border-t-[3px] border-t-secondary transition-colors hover:border-primary">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-unit">Probe Status</span>
      <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-secondary rounded-sm pip-pulse"></div>
      <span className="font-code-md text-code-md text-on-surface">ONLINE</span>
      </div>
      </div>
      {/* Last Pulse */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-card-padding flex flex-col justify-between border-t-[3px] border-t-primary-container transition-colors hover:border-primary">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-unit">Last Pulse</span>
      <span className="font-code-md text-code-md text-on-surface">14ms ago</span>
      </div>
      {/* Health Score */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT p-card-padding flex flex-col justify-between border-t-[3px] border-t-secondary transition-colors hover:border-primary">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-unit">Health Score</span>
      <span className="font-code-md text-code-md text-on-surface">99.8%</span>
      </div>
      </div>
      {/* Interactive Area */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-DEFAULT p-gutter mb-gutter">
      <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
      <span className="font-headline-md text-headline-md text-on-surface">System Control</span>
      <p className="text-on-surface-variant text-sm">Force system refresh or pause execution.</p>
      </div>
      <div className="flex items-center gap-gutter">
      {/* Toggle Switch */}
      <div className="flex items-center gap-2">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase" id="toggle-label">Ready</span>
      <button aria-checked={true} className="relative inline-flex h-6 w-11 items-center rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-secondary" id="ACT_TOGGLE_STATUS" role="switch" type="button" data-action-id="toggle-probe-status-3" onClick={actions?.["toggle-probe-status-3"]}>
      <span className="sr-only">Toggle probe status</span>
      <span className="inline-block h-4 w-4 transform rounded-sm bg-white transition-transform translate-x-6"></span>
      </button>
      </div>
      {/* Action Button */}
      <button className="bg-primary text-on-primary font-code-md text-code-md uppercase px-4 py-2 rounded-sm hover:bg-on-surface transition-colors active:opacity-80 flex items-center gap-2" id="ACT_REFRESH_STATUS" type="button" data-action-id="refresh-probe-4" onClick={actions?.["refresh-probe-4"]}>
      <RefreshCw className="text-[16px]" aria-hidden={true} focusable="false" />
                              Refresh Probe
                          </button>
      </div>
      </div>
      </div>
      {/* Latest Activity (Table) */}
      <div className="bg-surface border border-outline-variant rounded-DEFAULT overflow-hidden">
      <div className="p-card-padding border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Latest Activity</span>
      <span className="font-code-md text-code-md text-on-surface-variant text-xs">Updated: Oct 24, 14:02:15</span>
      </div>
      <table className="w-full text-left border-collapse">
      <tbody className="font-code-md text-code-md text-on-surface">
      <tr className="bg-surface">
      <td className="p-card-padding border-b border-outline-variant text-secondary w-8"><CheckCircle2 className="text-[16px]" aria-hidden={true} focusable="false" /></td>
      <td className="p-card-padding border-b border-outline-variant">TX_OK</td>
      <td className="p-card-padding border-b border-outline-variant text-on-surface-variant">Payload successfully transmitted to target delta.</td>
      <td className="p-card-padding border-b border-outline-variant text-right">14:02:15</td>
      </tr>
      <tr className="bg-surface-bright">
      <td className="p-card-padding border-b border-outline-variant text-tertiary-container w-8"><TriangleAlert className="text-[16px]" aria-hidden={true} focusable="false" /></td>
      <td className="p-card-padding border-b border-outline-variant">RETRY_1</td>
      <td className="p-card-padding border-b border-outline-variant text-on-surface-variant">Timeout detected, escalating to discipline queue.</td>
      <td className="p-card-padding border-b border-outline-variant text-right">14:01:42</td>
      </tr>
      </tbody>
      </table>
      </div>
      {/* Conditional Empty State Panel (Hidden by default, shown for demonstration logic) */}
      <div className="hidden mt-gutter bg-error-container border border-error p-card-padding rounded-DEFAULT flex items-start gap-3" id="error-panel">
      <CircleAlert className="text-on-error-container mt-0.5" aria-hidden={true} focusable="false" />
      <div className="flex flex-col">
      <span className="font-headline-md text-headline-md text-on-error-container text-sm">Initialization Required</span>
      <p className="text-on-error-container text-sm mt-1">No probe data found. Initialize the system to begin data collection.</p>
      </div>
      </div>
      </main>
      
    </>
  );
}
