'use client'

import React, { useEffect } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const PlyrVideoComponent = ({ videoId }: { videoId: string }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const player = new Plyr('#player', {
        controls: [
          'play', 'pause', 'rewind', 'duration', 'fast-forward', 'volume', 'captions', 'current-time', 'play-large', 'restart'
        ],
        settings: [],
        fullscreen: { enabled: true, fallback: true, iosNative: true },
      });

      const hideYouTubeButtons = () => {
        const style = document.createElement('style');
        style.innerHTML = `
          #player iframe {
            pointer-events: none;
          }
          #player iframe::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 9999;
            pointer-events: auto;
          }
          .ytp-button.ytp-share-button,
          .ytp-button.ytp-watch-later-button,
          .ytp-button.ytp-copylink-button,
          .ytp-button.ytp-search-button,
          .ytp-button.ytp-cards-button,
          .ytp-button.ytp-overflow-button {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      };

      hideYouTubeButtons();

      return () => {
        player.destroy();
        const style = document.querySelector('style');
        if (style) {
          document.head.removeChild(style);
        }
      };
    }
  }, [videoId]);

  return (
    <div className="plyr__video-embed" style={{ width: '800px', height: '450px', position: 'relative' }} id="player">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&modestbranding=1&showinfo=0&iv_load_policy=3&rel=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default PlyrVideoComponent;
