import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next';
import classes from './NotFoundBody.module.scss';

const LANG_MAPPING = {
  fr: 'Français',
  en: 'English',
};

const NotFoundBody = ({ pathsLocales }: { pathsLocales: any }) => {
  const router = useRouter();
  const currentPath = router.asPath.replace(/^.*\//, '');
  const otherLangExist = pathsLocales[`${currentPath}.mdx`] || [];

  const { t } = useTranslation('404');

  return (
    <div className={classes.container}>
      <h1>{t('title')}</h1>
      <p>
        {t('explanation')}
        <a
          href="https://github.com/zaratan/zarablog-next/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('github-issue')}
        </a>
        .
      </p>
      {otherLangExist.length === 0 ? null : (
        <ul>
          {t('however', { count: otherLangExist.length })}
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
          <a>{t('home')}</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFoundBody;
