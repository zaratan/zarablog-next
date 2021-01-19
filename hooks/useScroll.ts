/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useMemo, useState } from 'react';
import throttle from 'lodash/throttle';

/**
 * Hook made for watching the state of scrolling from the user
 *
 * @param options.wait - number of ms to wait before firing next update. Default 200
 * @param options.top - distance to the top where it is considered to be the top of the page. Default 80
 * @param options.onScroll = callback function to be called on each tick of scroll
 *
 * @returns {
 *   scrollingUp: is the user scrolling up
 *   atTopScroll: is the user at the top of the page
 * }
 */
export const useScroll = ({
  wait = 100,
  top = 80,
  onScroll = () => {},
}: {
  wait?: number;
  top?: number;
  onScroll?: ({
    prevScroll,
    nextScroll,
  }: {
    prevScroll: number;
    nextScroll: number;
  }) => void;
} = {}): { scrollingUp: boolean; atTopScroll: boolean } => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [atTopScroll, setAtTopScroll] = useState(true);

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
        setScrollingUp(nextScroll < prevScroll);
        setAtTopScroll(nextScroll < top);
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
  return {
    scrollingUp,
    atTopScroll,
  };
};

/**
 * Hook made for watching the state of scrolling from the user.
 * Same as useScroll but with current scroll level.
 *
 * @remarks
 * BE CAREFUL, this will cause re-renderings.
 *
 * @param options.wait - number of ms to wait before firing next update. Default 200
 * @param options.top - distance to the top where it is considered to be the top of the page. Default 80
 * @param options.onScroll = callback function to be called on each tick of scroll
 *
 * @returns {
 *
 *   scrollingUp: is the user scrolling up
 *   atTopScroll: is the user at the top of the page
 * }
 */
export const useScrollWithValue = ({
  wait = 100,
  top = 80,
  onScroll = () => {},
}: {
  wait?: number;
  top?: number;
  onScroll?: ({
    prevScroll,
    nextScroll,
  }: {
    prevScroll: number;
    nextScroll: number;
  }) => void;
} = {}) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [scrollingUpTmp, setScrollingUp] = useState(false);
  const [atTopScrollTmp, setAtTopScroll] = useState(true);

  const scrollingUp = useMemo(() => scrollingUpTmp, [scrollingUpTmp]);
  const atTopScroll = useMemo(() => atTopScrollTmp, [atTopScrollTmp]);

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
        setAtTopScroll(nextScroll < top);
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
  return {
    currentScroll,
    scrollingUp,
    atTopScroll,
  };
};
