import { createStore, combineReducers } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import * as counter from './counter';

export const reducer = combineReducers({
  counter: counter.reducer
});

export type State = ReturnType<typeof reducer>;

export const makeStore: MakeStore = _context => createStore(reducer);
export const wrapper = createWrapper<State>(makeStore, { debug: true });
