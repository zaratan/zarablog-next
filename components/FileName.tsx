import { setMaxListeners } from 'process';
import React, { useContext } from 'react';
import LayoutContext from '../contexts/LayoutContext';
import PreferencesContext from '../contexts/PreferencesContext';
import classCompactor from '../helpers/classCompator';
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
  const { isProfileOpen } = useContext(LayoutContext);
  const { wideCodeBlock } = useContext(PreferencesContext);
  const profileOpenClass = isProfileOpen ? 'profile-open' : '';
  const wideCodeBlockClass = wideCodeBlock ? 'wide-code-block' : '';

  if (blogGithub) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const [_match, startLine, _endlinePres, endLine] = /(\d+)(-(\d+))?/.exec(
      line || ''
    ) || [null, null, null, null];
    return (
      <a
        className={classCompactor([
          styles.fileName,
          profileOpenClass,
          wideCodeBlockClass,
        ])}
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
        className={classCompactor([
          styles.fileName,
          profileOpenClass,
          wideCodeBlockClass,
        ])}
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
    <span
      className={classCompactor([
        styles.fileName,
        profileOpenClass,
        wideCodeBlockClass,
      ])}
    >
      {filename}
      {line ? `:${line}` : ''}
    </span>
  );
};

export default FileName;
