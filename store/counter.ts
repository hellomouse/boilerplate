import { Action } from 'redux';

export interface IncrementAction extends Action<'counter.INCREMENT'> {
  by?: number;
}

export function incrementCounter(by = 1): IncrementAction {
  return {
    type: 'counter.INCREMENT',
    by
  };
}

export interface ResetAction extends Action<'counter.RESET'> {
  to?: number;
}

export function resetCounter(to = 0): ResetAction {
  return {
    type: 'counter.RESET',
    to
  };
}

export type ActionTypes = IncrementAction | ResetAction;

export const defaultState = {
  count: 0
};

export function reducer(state = defaultState, action: ActionTypes) {
  switch (action.type) {
    case 'counter.INCREMENT': {
      return { count: state.count + (action.by ?? 1) };
    }
    case 'counter.RESET': {
      return { count: action.to ?? 0 };
    }
    default: return state;
  }
}
