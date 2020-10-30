import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zaratan@next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>TEST</Layout>
    </div>
  );
}
