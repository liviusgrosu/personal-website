import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class AboutStore {
    aboutText = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadAbout = async () => {
        console.log('loading about');
        try {
            const aboutText = await agent.About.get();
            console.log(aboutText);
            
            runInAction(() => {
                this.aboutText = aboutText.content;
            })
        } catch (error) {
            console.log(error);
        }
    }
}