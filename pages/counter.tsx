import React, { useState } from 'react';
import { NextPage } from 'next';
import { connect, useSelector, useDispatch } from 'react-redux';
import { NextPageContext } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
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
  let [saveState, setSaveState] = useState('');

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
      <button onClick={async () => {
        try {
          let response = await axios.post('/api/counter', { count });
          if (response.status !== 200) {
            setSaveState(`failed to save (status ${response.status})`);
            console.error('request failed unexpectedly', response.data);
          } else {
            setSaveState('saved');
          }
        } catch (err) {
          setSaveState('failed to save');
          console.error('request failed unexpectedly', err);
        }
      }}>save to server</button>
      <button onClick={async () => {
        try {
          let response = await axios.get('/api/counter');
          if (response.status !== 200) {
            setSaveState(`failed to load (status ${response.status})`);
            console.error('request failed unexpectedly', response.data);
          } else {
            setSaveState(`loaded value: ${response.data.count}`);
            dispatch(resetCounter(response.data.count));
          }
        } catch (err) {
          setSaveState('failed to load');
          console.error('request failed unexpectedly', err);
        }
      }}>load from server</button>
      <span style={{ paddingLeft: '5px' }} >{saveState}</span>
    </p>
    <p>
      <Link href="/"><a>go home</a></Link>
    </p>
  </div>;
};

// this page should be statically generated
export const getStaticProps = () => ({ props: { path: '/counter' } });

export default connect((state: State) => ({ count: state.counter.count }))(Counter);
