import fs from 'fs';
import Head from 'next/head';
import path from 'path';
import { GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { MDXProvider } from '@mdx-js/react';
import readingTime from 'reading-time';
import remarkPrism from 'remark-prism';
import Layout from '../components/Layout';
import Youtube from '../components/Youtube';
import FileName from '../components/FileName';
import ArticleContainer from '../components/Article';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);
  return {
    paths: filenames.map(
      (filename) => ({ params: { slug: filename.replace(/\.mdx$/, '') } }) // See the "paths" section below
    ),
    fallback: false,
  };
}

const components = {
  Youtube,
  FileName,
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const filePath = path.join(process.cwd(), 'articles', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const mdxSource = await renderToString(content, {
    components,
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
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Article = ({ article }: { article: { mdx: any; data: any } }) => {
  const content = hydrate(article.mdx, {
    components,
  });
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
        <MDXProvider>
          <ArticleContainer
            title={article.data.title}
            timeToRead={article.data.readingTime}
            date={article.data.date}
          >
            {content}
          </ArticleContainer>
        </MDXProvider>
      </Layout>
    </>
  );
};
export default Article;
