import { createContext } from "react";

interface Context {
    context: {
        CART: boolean
    } | null,
    setContext: (fn: (state: { CART: boolean }) => { CART: boolean }) => void
}

const ModalContext = createContext<Context>({
    context: null,
    setContext: () => null
});

export default ModalContext;