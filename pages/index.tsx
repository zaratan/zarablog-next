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

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);

  const unsortedArticles = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      date: data.date,
      title: data.title,
      slug: filename.replace(/.mdx$/, ''),
    };
  });

  const articles = sortBy(unsortedArticles, ['date'])
    .reverse()
    .map((art) => ({
      slug: art.slug,
      date: format(new Date(art.date), 'd MMM yyyy', {
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

export default function Home({
  articles,
}: {
  articles: Array<{ title: string; date: string; slug: string }>;
}) {
  return (
    <>
      <Head>
        <title>Zaratan@next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ArticleList articles={articles} />
      </Layout>
    </>
  );
}
