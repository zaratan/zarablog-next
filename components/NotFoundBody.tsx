import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import classes from './NotFoundBody.module.scss';

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
      <h1>This page doesn't exist.</h1>
      {otherLangExist.length === 0 ? null : (
        <p>
          But it exists in other languages:{' '}
          {otherLangExist.map((otherLang) => (
            <Link href={currentPath} locale={otherLang}>
              <a>{otherLang}</a>
            </Link>
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
