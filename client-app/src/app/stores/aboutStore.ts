import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import DOMPurify from "dompurify";
import { AboutContent } from "../models/about"

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
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateAbout = async (content: string) => {
        try {
            await agent.About.updateAbout(new AboutContent(content));
        } catch (error) {
            console.log(error);
        }
    }
}