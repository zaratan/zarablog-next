import { setMaxListeners } from 'process';
import React from 'react';
import styles from './FileName.module.scss';

const FileName = ({
  filename,
  line,
  blogGithub,
}: {
  filename: string;
  line?: string;
  blogGithub?: boolean;
}) => {
  if (blogGithub) {
    return (
      <a
        className={styles.fileName}
        href={`https://github.com/zaratan/zarablog-next/blob/main/${filename}${
          line ? `#L${line}` : ''
        }`}
      >
        {filename}:{line}
      </a>
    );
  }
  return (
    <span className={styles.fileName}>
      {filename}:{line}
    </span>
  );
};

export default FileName;
