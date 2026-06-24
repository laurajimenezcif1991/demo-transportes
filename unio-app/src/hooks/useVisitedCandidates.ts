import { useState, useCallback } from 'react';

const STORAGE_KEY = 'unio_visited_candidates_v1';

function readStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set<string>(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeStorage(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch { /* noop */ }
}

export function useVisitedCandidates() {
  // version counter forces memo re-computation in consumers
  const [version, setVersion] = useState(0);

  const markVisited = useCallback((id: string) => {
    const visited = readStorage();
    if (!visited.has(id)) {
      visited.add(id);
      writeStorage(visited);
      setVersion((v) => v + 1);
    }
  }, []);

  const isVisited = useCallback((id: string) => readStorage().has(id), []);

  const getAllVisited = useCallback(() => readStorage(), []);

  return { markVisited, isVisited, getAllVisited, visitedVersion: version };
}
