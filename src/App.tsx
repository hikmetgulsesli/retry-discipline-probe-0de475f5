import { useEffect } from 'react';
import { StatusUtilityRetryDisciplineProbe } from './screens';
import { RetryDisciplineShellProvider, useRetryDisciplineShell } from './features/retry-discipline-probe/retry-discipline-probe.store';
import { attachAppBridge, detachAppBridge } from './test/bridge';

function AppShell() {
  const api = useRetryDisciplineShell();

  useEffect(() => {
    attachAppBridge(api);
    return () => {
      detachAppBridge();
    };
  }, [api]);

  return (
    <div
      data-setfarm-root="baseline"
      data-setfarm-shell="retry-discipline-probe"
      data-testid="setfarm-app-root"
      className="min-h-screen bg-slate-50 text-slate-950"
    >
      <StatusUtilityRetryDisciplineProbe />
    </div>
  );
}

export default function App() {
  return (
    <RetryDisciplineShellProvider>
      <AppShell />
    </RetryDisciplineShellProvider>
  );
}