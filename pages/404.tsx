/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from 'next/head';
import React from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import NotFoundBody from '../components/NotFoundBody';

export const getStaticProps: GetStaticProps = async ({
  locales,
  locale,
  defaultLocale,
}) => {
  const localesPaths = locales.reduce<
    Array<{ locale: string; filenames: Array<string> }>
  >((res, newLocale) => {
    const postsDirectory =
      newLocale === defaultLocale
        ? path.join(process.cwd(), 'articles')
        : path.join(process.cwd(), 'articles', newLocale);
    const filenames = fs
      .readdirSync(postsDirectory)
      .filter((filename) => filename.includes('mdx'));

    return [...res, { locale: newLocale, filenames }];
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
      ...(await serverSideTranslations(locale, ['common', '404'])),
    },
  };
};

const NotFound = ({ pathsLocales }: { pathsLocales: any }) => (
  <>
    <Head>
      <Head>
        <title>Zaratan@next - 404</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Head>
    <Layout centered>
      <NotFoundBody pathsLocales={pathsLocales} />
    </Layout>
  </>
);

export default NotFound;
