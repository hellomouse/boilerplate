import React, { useState } from 'react';
import { NextPage } from 'next';
import { connect, useSelector, useDispatch } from 'react-redux';
import { NextPageContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { State } from '../store';
import { incrementCounter, resetCounter } from '../store/counter';

interface Props {
  path: string;
}

const Counter: NextPage<Props> = ({ path }) => {
  let count = useSelector((state: State) => state.counter.count);
  let dispatch = useDispatch();
  let [incrementInput, setIncrementInput] = useState('1');
  let [resetInput, setResetInput] = useState('0');

  return <div>
    <Head>
      <title>behold, the most complicated counter you have ever seen</title>
    </Head>

    <p>count: {count}</p>
    <p>path: {path}</p>
    <p>
      <input type="number" value={incrementInput} onChange={ev => setIncrementInput(ev.target.value)} />
      <button onClick={() => dispatch(incrementCounter(+incrementInput))}>increment</button>
    </p>
    <p>
      <input type="number" value={resetInput} onChange={ev => setResetInput(ev.target.value)} />
      <button onClick={() => dispatch(resetCounter(+resetInput))}>reset</button>
    </p>
    <p>
      <Link href="/">go home</Link>
    </p>
  </div>;
};

Counter.getInitialProps = ({ pathname }: NextPageContext) => {
  return { path: pathname };
};

export default connect((state: State) => ({ count: state.counter.count }))(Counter);
