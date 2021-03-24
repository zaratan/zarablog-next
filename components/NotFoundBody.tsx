import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import classes from './NotFoundBody.module.scss';

const LANG_MAPPING = {
  fr: 'Français',
  en: 'English',
};

const NotFoundBody = ({ pathsLocales }: { pathsLocales: any }) => {
  const [otherLangExist, setOtherLangExist] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const endPath = window.location.href.replace(/^.*\//, '');
    setCurrentPath(endPath);
    setOtherLangExist(pathsLocales[`${endPath}.mdx`] || []);
  }, [pathsLocales]);

  return (
    <div className={classes.container}>
      <h1>This page doesn't exist</h1>
      <p>
        Your article might not have been translated yet. If you would like to
        request a translation, please add an issue here:{' '}
        <a
          href="https://github.com/zaratan/zarablog-next/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Issue
        </a>
        .
      </p>
      {otherLangExist.length === 0 ? null : (
        <p>
          However this article already exists in{' '}
          {otherLangExist.length === 1 ? 'an' : ''}other language
          {otherLangExist.length === 1 ? '' : 's'}:{' '}
          {otherLangExist.map((otherLang, i) => (
            <>
              <Link
                href={currentPath}
                key={`${currentPath}-${otherLang}`}
                locale={otherLang}
              >
                <a>{LANG_MAPPING[otherLang]}</a>
              </Link>
              {i === otherLangExist.length - 1 ? '.' : ', '}
            </>
          ))}
        </p>
      )}
      <p>
        <Link href="/">
          <a>Go to home</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFoundBody;
