import { createContext, useContext } from "react";
import AboutStore from "./aboutStore";
import ProjectStore from "./projectStore";
import BlogPostStore from "./blogPostStore";
import LoginStore from "./loginStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

// Define the store
interface Store {
    aboutStore: AboutStore,
    projectStore: ProjectStore,
    blogPostStore: BlogPostStore,
    loginStore: LoginStore,
    commonStore: CommonStore,
    modalStore: ModalStore
}

// We instantiate our stores here
export const store: Store = {
    aboutStore: new AboutStore(),
    projectStore: new ProjectStore(),
    blogPostStore: new BlogPostStore(),
    loginStore: new LoginStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore()
}

// We create the react context of the store so its available to use between components
export const StoreContext = createContext(store)

// This is simply accessing the store
export function useStore() {
    return useContext(StoreContext);
}