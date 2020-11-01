import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import Layout from '../components/Layout';

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(postsDirectory);
  return {
    paths: [
      { params: { slug: 'sql' } }, // See the "paths" section below
    ],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const postsDirectory = path.join(process.cwd(), 'articles');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const val = await renderToString(fileContents);
  return {
    props: {
      articleText: val,
    },
  };
};

const Article = () => <Layout>LOL</Layout>;

export default Article;
