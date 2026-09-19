import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  Repeat,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  hero: { title: 'Opening', filePath: 'src/components/video/video_scenes/Scene1Hero.tsx' },
  verse: { title: 'Quranic Verse', filePath: 'src/components/video/video_scenes/Scene2Verse.tsx' },
  details: { title: 'Wedding Details', filePath: 'src/components/video/video_scenes/Scene3Details.tsx' },
  closing: { title: 'Closing', filePath: 'src/components/video/video_scenes/Scene4Closing.tsx' },
};

function formatTime(durationMs: number) {
  const seconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function PlaybackStatus({
  sceneKeys,
  activeIndex,
  activeDuration,
  activeStartTime,
  totalDuration,
  tick,
  paused,
  onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    const interval = window.setInterval(() => {
      setElapsed(elapsedBaseRef.current + performance.now() - startedAt);
    }, 60);
    return () => {
      window.clearInterval(interval);
      elapsedBaseRef.current += performance.now() - startedAt;
    };
  }, [paused, tick]);

  const progress = activeDuration ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(
    totalDuration,
    activeStartTime + Math.min(elapsed, activeDuration),
  );

  return (
    <>
      <div className="flex flex-1 items-center gap-1.5">
        {sceneKeys.map((key, index) => (
          <button
            key={key}
            type="button"
            onClick={() => onJumpTo(index)}
            className="relative h-3 min-h-3 flex-1 overflow-hidden rounded-full bg-white/20 transition-all hover:h-4"
            aria-label={`Jump to scene ${index + 1}`}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white/90"
              style={{
                width: `${index === activeIndex ? progress * 100 : 0}%`,
              }}
            />
          </button>
        ))}
      </div>
      <span className="shrink-0 font-mono text-lg text-white/70">
        {activeIndex + 1}/{sceneKeys.length}
      </span>
      <span className="min-w-[9ch] shrink-0 text-right font-mono text-lg text-white/80">
        {formatTime(totalElapsed)} / {formatTime(totalDuration)}
      </span>
    </>
  );
}

export default function VideoWithControls() {
  const isIframed =
    typeof window !== 'undefined' && window.self !== window.top;
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);
  const sensorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!controls.paused) return;
    const animations = document
      .getAnimations()
      .filter((animation) => animation.playState === 'running');
    animations.forEach((animation) => animation.pause());
    return () => animations.forEach((animation) => animation.play());
  }, [controls.paused]);

  const handleJumpTo = useCallback(
    (index: number) => {
      controls.jumpTo(index);
      const key = controls.sceneKeys[index];
      const details = SCENE_DETAILS[key];
      if (!details) return;
      window.parent.postMessage(
        {
          type: 'REPLIT_VIDEO_SCENE_SELECTED',
          payload: {
            sceneIndex: index,
            sceneCount: controls.sceneKeys.length,
            sceneTitle: details.title,
            filePath: details.filePath,
            lineNumber: 1,
          },
        },
        '*',
      );
    },
    [controls],
  );

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  };
  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  };

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.pointerType !== 'mouse' &&
        sensorRef.current &&
        !sensorRef.current.contains(event.target as Node)
      ) {
        setTapPinned(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [collapsed, tapPinned]);

  if (!isIframed) return <VideoTemplate />;

  const visible = !collapsed || hovering || tapPinned;
  const buttonClass =
    'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white';

  return (
    <div className="relative h-screen w-full">
      <VideoTemplate
        key={controls.mountKey}
        durations={controls.durations}
        paused={controls.paused}
        muted={muted}
        onSceneChange={controls.onSceneChange}
      />
      <div
        ref={sensorRef}
        className="absolute inset-x-0 bottom-0 z-50 flex h-1/4 flex-col justify-end"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
        }}
      >
        <div className="flex-1" />
        <div
          className={`flex items-center gap-3 bg-black/55 px-4 py-3 backdrop-blur-md transition-all ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <button
            type="button"
            className={buttonClass}
            onClick={controls.togglePause}
            aria-label={controls.paused ? 'Play' : 'Pause'}
          >
            {controls.paused ? <Play /> : <Pause />}
          </button>
          <button
            type="button"
            className={`${buttonClass} ${controls.locked ? 'bg-white/15 text-white' : ''}`}
            onClick={controls.toggleLock}
            aria-label="Loop current scene"
            aria-pressed={controls.locked}
          >
            <Repeat />
          </button>
          <button
            type="button"
            className={buttonClass}
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          <div className="h-10 w-px bg-white/15" />
          <PlaybackStatus
            sceneKeys={controls.sceneKeys}
            activeIndex={controls.activeIndex}
            activeDuration={controls.activeDuration}
            activeStartTime={controls.activeStartTime}
            totalDuration={controls.totalDuration}
            tick={controls.tick}
            paused={controls.paused}
            onJumpTo={handleJumpTo}
          />
          <button
            type="button"
            className={buttonClass}
            onClick={() => {
              setCollapsed((value) => !value);
              setHovering(false);
              setTapPinned(false);
            }}
            aria-label={collapsed ? 'Show controls' : 'Hide controls'}
          >
            {collapsed ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
    </div>
  );
}
