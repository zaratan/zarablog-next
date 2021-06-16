/* eslint-disable react/jsx-props-no-spreading */
import fs from 'fs';
import Head from 'next/head';
import path from 'path';
import { GetStaticProps, GetStaticPaths } from 'next';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import remarkPrism from 'remark-prism';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import Youtube from '../components/Youtube';
import FileName from '../components/FileName';
import FooterArticle from '../components/FooterArticle';
import ArticleContainer from '../components/Article';
import { H2, H3, H4, H5 } from '../components/IdedHeaders';

export const getStaticPaths: GetStaticPaths = async ({
  locales,
  defaultLocale,
}) => {
  const paths = locales.reduce<
    Array<{ params: { slug: string }; locale: string }>
  >((result, locale) => {
    const postsDirectory =
      locale === defaultLocale
        ? path.join(process.cwd(), 'articles')
        : path.join(process.cwd(), 'articles', locale);
    const newFilenames = fs
      .readdirSync(postsDirectory)
      .filter((filename) => filename.includes('mdx'));
    const newPaths = newFilenames.map((filename) => ({
      params: { slug: filename.replace(/\.mdx$/, '') },
      locale,
    }));
    return [...result, ...newPaths];
  }, []);
  return {
    paths,
    fallback: false,
  };
};

const components = {
  Youtube,
  FileName,
  Image,
  FooterArticle,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  locale,
  defaultLocale,
}) => {
  const filePath =
    locale === defaultLocale
      ? path.join(process.cwd(), 'articles', `${slug}.mdx`)
      : path.join(process.cwd(), 'articles', locale, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [
        [
          remarkPrism,
          {
            plugins: ['prismjs/plugins/line-numbers/prism-line-numbers'],
          },
        ],
      ],
    },
    scope: data,
  });
  mdxSource.scope.date = mdxSource.scope.date.toString();
  return {
    props: {
      article: {
        mdx: mdxSource,
        data: {
          ...data,
          date: data.date.toString(),
          readingTime: Math.round(
            readingTime(fileContents, { wordsPerMinute: 100 }).minutes
          ),
        },
      },
      ...(await serverSideTranslations(locale, ['common', 'article'])),
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Article = ({ article }: { article?: { mdx: any; data: any } }) => {
  const title = `Zaratan@next: ${article.data.title}`;
  const { description } = article.data;
  return (
    <>
      <Head>
        <title>Zaratan@next: {article.data.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Layout>
        <ArticleContainer
          title={article.data.title}
          timeToRead={article.data.readingTime}
          date={article.data.date}
        >
          <MDXRemote {...article.mdx} components={components} />
        </ArticleContainer>
      </Layout>
    </>
  );
};
export default Article;
