import React, { useEffect } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import YoutubeErrorCatcher from './YoutubeErrorCatcher';

// eslint-disable-next-line react/prop-types
const YoutubeWrap = ({ videoId }) => {
  useEffect(() => {
    import('lite-youtube-embed/src/lite-yt-embed');
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <YoutubeErrorCatcher videoId={videoId}>
      <lite-youtube videoId={videoId} />
    </YoutubeErrorCatcher>
  );
};

export default YoutubeWrap;
