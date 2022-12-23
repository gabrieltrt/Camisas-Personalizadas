import { createContext } from "react";

const PopupsContext = createContext({ popups: [], dispatchPopup: () => null });

export default PopupsContext;