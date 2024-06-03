import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class AboutStore {
    aboutText = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadAbout = async () => {
        try {
            const aboutText = await agent.About.get();
            runInAction(() => {
                this.aboutText = aboutText.content;
            })
        } catch (error) {
            console.log(error);
        }
    }
}