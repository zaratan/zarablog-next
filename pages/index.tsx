import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import { sortBy } from 'lodash';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Layout from '../components/Layout';
import ArticleList from '../components/ArticleList';

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale,
}) => {
  const postsDirectory =
    locale === defaultLocale
      ? path.join(process.cwd(), 'articles')
      : path.join(process.cwd(), 'articles', locale);
  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.includes('mdx'));

  const unsortedArticles: Array<{
    date: Date;
    title: string;
    slug: string;
  }> = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      date: new Date(data.date),
      title: data.title,
      slug: filename.replace(/.mdx$/, ''),
    };
  });

  const articles = sortBy(
    unsortedArticles,
    (article) => -article.date.getTime()
  ).map((art) => ({
    slug: art.slug,
    date: format(art.date, 'd MMM yyyy', {
      locale: fr,
    }),
    title: art.title,
  }));

  return {
    props: {
      articles,
    },
  };
};

const description =
  'Blog personnel de Zaratan. Ce site me sert a poster mes opinions quand à la tech en général';
const title = 'Zaratan@next';

export default function Home({
  articles,
}: {
  articles: Array<{ title: string; date: string; slug: string }>;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Layout>
        <ArticleList articles={articles} />
      </Layout>
    </>
  );
}
