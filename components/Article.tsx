import React, { ReactNode, useContext } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';
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
  const profileOpenClass = isProfileOpen ? 'profile-open' : '';
  const wideCodeBlockClass = wideCodeBlock ? 'wide-code-block' : '';
  return (
    <>
      <header className={styles.articleHeader}>
        <h1 className={styles.title}>{title}</h1>
        <section className={[styles.articleInfos, profileOpenClass].join(' ')}>
          <em className={[styles.articleInfo, profileOpenClass].join(' ')}>
            Temps de lecture:{' '}
            <span className={styles.highlight}>{timeToRead} minutes</span>
          </em>
          <em className={[styles.articleInfo, profileOpenClass].join(' ')}>
            Il y a:{' '}
            <span className={styles.highlight}>
              {formatDistanceToNow(new Date(date), { locale: fr })}
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
