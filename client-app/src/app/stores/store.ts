import { createContext, useContext } from "react";
import AboutStore from "./aboutStore";
import ProjectStore from "./projectStore";
// Define the store
interface Store {
    aboutStore: AboutStore,
    projectStore: ProjectStore
}

// We instantiate our stores here
export const store: Store = {
    aboutStore: new AboutStore(),
    projectStore: new ProjectStore()
}

// We create the react context of the store so its available to use between components
export const StoreContext = createContext(store)

// This is simply accessing the store
export function useStore() {
    return useContext(StoreContext);
}