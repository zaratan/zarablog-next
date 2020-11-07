import { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';

const useWatchFont = (fontName: string) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const InconsolataObserver = new FontFaceObserver(fontName);
    InconsolataObserver.load().then(() => setFontLoaded(true));
  }, [fontName]);

  return fontLoaded;
};

export default useWatchFont;
