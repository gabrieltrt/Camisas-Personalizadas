import { NextPage } from 'next';
// components
import Landing from 'modules/index/components/Landing';
import Depoiments from 'modules/index/components/Depositions';
import Statistics from 'modules/index/components/Statistics';
import Footer from 'common/components/Footer';

import Head from 'next/head';

const Home: NextPage = () => {
  
  return (
    <main className="mt-5">
      <Head>
        <title>Home</title>
      </Head>
        <Landing />
        <Statistics />
        <Depoiments />
        <Footer />
    </main>
  );
};

export default Home;