import { setMaxListeners } from 'process';
import React from 'react';
import styles from './FileName.module.scss';

type FileType = { filename: string; line?: string } & (
  | {
      blogGithub?: false | undefined;
      external: false | undefined;
      baseUrl: undefined;
    }
  | { blogGithub: true; external: false | undefined; baseUrl: undefined }
  | { blogGithub?: false | undefined; external: true; baseUrl: string }
);

const FileName = ({
  filename,
  line,
  blogGithub,
  external,
  baseUrl,
}: FileType) => {
  if (blogGithub) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [_match, startLine, _endlinePres, endLine] = /(\d+)(-(\d+))?/.exec(
      line || ''
    ) || [null, null, null, null];
    return (
      <a
        className={styles.fileName}
        href={`https://github.com/zaratan/zarablog-next/blob/main/${filename}${
          startLine ? `#L${startLine}${endLine ? `-L${endLine}` : ''}` : ''
        }`}
      >
        {filename}
        {line ? `:${line}` : ''}
      </a>
    );
  }
  if (external) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [_match, startLine, _endlinePres, endLine] = /(\d+)(-(\d+))?/.exec(
      line || ''
    ) || [null, null, null, null];
    return (
      <a
        className={styles.fileName}
        href={`${baseUrl}${filename}${
          startLine ? `#L${startLine}${endLine ? `-L${endLine}` : ''}` : ''
        }`}
      >
        {filename}
        {line ? `:${line}` : ''}
      </a>
    );
  }
  return (
    <span className={styles.fileName}>
      {filename}
      {line ? `:${line}` : ''}
    </span>
  );
};

export default FileName;
