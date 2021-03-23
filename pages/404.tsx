import Head from 'next/head';
import React from 'react';
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';
import Layout from '../components/Layout';
import NotFoundBody from '../components/NotFoundBody';

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
