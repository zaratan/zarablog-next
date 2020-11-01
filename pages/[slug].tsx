import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { MDXProvider } from '@mdx-js/react';
import readingTime from 'reading-time';
import rehypePrism from '@mapbox/rehype-prism';
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
  FileName,
  Youtube,
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const filePath = path.join(process.cwd(), 'articles', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);
  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      rehypePlugins: [rehypePrism],
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

const Article = ({ article }: { article: { mdx: any; data: any } }) => {
  const content = hydrate(article.mdx, {
    components,
  });
  return (
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
  );
};
export default Article;
