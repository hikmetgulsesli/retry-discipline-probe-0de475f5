/**
 * Test fixtures for the Retry Discipline Probe app shell.
 *
 * Provides canonical sample state, persisted blobs, and a fresh in-memory
 * localStorage shim for tests. Owned by US-001.
 */

import type {
  RetryDisciplinePersistedShape,
  RetryDisciplineRecord,
  RetryDisciplineShellState,
} from '../features/retry-discipline-probe/retry-discipline-probe.types';
import { RETRY_DISCIPLINE_STORAGE_KEY } from '../features/retry-discipline-probe/retry-discipline-probe.repo';

export const SAMPLE_RECORDS: RetryDisciplineRecord[] = [
  {
    id: 'rec-probe-001',
    label: 'Probe A',
    surfaceId: 'SURF_STATUS_UTILITY',
    updatedAt: '2026-07-05T10:00:00.000Z',
  },
  {
    id: 'rec-probe-002',
    label: 'Probe B',
    surfaceId: 'SURF_STATUS_UTILITY',
    updatedAt: '2026-07-05T10:05:00.000Z',
  },
];

export function makeInitialShellState(
  overrides: Partial<RetryDisciplineShellState> = {},
): RetryDisciplineShellState {
  return {
    activeSurfaceId: 'SURF_STATUS_UTILITY',
    activePanelId: 'panel-overview',
    selectedRecordId: null,
    records: SAMPLE_RECORDS,
    storageStatus: 'ready',
    lastError: null,
    initialized: true,
    ...overrides,
  };
}

export function makePersistedShape(
  overrides: Partial<RetryDisciplinePersistedShape> = {},
): RetryDisciplinePersistedShape {
  return {
    version: 1,
    activeSurfaceId: 'SURF_STATUS_UTILITY',
    activePanelId: 'panel-overview',
    selectedRecordId: 'rec-probe-001',
    records: SAMPLE_RECORDS,
    ...overrides,
  };
}

export const CORRUPTED_PERSISTED_BLOB = '{ "version": 1, "activeSurfaceId": ';

export interface InMemoryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  key(index: number): string | null;
  readonly length: number;
}

export function createInMemoryStorage(
  initial: Record<string, string> = {},
): InMemoryStorage {
  const store = new Map<string, string>(Object.entries(initial));
  const storage: InMemoryStorage = {
    getItem(key: string): string | null {
      return store.has(key) ? (store.get(key) as string) : null;
    },
    setItem(key: string, value: string): void {
      store.set(key, String(value));
    },
    removeItem(key: string): void {
      store.delete(key);
    },
    clear(): void {
      store.clear();
    },
    key(index: number): string | null {
      return Array.from(store.keys())[index] ?? null;
    },
    get length(): number {
      return store.size;
    },
  };
  return storage;
}

export function seedStorage(
  storage: InMemoryStorage,
  value: string | null = JSON.stringify(makePersistedShape()),
): void {
  if (value === null) {
    storage.removeItem(RETRY_DISCIPLINE_STORAGE_KEY);
    return;
  }
  storage.setItem(RETRY_DISCIPLINE_STORAGE_KEY, value);
}