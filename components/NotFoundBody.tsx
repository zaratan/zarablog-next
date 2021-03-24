import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import classes from './NotFoundBody.module.scss';

const LANG_MAPPING = {
  fr: 'Français',
  en: 'English',
};

const NotFoundBody = ({ pathsLocales }: { pathsLocales: any }) => {
  const router = useRouter();
  const currentPath = router.asPath.replace(/^.*\//, '');
  console.log({ currentPath });
  const otherLangExist = pathsLocales[`${currentPath}.mdx`] || [];

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
        <ul>
          However this article already exists in{' '}
          {otherLangExist.length === 1 ? 'an' : ''}other language
          {otherLangExist.length === 1 ? '' : 's'}:{' '}
          {otherLangExist.map((otherLang, i) => (
            <li key={`${currentPath}-${otherLang}`}>
              <Link href={`/${currentPath}`} locale={otherLang}>
                <a>{LANG_MAPPING[otherLang]}</a>
              </Link>
              {i === otherLangExist.length - 1 ? '.' : ', '}
            </li>
          ))}
        </ul>
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
