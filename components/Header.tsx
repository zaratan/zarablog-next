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

export const headerVisisble = (atTopScroll, scrollingUp) =>
  atTopScroll || scrollingUp;

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

  const { scrollingUp, atTopScroll } = useScroll();

  return (
    <header
      className={[
        styles.headerStyle,
        headerVisisble(atTopScroll, scrollingUp) ? 'visible' : '',
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
            <span className={classCompactor([styles.circle, styles.red])}>
              <FaHome
                className={classCompactor([styles.icon, 'svg-inline--fa'])}
              />
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
              <FaSun
                className={classCompactor([styles.icon, 'svg-inline--fa'])}
              />
            ) : (
              <FaMoon
                className={classCompactor([styles.icon, 'svg-inline--fa'])}
              />
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
          <span className={classCompactor([styles.circle, styles.green])}>
            <FaUser
              className={classCompactor([
                styles.icon,
                'svg-inline--fa',
                'fa-w-14',
              ])}
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
