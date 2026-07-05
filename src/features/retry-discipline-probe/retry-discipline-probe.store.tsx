/**
 * Retry Discipline Probe app shell store.
 *
 * Provides a React Context + hook + Provider that owns the app shell state
 * (active surface, selected record, storage status, last error, active
 * panel, item counts). Persists user preferences to localStorage and
 * recovers from corrupted data with user-visible feedback.
 *
 * Owned by US-001. The screen owner stories mount screens beneath
 * <RetryDisciplineShellProvider> and read state via useRetryDisciplineShell.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

import {
  clearPersistedState,
  defaultPersistedState,
  isStorageAvailable,
  loadPersistedState,
  persistState,
} from './retry-discipline-probe.repo';
import type {
  RetryDisciplineRecord,
  RetryDisciplineShellSnapshot,
  RetryDisciplineShellState,
  RetryDisciplineStoreApi,
  RetryDisciplineSurfaceId,
} from './retry-discipline-probe.types';

const INITIAL_STATE: RetryDisciplineShellState = {
  activeSurfaceId: 'SURF_STATUS_UTILITY',
  activePanelId: null,
  selectedRecordId: null,
  records: [],
  storageStatus: 'idle',
  lastError: null,
  initialized: false,
};

type Action =
  | { type: 'BOOTSTRAP_READY'; state: RetryDisciplineShellState }
  | { type: 'SET_SURFACE'; surfaceId: RetryDisciplineSurfaceId }
  | { type: 'SET_PANEL'; panelId: string | null }
  | { type: 'SELECT_RECORD'; recordId: string | null }
  | { type: 'REGISTER_RECORD'; record: RetryDisciplineRecord }
  | { type: 'CLEAR_ERROR' }
  | { type: 'STORAGE_CORRUPTED'; error: string }
  | { type: 'STORAGE_UNAVAILABLE' }
  | { type: 'STORAGE_RECOVERED'; state: RetryDisciplineShellState };

function reducer(
  state: RetryDisciplineShellState,
  action: Action,
): RetryDisciplineShellState {
  switch (action.type) {
    case 'BOOTSTRAP_READY':
      return { ...action.state, initialized: true };
    case 'SET_SURFACE':
      return { ...state, activeSurfaceId: action.surfaceId };
    case 'SET_PANEL':
      return { ...state, activePanelId: action.panelId };
    case 'SELECT_RECORD':
      return { ...state, selectedRecordId: action.recordId };
    case 'REGISTER_RECORD': {
      const next = state.records.filter((r) => r.id !== action.record.id);
      next.push(action.record);
      return { ...state, records: next };
    }
    case 'CLEAR_ERROR':
      return state.lastError === null
        ? state
        : { ...state, lastError: null };
    case 'STORAGE_CORRUPTED':
      return {
        ...state,
        storageStatus: 'corrupted',
        lastError: action.error,
      };
    case 'STORAGE_UNAVAILABLE':
      return {
        ...state,
        storageStatus: 'unavailable',
        lastError: 'storage-unavailable',
      };
    case 'STORAGE_RECOVERED':
      return { ...action.state, storageStatus: 'ready', lastError: null };
    default:
      return state;
  }
}

export function buildShellSnapshot(
  state: RetryDisciplineShellState,
): RetryDisciplineShellSnapshot {
  return {
    activeSurfaceId: state.activeSurfaceId,
    activeScreenId: state.activeSurfaceId,
    activePanelId: state.activePanelId,
    selectedRecordId: state.selectedRecordId,
    records: state.records,
    itemCount: state.records.length,
    storageStatus: state.storageStatus,
    lastError: state.lastError,
    initialized: state.initialized,
  };
}

export function bootstrapShellState(): RetryDisciplineShellState {
  if (typeof window === 'undefined' || !isStorageAvailable()) {
    return {
      ...INITIAL_STATE,
      storageStatus: 'unavailable',
      initialized: true,
    };
  }
  const result = loadPersistedState();
  if (!result.ok || !result.data) {
    return {
      ...INITIAL_STATE,
      storageStatus: 'corrupted',
      lastError: result.error ?? 'storage-corrupted',
      initialized: true,
    };
  }
  const persisted = result.data;
  return {
    ...INITIAL_STATE,
    activeSurfaceId: persisted.activeSurfaceId,
    activePanelId: persisted.activePanelId,
    selectedRecordId: persisted.selectedRecordId,
    records: persisted.records,
    storageStatus: 'ready',
    initialized: true,
  };
}

const RetryDisciplineShellContext = createContext<RetryDisciplineStoreApi | null>(
  null,
);

export interface RetryDisciplineShellProviderProps {
  children: ReactNode;
  /** Optional override for tests. When omitted, real localStorage is used. */
  initialState?: RetryDisciplineShellState;
}

