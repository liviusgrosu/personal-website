import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import DOMPurify from "dompurify";

export default class AboutStore {
    aboutText = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadAbout = async () => {
        try {
            const aboutText = await agent.About.getAbout();
            runInAction(() => {
                this.aboutText = DOMPurify.sanitize(aboutText);
                console.log(this.aboutText);
            })
        } catch (error) {
            console.log(error);
        }
    }

    // updateAbout = async(content: string) => {
    //     try {
    //         await again
    //     } catch (error) {
            
    //     }
    // }
}