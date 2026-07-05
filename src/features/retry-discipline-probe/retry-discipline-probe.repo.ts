/**
 * Persistence adapter for Retry Discipline Probe app shell state.
 *
 * Uses localStorage when available. Returns recoverable errors on:
 *  - Storage unavailable (private mode, disabled, no window).
 *  - Corrupted JSON that fails to parse.
 *  - Schema mismatch (missing version, wrong shape).
 *
 * Owned by US-001.
 */

import type {
  RetryDisciplinePersistedShape,
  RetryDisciplineRepoResult,
  RetryDisciplineShellState,
} from './retry-discipline-probe.types';

export const RETRY_DISCIPLINE_STORAGE_KEY =
  'setfarm:retry-discipline-probe:shell:v1';

const EMPTY_PERSISTED: RetryDisciplinePersistedShape = {
  version: 1,
  activeSurfaceId: 'SURF_STATUS_UTILITY',
  activePanelId: null,
  selectedRecordId: null,
  records: [],
};

const VALID_SURFACE_IDS: ReadonlySet<string> = new Set<string>([
  'SURF_STATUS_UTILITY',
  'SURF_UNKNOWN',
]);

// Storage availability typically does not change during a page session,
// so we cache the result of the probe to avoid redundant localStorage
// write/delete cycles on every load, persist, and clear.
let isStorageAvailableCached: boolean | null = null;

export function isStorageAvailable(): boolean {
  if (isStorageAvailableCached !== null) return isStorageAvailableCached;
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      isStorageAvailableCached = false;
      return false;
    }
    const probeKey = '__retry_discipline_probe_probe__';
    window.localStorage.setItem(probeKey, '1');
    window.localStorage.removeItem(probeKey);
    isStorageAvailableCached = true;
    return true;
  } catch {
    isStorageAvailableCached = false;
    return false;
  }
}

function isPersistedShape(value: unknown): value is RetryDisciplinePersistedShape {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.version !== 1) return false;
  if (typeof v.activeSurfaceId !== 'string') return false;
  if (!VALID_SURFACE_IDS.has(v.activeSurfaceId)) return false;
  if (v.activePanelId !== null && typeof v.activePanelId !== 'string') return false;
  if (v.selectedRecordId !== null && typeof v.selectedRecordId !== 'string') return false;
  if (!Array.isArray(v.records)) return false;
  for (const record of v.records) {
    if (!record || typeof record !== 'object') return false;
    const r = record as Record<string, unknown>;
    if (typeof r.id !== 'string') return false;
    if (typeof r.label !== 'string') return false;
    if (typeof r.surfaceId !== 'string') return false;
    if (!VALID_SURFACE_IDS.has(r.surfaceId)) return false;
    if (typeof r.updatedAt !== 'string') return false;
  }
  return true;
}

export function loadPersistedState(): RetryDisciplineRepoResult<RetryDisciplinePersistedShape> {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'storage-unavailable' };
  }
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(RETRY_DISCIPLINE_STORAGE_KEY);
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : 'storage-read-failed',
    };
  }
  if (raw === null || raw === '') {
    // Return a fresh copy of the default state. Returning the shared
    // EMPTY_PERSISTED reference would let downstream consumers accidentally
    // mutate module state.
    return { ok: true, data: defaultPersistedState() };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: 'storage-corrupted-json' };
  }
  if (!isPersistedShape(parsed)) {
    return { ok: false, error: 'storage-corrupted-schema' };
  }
  return { ok: true, data: parsed };
}

export function persistState(
  state: Pick<
    RetryDisciplineShellState,
    'activeSurfaceId' | 'activePanelId' | 'selectedRecordId' | 'records'
  >,
): RetryDisciplineRepoResult<true> {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'storage-unavailable' };
  }
  const payload: RetryDisciplinePersistedShape = {
    version: 1,
    activeSurfaceId: state.activeSurfaceId,
    activePanelId: state.activePanelId,
    selectedRecordId: state.selectedRecordId,
    records: state.records,
  };
  try {
    window.localStorage.setItem(
      RETRY_DISCIPLINE_STORAGE_KEY,
      JSON.stringify(payload),
    );
    return { ok: true, data: true };
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : 'storage-write-failed',
    };
  }
}

export function clearPersistedState(): RetryDisciplineRepoResult<true> {
  if (!isStorageAvailable()) {
    return { ok: false, error: 'storage-unavailable' };
  }
  try {
    window.localStorage.removeItem(RETRY_DISCIPLINE_STORAGE_KEY);
    return { ok: true, data: true };
  } catch (cause) {
    return {
      ok: false,
      error: cause instanceof Error ? cause.message : 'storage-clear-failed',
    };
  }
}

export function defaultPersistedState(): RetryDisciplinePersistedShape {
  return { ...EMPTY_PERSISTED, records: [] };
}