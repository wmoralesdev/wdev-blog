'use client';

import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import createGlobe from 'cobe';
import { FC, useEffect, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

const Cobe: FC = () => {
  const pause = useRef(false);
  const pointerInteractionMovement = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);

  const [pauseState, setPauseState] = useState(false);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 1,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 10000,
      mapBrightness: 6,
      mapBaseBrightness: 0,
      baseColor: [1, 1, 1],
      markerColor: [107 / 255, 36 / 255, 229 / 255],
      glowColor: [1.2, 1.2, 1.2],
      opacity: 0.9,
      markers: [
        {
          location: [13.6814979, -89.2658371],
          size: 0.1,
        },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current && !pause.current) {
          phi += 0.0015;
        }

        const updatedState = {
          ...state,
          phi: phi + r.get(),
          width: width * 2,
          height: width * 2,
        };

        Object.assign(state, updatedState);
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [r]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          aspectRatio: 1,
          margin: 'auto',
          position: 'relative',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current!.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 200,
              });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 100,
              });
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout paint size',
            opacity: 0,
            transition: 'opacity 1s ease',
          }}
        />
      </div>
      <div className="inline-flex w-full items-center justify-center gap-4">
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center rounded-full bg-white hover:scale-110"
          onClick={() => {
            pause.current = !pause.current;
            setPauseState(pause.current);
          }}
        >
          {pauseState ? (
            <PlayIcon className="size-4 text-primary" />
          ) : (
            <StopIcon className="size-4 text-primary" />
          )}
          <span className="sr-only">Toggle rotation</span>
        </button>
      </div>
    </div>
  );
};

export default Cobe;
