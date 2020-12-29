/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import YoutubeErrorCatcher from './YoutubeErrorCatcher';

const Youtube = ({ videoId }) => {
  useEffect(() => {
    import('lite-youtube-embed/src/lite-yt-embed');
  }, []);

  return <lite-youtube videoId={videoId} />;
};

const YoutubeWrap = ({ videoId }) => (
  <YoutubeErrorCatcher videoId={videoId}>
    <Youtube videoId={videoId} />
  </YoutubeErrorCatcher>
);
export default YoutubeWrap;
