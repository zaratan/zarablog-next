import { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';

const useWatchFont = (fontName: string) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const fontObserver = new FontFaceObserver(fontName);
    fontObserver.load().then(() => setFontLoaded(true));
  }, [fontName]);

  return fontLoaded;
};

export default useWatchFont;
