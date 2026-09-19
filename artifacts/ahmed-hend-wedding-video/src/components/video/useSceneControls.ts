import { useCallback, useMemo, useState } from 'react';

const REPEAT_SUFFIX_RE = /_r[12]$/;

export function useSceneControls(baseDurations: Record<string, number>) {
  const sceneKeys = useMemo(() => Object.keys(baseDurations), [baseDurations]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mountKey, setMountKey] = useState(0);
  const [tick, setTick] = useState(0);

  const durations = useMemo(() => {
    const key = sceneKeys[activeIndex];
    if (locked) {
      return {
        [`${key}_r1`]: baseDurations[key],
        [`${key}_r2`]: baseDurations[key],
      };
    }
    const rotated: Record<string, number> = {};
    sceneKeys.forEach((sceneKey, offset) => {
      const nextKey = sceneKeys[(activeIndex + offset) % sceneKeys.length];
      rotated[nextKey] = baseDurations[nextKey];
    });
    return rotated;
  }, [activeIndex, baseDurations, locked, sceneKeys]);

  const totalDuration = useMemo(
    () => Object.values(baseDurations).reduce((sum, value) => sum + value, 0),
    [baseDurations],
  );
  const activeStartTime = useMemo(
    () =>
      sceneKeys
        .slice(0, activeIndex)
        .reduce((sum, key) => sum + baseDurations[key], 0),
    [activeIndex, baseDurations, sceneKeys],
  );

  const onSceneChange = useCallback(
    (rawKey: string) => {
      const index = sceneKeys.indexOf(rawKey.replace(REPEAT_SUFFIX_RE, ''));
      if (index >= 0) setActiveIndex(index);
      setTick((value) => value + 1);
    },
    [sceneKeys],
  );

  const jumpTo = useCallback((index: number) => {
    setActiveIndex(index);
    setPaused(false);
    setMountKey((value) => value + 1);
    setTick((value) => value + 1);
  }, []);

  const toggleLock = useCallback(() => {
    setLocked((value) => !value);
    setPaused(false);
    setMountKey((value) => value + 1);
    setTick((value) => value + 1);
  }, []);

  return {
    sceneKeys,
    activeIndex,
    locked,
    paused,
    mountKey,
    tick,
    durations,
    activeDuration: baseDurations[sceneKeys[activeIndex]] ?? 0,
    activeStartTime,
    totalDuration,
    onSceneChange,
    jumpTo,
    toggleLock,
    togglePause: () => setPaused((value) => !value),
  };
}
