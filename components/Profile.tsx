import React, { useContext } from 'react';
import { FaEnvelope, FaGithub, FaTwitter, FaMugHot } from 'react-icons/fa';
import Image from 'next/image';

import { ImTextWidth } from 'react-icons/im';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Profile.module.scss';
import PreferencesContext from '../contexts/PreferencesContext';
import Slider from './Slider';
import { useScroll } from '../hooks/useScroll';
import classCompactor from '../helpers/classCompator';
import { headerVisisble } from './Header';

const ImgProfilePic = () => (
  <div className={styles.pictureContainer}>
    <Image src="/profile.jpg" width="200" height="200" />
  </div>
);

const Profile = () => {
  const { wideCodeBlock, toggleWideCodeBlocks } = useContext(
    PreferencesContext
  );
  const { atTopScroll, scrollingUp } = useScroll();
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <div
      className={classCompactor([
        styles.profileContainer,
        headerVisisble(atTopScroll, scrollingUp) ? styles.headerVisible : '',
      ])}
    >
      <ImgProfilePic />
      <header>
        <h1>Zaratan</h1>
        <h3>{t('subtitle')}</h3>
        <p>{t('description')}</p>
      </header>
      <section>
        <h2>{t('contact')}</h2>
        <ul>
          <li>
            <FaEnvelope />
            <span className={styles.space} />
            <a
              href="mailto:zaratan@hey.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              zaratan@hey.com
            </a>
          </li>
          <li>
            <FaGithub />
            <span className={styles.space} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/zaratan"
            >
              zaratan
            </a>
          </li>
          <li>
            <FaTwitter />
            <span className={styles.space} />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/zaratan"
            >
              @zaratan
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>{t('support')}</h2>
        <ul>
          <li>
            <FaMugHot />
            <span className={styles.space} />
            <a
              href="https://ko-fi.com/zaratan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ko-Fi
            </a>
          </li>
        </ul>
      </section>
      <section>
        <h2>Options</h2>
        <ul>
          <li>
            <ImTextWidth />
            <span className={styles.space} />
            <span>
              {t('options.large-block')}
              <Slider active={wideCodeBlock} action={toggleWideCodeBlocks} />
            </span>
          </li>
          <li>
            <Link
              href={router.asPath}
              locale={router.locale === 'fr' ? 'en' : 'fr'}
            >
              <a>{t('options.language')}</a>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
