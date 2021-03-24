/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import 'lite-youtube-embed/src/lite-yt-embed.css';

const Youtube = ({ videoId }) => {
  useEffect(() => {
    import('lite-youtube-embed/src/lite-yt-embed');
  }, []);

  return <lite-youtube videoId={videoId} />;
};

const YoutubeWrap = ({ videoId }) => <Youtube videoId={videoId} />;
export default YoutubeWrap;
