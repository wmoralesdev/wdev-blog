'use client';

import { FC, useRef } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { MusicalNoteIcon } from '@heroicons/react/20/solid';

const Player: FC = () => {
  const playerRef = useRef<YouTubePlayer>(null);

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(50);
    playerRef.current.playVideo();
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'GdzrrWA8e7A',
    },
  };

  return (
    <div className="fixed bottom-[100px] right-[100px] z-[991] flex items-center justify-center">
      <YouTube videoId="GdzrrWA8e7A" opts={opts} onReady={onReady} />
      <div className="absolute -z-10 size-12 rounded-full bg-solo blur" />
      <div className="absolute z-0 size-10 rounded-full bg-white" />
      <MusicalNoteIcon className="absolute z-10 size-5 text-primary" />
    </div>
  );
};

export default Player;
