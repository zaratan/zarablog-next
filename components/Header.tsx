import Link from 'next/link';
import React, { useContext } from 'react';
import { isBrowser } from 'react-device-detect';
import { FaSun, FaMoon, FaUser, FaHome } from 'react-icons/fa';
import ThemeContext from '../contexts/ThemeContext';
import LayoutContext from '../contexts/LayoutContext';
import { useScroll } from '../hooks/useScroll';
import {
  generateHandleClick,
  generateHandleKeypress,
} from '../helpers/handlers';

import styles from './Header.module.scss';

const headerVisisble = (currentScroll, scrollingUp) =>
  currentScroll < 80 || scrollingUp;

const Header = () => {
  const { isDark, toggleDark } = useContext(ThemeContext);
  const { toggleProfileOpen, closeProfile } = useContext(LayoutContext);
  const actOnLightButton = () => {
    toggleDark();
  };

  const actOnProfileButton = () => {
    toggleProfileOpen();
  };

  const actOnHomeButton = () => {
    if (isBrowser) return;
    closeProfile();
  };

  const { currentScroll, scrollingUp } = useScroll();

  return (
    <header
      className={[
        styles.headerStyle,
        headerVisisble(currentScroll, scrollingUp) ? 'visible' : '',
      ].join(' ')}
    >
      <nav className={styles.circleContainer}>
        <Link href="/" passHref>
          <a
            className={styles.circleLink}
            aria-label="home"
            onClick={generateHandleClick(actOnHomeButton)}
            onKeyDown={generateHandleKeypress(actOnHomeButton)}
            role="button"
            tabIndex={0}
          >
            <span className={[styles.circle, styles.red].join(' ')}>
              <FaHome className={styles.icon} />
            </span>
          </a>
        </Link>
        <span
          tabIndex={0}
          role="button"
          className={styles.circleLink}
          aria-label="light"
          onClick={generateHandleClick(actOnLightButton)}
          onKeyDown={generateHandleKeypress(actOnLightButton)}
        >
          <span className={[styles.circle, styles.yellow].join(' ')}>
            {isDark ? (
              <FaSun className={styles.icon} />
            ) : (
              <FaMoon className={styles.icon} />
            )}
          </span>
        </span>
        <span
          tabIndex={0}
          role="button"
          className={styles.circleLink}
          aria-label="profile"
          onClick={generateHandleClick(actOnProfileButton)}
          onKeyDown={generateHandleKeypress(actOnProfileButton)}
        >
          <span className={[styles.circle, styles.green].join(' ')}>
            <FaUser className={styles.icon} />
          </span>
        </span>
      </nav>
      <h1 className={styles.siteTitle}>
        <Link href="/">
          <a>Zaratan@next</a>
        </Link>
      </h1>
      <span className={styles.emptyRight} />
    </header>
  );
};

export default Header;
