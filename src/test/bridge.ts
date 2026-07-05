/**
 * Test bridge: exposes the Retry Discipline Probe app shell snapshot on
 * `window.__SETFARM_APP_BRIDGE__` for runtime verification and unit tests.
 *
 * This file lives at WORKDIR/src/test/bridge.ts (NOT at any parent path).
 * Owned by US-001.
 */

import type {
  RetryDisciplineShellSnapshot,
  RetryDisciplineStoreApi,
} from '../features/retry-discipline-probe/retry-discipline-probe.types';

declare global {
  interface Window {
    __SETFARM_APP_BRIDGE__?: SetfarmAppBridge;
    app?: SetfarmAppBridge;
  }
}

export interface SetfarmAppBridge {
  snapshot: RetryDisciplineShellSnapshot;
  setActiveSurface: RetryDisciplineStoreApi['setActiveSurface'];
  setActivePanel: RetryDisciplineStoreApi['setActivePanel'];
  selectRecord: RetryDisciplineStoreApi['selectRecord'];
  registerRecord: RetryDisciplineStoreApi['registerRecord'];
  clearError: RetryDisciplineStoreApi['clearError'];
  retryStorage: RetryDisciplineStoreApi['retryStorage'];
}

export function attachAppBridge(api: RetryDisciplineStoreApi): SetfarmAppBridge {
  const bridge: SetfarmAppBridge = {
    snapshot: api.snapshot,
    setActiveSurface: api.setActiveSurface,
    setActivePanel: api.setActivePanel,
    selectRecord: api.selectRecord,
    registerRecord: api.registerRecord,
    clearError: api.clearError,
    retryStorage: api.retryStorage,
  };
  if (typeof window !== 'undefined') {
    window.__SETFARM_APP_BRIDGE__ = bridge;
    window.app = bridge;
  }
  return bridge;
}

export function detachAppBridge(): void {
  if (typeof window === 'undefined') return;
  delete window.__SETFARM_APP_BRIDGE__;
  delete window.app;
}

export function getAppBridge(): SetfarmAppBridge | undefined {
  if (typeof window === 'undefined') return undefined;
  return window.__SETFARM_APP_BRIDGE__ ?? window.app;
}