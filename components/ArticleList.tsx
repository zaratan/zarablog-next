import Link from 'next/link';
import React, { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';

import styles from './ArticleList.module.scss';
import { DateTag, TitleTag } from './Tag';

const ArticleList = ({
  articles,
}: {
  articles: Array<{ title: string; date: string; slug: string }>;
}) => {
  const { isProfileOpen } = useContext(LayoutContext);
  const profileOpenClass = isProfileOpen ? 'profile-open' : '';
  return (
    <ul className={styles.titleList}>
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/${article.slug}`}>
            <a className={[styles.titleItem, profileOpenClass].join(' ')}>
              <DateTag>{article.date}</DateTag>
              <TitleTag>{article.title}</TitleTag>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
