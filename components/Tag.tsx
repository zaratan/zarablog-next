import React, { ReactNode, useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';

import styles from './Tag.module.scss';

const Tag = ({
  children,
  type,
  tags = [],
}: {
  children: ReactNode;
  type: string;
  tags?: Array<{ key: string; value: string }>;
}) => {
  const { isProfileOpen } = useContext(LayoutContext);
  const profileOpenClass = isProfileOpen ? 'profile-open' : '';
  return (
    <span className={[styles.indentSpan, profileOpenClass].join(' ')}>
      <span className={[styles.tagSpan, profileOpenClass].join(' ')}>
        {'<'}
        <span className={styles.magenta}>{`${type}${
          tags.length > 0 ? ' ' : ''
        }`}</span>
        {tags.map((tag) => {
          const { key, value } = tag;
          return (
            <span key={key}>
              <span className={styles.cyan}>{key}</span>=
              <span className={styles.yellow}>"{value}"</span>
            </span>
          );
        })}
        {'>'}
      </span>
      <span className={[styles.contentSpan, profileOpenClass].join(' ')}>
        {children}
      </span>
      <span className={[styles.tagSpan, profileOpenClass].join(' ')}>
        {'</'}
        <span className={styles.magenta}>{type}</span>
        {'>'}
      </span>
    </span>
  );
};

export const DateTag = ({ children }: { children: ReactNode }) => (
  <Tag type="p" tags={[{ key: 'class', value: 'date' }]}>
    {children}
  </Tag>
);

export const TitleTag = ({ children }: { children: ReactNode }) => (
  <Tag type="title">{children}</Tag>
);

export default Tag;
