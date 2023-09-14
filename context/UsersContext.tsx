import * as React from 'react';
import {Users} from '../json/Users';
import {ReactNode, createContext, useReducer} from 'react';
import IUsers from '../interfaces/IUsers';

interface IUsersContext {
  state: {
    Users: IUsers[];
  };
  dispatch: React.Dispatch<any>;
}

export const UsersContext = createContext<IUsersContext>({});

const actions = {
  delete(state: any, action: any) {
    const user = action.payload;
    return {
      ...state,
      Users: state.Users.filter((u: IUsers) => u.id !== user.id),
    };
  },
  update(state: any, action: any) {
    const updated = action.payload
    return {
      ...state,
      Users: state.Users.map(u => u.id === updated.id ? updated : u)
    }
  },
  create(state: any, action: any) {
    const user = action.payload;
    user.id = Math.random();
    return {
      ...state,
      Users: [...state.Users, user],
    };
  },
};
const UsersProvider: React.FC<ReactNode> = ({children}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function reducer(state: any, action: any) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const initialState = {Users: Users};

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UsersContext.Provider value={{state, dispatch}}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