export function RetryDisciplineShellProvider({
  children,
  initialState,
}: RetryDisciplineShellProviderProps) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState ?? INITIAL_STATE,
  );

  // Bootstrap on mount: load persisted state exactly once.
  useEffect(() => {
    if (state.initialized) return;
    const bootstrapped = bootstrapShellState();
    dispatch({ type: 'BOOTSTRAP_READY', state: bootstrapped });
  }, [state.initialized]);

  // Persist whenever the persisted-relevant slice changes (after init).
  // NOTE: `state.storageStatus` is intentionally NOT in the dependency array.
  // When persistState fails we dispatch STORAGE_CORRUPTED, which updates
  // storageStatus; if storageStatus were a dependency the effect would fire
  // again, attempt another write, dispatch again, and so on — infinite loop.
  // The early return guards below keep that from happening regardless.
  useEffect(() => {
    if (!state.initialized) return;
    if (
      state.storageStatus === 'unavailable' ||
      state.storageStatus === 'corrupted'
    ) {
      return;
    }
    const result = persistState({
      activeSurfaceId: state.activeSurfaceId,
      activePanelId: state.activePanelId,
      selectedRecordId: state.selectedRecordId,
      records: state.records,
    });
    if (!result.ok) {
      dispatch({
        type: 'STORAGE_CORRUPTED',
        error: result.error ?? 'storage-write-failed',
      });
    }
  }, [
    state.initialized,
    state.activeSurfaceId,
    state.activePanelId,
    state.selectedRecordId,
    state.records,
  ]);

  const setActiveSurface = useCallback(
    (surfaceId: RetryDisciplineSurfaceId) => {
      dispatch({ type: 'SET_SURFACE', surfaceId });
    },
    [],
  );

  const setActivePanel = useCallback((panelId: string | null) => {
    dispatch({ type: 'SET_PANEL', panelId });
  }, []);

  const selectRecord = useCallback((recordId: string | null) => {
    dispatch({ type: 'SELECT_RECORD', recordId });
  }, []);

  const registerRecord = useCallback((record: RetryDisciplineRecord) => {
    dispatch({ type: 'REGISTER_RECORD', record });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const retryStorage = useCallback(() => {
    const result = loadPersistedState();
    if (!result.ok || !result.data) {
      dispatch({
        type: 'STORAGE_CORRUPTED',
        error: result.error ?? 'storage-corrupted',
      });
      return;
    }
    const persisted = result.data;
    dispatch({
      type: 'STORAGE_RECOVERED',
      state: {
        activeSurfaceId: persisted.activeSurfaceId,
        activePanelId: persisted.activePanelId,
        selectedRecordId: persisted.selectedRecordId,
        records: persisted.records,
        storageStatus: 'ready',
        lastError: null,
        initialized: true,
      },
    });
  }, []);

  const api = useMemo<RetryDisciplineStoreApi>(() => {
    const snapshot = buildShellSnapshot(state);
    return {
      state,
      snapshot,
      setActiveSurface,
      setActivePanel,
      selectRecord,
      registerRecord,
      clearError,
      retryStorage,
    };
  }, [
    state,
    setActiveSurface,
    setActivePanel,
    selectRecord,
    registerRecord,
    clearError,
    retryStorage,
  ]);

  return (
    <RetryDisciplineShellContext.Provider value={api}>
      {children}
    </RetryDisciplineShellContext.Provider>
  );
}

export function useRetryDisciplineShell(): RetryDisciplineStoreApi {
  const ctx = useContext(RetryDisciplineShellContext);
  if (!ctx) {
    throw new Error(
      'useRetryDisciplineShell must be used inside <RetryDisciplineShellProvider>',
    );
  }
  return ctx;
}

export function useRetryDisciplineSnapshot(): RetryDisciplineShellSnapshot {
  return useRetryDisciplineShell().snapshot;
}

// Re-export repo helpers that consumers may legitimately need.
export {
  clearPersistedState,
  defaultPersistedState,
  isStorageAvailable,
  loadPersistedState,
  persistState,
};