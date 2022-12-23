import { createContext } from "react";

const LoaderContext = createContext({ isLoading: false, setIsLoading: () => null });

export default LoaderContext;