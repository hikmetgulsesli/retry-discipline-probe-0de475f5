/**
 * Type definitions for the Retry Discipline Probe app shell state.
 *
 * Owned by US-001 (Retry Discipline Probe - app shell, state and persistence).
 * Story contract:
 *  - Own shared app shell state, navigation state, selected entity,
 *    storage status, last error, active panel, and item count.
 *  - Persist local preferences/records only when PRD/DESIGN_DOM requires
 *    persistence; corrupted persisted data shows recoverable feedback.
 *  - window.app exposes active screen/route, selected record, counts,
 *    storage status, last error, and active panel.
 */

export type RetryDisciplineSurfaceId =
  | 'SURF_STATUS_UTILITY'
  | 'SURF_UNKNOWN';

export interface RetryDisciplinePanel {
  id: string;
  title: string;
}

export interface RetryDisciplineRecord {
  id: string;
  label: string;
  surfaceId: RetryDisciplineSurfaceId;
  updatedAt: string;
}

export type RetryDisciplineStorageStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'corrupted'
  | 'unavailable';

export interface RetryDisciplineShellState {
  activeSurfaceId: RetryDisciplineSurfaceId;
  activePanelId: string | null;
  selectedRecordId: string | null;
  records: RetryDisciplineRecord[];
  storageStatus: RetryDisciplineStorageStatus;
  lastError: string | null;
  initialized: boolean;
}

export interface RetryDisciplineShellSnapshot {
  activeSurfaceId: RetryDisciplineSurfaceId;
  activeScreenId: RetryDisciplineSurfaceId;
  activePanelId: string | null;
  selectedRecordId: string | null;
  records: RetryDisciplineRecord[];
  itemCount: number;
  storageStatus: RetryDisciplineStorageStatus;
  lastError: string | null;
  initialized: boolean;
}

export interface RetryDisciplinePersistedShape {
  version: 1;
  activeSurfaceId: RetryDisciplineSurfaceId;
  activePanelId: string | null;
  selectedRecordId: string | null;
  records: RetryDisciplineRecord[];
}

export interface RetryDisciplineRepoResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface RetryDisciplineStoreApi {
  state: RetryDisciplineShellState;
  snapshot: RetryDisciplineShellSnapshot;
  setActiveSurface: (surfaceId: RetryDisciplineSurfaceId) => void;
  setActivePanel: (panelId: string | null) => void;
  selectRecord: (recordId: string | null) => void;
  registerRecord: (record: RetryDisciplineRecord) => void;
  clearError: () => void;
  retryStorage: () => void;
}