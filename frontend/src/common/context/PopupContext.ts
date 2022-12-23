import { createContext } from "react";

interface Popup {
  title: string,
  text: string
}

interface Context {
  popups: Popup[],
  dispatchPopup: (title: string, text: string) => void
}

const PopupContext = createContext<Context>({ 
  popups: [],
  dispatchPopup: () => null
});

export default PopupContext;