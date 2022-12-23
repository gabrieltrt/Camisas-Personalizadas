import { createContext } from 'react';

interface Context {
  isLoading: boolean,
  setIsLoading: (newState: boolean) => void
}

const LoaderContext = createContext<Context>({
  isLoading: false,
  setIsLoading: () => null
});

export default LoaderContext;