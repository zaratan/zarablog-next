import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import Layout from '../components/Layout';

export const getStaticProps: GetStaticProps = async ({
  locales,
  defaultLocale,
}) => {
  const localesPaths = locales.reduce<
    Array<{ locale: string; filenames: Array<string> }>
  >((res, locale) => {
    const postsDirectory =
      locale === defaultLocale
        ? path.join(process.cwd(), 'articles')
        : path.join(process.cwd(), 'articles', locale);
    const filenames = fs
      .readdirSync(postsDirectory)
      .filter((filename) => filename.includes('mdx'));

    return [...res, { locale, filenames }];
  }, []);

  const pathsLocales = localesPaths.reduce<any>((res, localePaths) => {
    localePaths.filenames.forEach((filename) => {
      res[filename] = res[filename]
        ? [...res[filename], localePaths.locale]
        : [localePaths.locale];
    });
    return res;
  }, {});

  return {
    props: {
      pathsLocales,
    },
  };
};

const NotFound = ({ pathsLocales }: { pathsLocales: any }) => {
  const router = useRouter();

  const [otherLangExist, setOtherLangExist] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const endPath = window.location.href.replace(/^.*\//, '');
    console.log({ pathsLocales });
    setCurrentPath(endPath);
    setOtherLangExist(pathsLocales[`${endPath}.mdx`] || []);
  }, []);

  return (
    <>
      <Head>
        <Head>
          <title>Zaratan@next - 404</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Head>
      <Layout>
        <h1>This page doesn't exist</h1>
        <p>
          But it exists in other languages:{' '}
          {otherLangExist.map((otherLang) => (
            <Link href={currentPath} locale={otherLang}>
              <a>{otherLang}</a>
            </Link>
          ))}
          <Link href="/">
            <a>Go to home</a>
          </Link>
        </p>
      </Layout>
    </>
  );
};

export default NotFound;
