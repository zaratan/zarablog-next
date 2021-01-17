import Link from 'next/link';
import React, { useContext } from 'react';
import { isBrowser } from 'react-device-detect';
import { FaSun, FaMoon, FaUser, FaHome } from 'react-icons/fa';
import { ImTextWidth } from 'react-icons/im';
import ThemeContext from '../contexts/ThemeContext';
import LayoutContext from '../contexts/LayoutContext';
import { useScroll } from '../hooks/useScroll';
import {
  generateHandleClick,
  generateHandleKeypress,
} from '../helpers/handlers';

import styles from './Header.module.scss';
import PreferencesContext from '../contexts/PreferencesContext';
import classCompactor from '../helpers/classCompator';

export const headerVisisble = (currentScroll, scrollingUp) =>
  currentScroll < 80 || scrollingUp;

const Header = () => {
  const { isDark, toggleDark } = useContext(ThemeContext);
  const { toggleProfileOpen, closeProfile } = useContext(LayoutContext);
  const { toggleWideCodeBlocks, wideCodeBlock } = useContext(
    PreferencesContext
  );
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
              <FaHome className={[styles.icon, 'svg-inline--fa'].join(' ')} />
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
              <FaSun className={[styles.icon, 'svg-inline--fa'].join(' ')} />
            ) : (
              <FaMoon className={[styles.icon, 'svg-inline--fa'].join(' ')} />
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
            <FaUser
              className={[styles.icon, 'svg-inline--fa', 'fa-w-14'].join(' ')}
            />
          </span>
        </span>
      </nav>
      <h1 className={styles.siteTitle}>
        <Link href="/">
          <a>Zaratan@next</a>
        </Link>
      </h1>
      <span className={styles.rightElems}>
        <span
          tabIndex={0}
          role="button"
          aria-label="Toggle wide code blocks"
          className={wideCodeBlock ? styles.rightIconActive : ''}
          onClick={generateHandleClick(toggleWideCodeBlocks)}
          onKeyDown={generateHandleKeypress(toggleWideCodeBlocks)}
        >
          <ImTextWidth className={styles.rightIcon} />
        </span>
      </span>
    </header>
  );
};

export default Header;
