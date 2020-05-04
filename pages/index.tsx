import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { State } from '../store';

export default function App() {
  let count = useSelector((state: State) => state.counter.count);
  return <div>
    <Head>
      <title>hi welcome to modern web development</title>
    </Head>
    <h2>Hi!</h2>
    <p>the counter was {count} (<Link href="/counter"><a>go to the counter</a></Link>)</p>
    <p><Link href="/blah"><a>go to the styles test page</a></Link></p>
  </div>;
}

// this page should be statically generated
export const getStaticProps = () => ({ props: {} });
