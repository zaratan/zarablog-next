/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

// Watch scroll updates on the page
//
// Returns:
// - currentScroll: Px since top of page (integer)
// - scrollingUp: is the user scrollingUp (boolean)
//
// Props:
// - wait: number of ms to wait before firing next update. Default 200
// - onScroll: callback function to call on each scroll.
export const useScroll = ({
  wait = 100,
  onScroll = () => {},
}: {
  wait?: number;
  onScroll?: ({
    prevScroll,
    nextScroll,
  }: {
    prevScroll: number;
    nextScroll: number;
  }) => void;
} = {}) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  useEffect(() => {
    // Vars
    let prevScroll = window.pageYOffset;

    // Watcher
    const scrollWatcher = throttle(() => {
      const nextScroll = window.pageYOffset;
      // Don't fire on identical scroll
      if (prevScroll === nextScroll) return;
      // If toWait is really low don't fire more often than
      // browser re-rendering
      window.requestAnimationFrame(function () {
        // Action
        onScroll({ prevScroll, nextScroll });
        // Update state
        setCurrentScroll(nextScroll);
        setScrollingUp(nextScroll < prevScroll);
        // Update prev scroll value
        prevScroll = nextScroll;
      });
    }, wait);

    // Listener register
    window.addEventListener('scroll', scrollWatcher);

    // Clean
    return () => {
      window.removeEventListener('scroll', scrollWatcher);
      scrollWatcher.cancel();
    };
  }, [wait]);
  return { currentScroll, scrollingUp };
};
