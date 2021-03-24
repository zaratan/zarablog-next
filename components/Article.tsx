import React, { ReactNode, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fr from 'date-fns/locale/fr';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LayoutContext from '../contexts/LayoutContext';
import styles from './Article.module.scss';
import PreferencesContext from '../contexts/PreferencesContext';
import classCompactor from '../helpers/classCompator';

const Article = ({
  children,
  timeToRead,
  title,
  date,
}: {
  children: ReactNode;
  timeToRead: number;
  title: string;
  date: Date;
}) => {
  const { isProfileOpen } = useContext(LayoutContext);
  const { wideCodeBlock } = useContext(PreferencesContext);
  const router = useRouter();
  const profileOpenClass = isProfileOpen ? 'profile-open' : '';
  const wideCodeBlockClass = wideCodeBlock ? 'wide-code-block' : '';
  const { t } = useTranslation('article');
  return (
    <>
      <header className={styles.articleHeader}>
        <h1 className={styles.title}>{title}</h1>
        <section className={[styles.articleInfos, profileOpenClass].join(' ')}>
          <em className={[styles.articleInfo, profileOpenClass].join(' ')}>
            {t('head.read-time')}
            <span className={styles.highlight}>{timeToRead} minutes</span>
          </em>
          <em className={[styles.articleInfo, profileOpenClass].join(' ')}>
            {t('head.ago')}
            <span className={styles.highlight}>
              {t('head.time', {
                time:
                  router.locale === 'fr'
                    ? formatDistanceToNow(new Date(date), { locale: fr })
                    : formatDistanceToNow(new Date(date)),
              })}
            </span>
          </em>
        </section>
      </header>
      <article
        className={classCompactor([
          styles.articleContainer,
          profileOpenClass,
          wideCodeBlockClass,
          'line-numbers',
        ])}
      >
        {children}
      </article>
    </>
  );
};

export default Article;
