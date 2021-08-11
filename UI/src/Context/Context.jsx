import { createContext, useReducer } from 'react';
import Reducers from './Reducers';
const intial_state = {
  user:
    JSON.parse(localStorage.getItem('user')) === null
      ? null
      : JSON.parse(localStorage.getItem('user')).data,
  waiting: false,
  error: false,
};
console.log(intial_state);
const Context = createContext(intial_state);

const ContextProvider = props => {
  const [state, dispatch] = useReducer(Reducers, intial_state);

  return (
    <Context.Provider
      value={{
        user: state.user ? state.user : null,
        error: state.error,
        waiting: state.waiting,
        dispatch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
