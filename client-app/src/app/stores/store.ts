import { createContext, useContext } from "react";
import AboutStore from "./aboutStore";
// Define the store
interface Store {
    aboutStore: AboutStore
}

// We instantiate our stores here
export const store: Store = {
    aboutStore: new AboutStore(),
}

// We create the react context of the store so its available to use between components
export const StoreContext = createContext(store)

// This is simply accessing the store
export function useStore() {
    return useContext(StoreContext);
}