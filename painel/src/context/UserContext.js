import { createContext } from 'react';

const UserContext = createContext({
  context: null,
  setContext: () => null
});

export default UserContext;