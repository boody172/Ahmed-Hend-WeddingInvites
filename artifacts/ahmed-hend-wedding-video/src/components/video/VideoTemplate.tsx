import {
  VideoCanvas,
  VideoPausedContext,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { Scene1Hero } from './video_scenes/Scene1Hero';
import { Scene2Verse } from './video_scenes/Scene2Verse';
import { Scene3Details } from './video_scenes/Scene3Details';
import { Scene4Closing } from './video_scenes/Scene4Closing';

export const SCENE_DURATIONS = {
  hero: 5000,
  verse: 6000,
  details: 5000,
  closing: 5000,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '9:16';

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hero: Scene1Hero,
  verse: Scene2Verse,
  details: Scene3Details,
  closing: Scene4Closing,
};

const SCENE_START_SEC = Object.entries(SCENE_DURATIONS).reduce(
  (result, [key, duration]) => {
    result.offsets[key] = result.total / 1000;
    result.total += duration;
    return result;
  },
  { offsets: {} as Record<string, number>, total: 0 },
).offsets;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    if (paused) {
      audio.pause();
      return;
    }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - targetTime) > 0.18) {
        audio.currentTime = targetTime;
      }
    }
    audio.play().catch(() => {});
  }, [baseSceneKey, currentSceneKey, muted, paused]);

  return (
    <VideoPausedContext.Provider value={paused}>
      <VideoCanvas
        aspectRatio={VIDEO_ASPECT_RATIO}
        style={{ backgroundColor: 'var(--color-bg-light)' }}
      >
      {/* Persistent Background Layer for Continuity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Animated ambient gradients that persist across scenes */}
        <motion.div
          className="absolute w-[150vw] h-[150vw] rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--color-primary)' }}
          animate={{
            x: sceneIndex === 0 ? '-20vw' : sceneIndex === 1 ? '10vw' : sceneIndex === 2 ? '-10vw' : '5vw',
            y: sceneIndex === 0 ? '10vh' : sceneIndex === 1 ? '-20vh' : sceneIndex === 2 ? '40vh' : '0vh',
            scale: sceneIndex === 0 ? 1 : sceneIndex === 1 ? 1.5 : sceneIndex === 2 ? 0.8 : 1.2,
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* mode="popLayout" = new snaps in while old animates out */}
      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
          preload="auto"
          autoPlay
          muted={muted}
        />
      </VideoCanvas>
    </VideoPausedContext.Provider>
  );
}
