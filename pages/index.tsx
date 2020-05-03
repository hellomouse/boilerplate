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
    <p>the counter was {count} (<Link href="/counter">go to the counter</Link>)</p>
    <p><Link href="/blah">go to the styles test page</Link></p>
  </div>;
}
