import { createContext } from "react"

import CartItem from "interfaces/CartItem";

const CartContext = createContext({
    cart: [] as CartItem[],
    mutate: (fn: (cart: CartItem[]) => CartItem[], revalidate?: boolean) => null
});

export default CartContext;