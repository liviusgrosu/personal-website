import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Project } from "../models/project";

export default class ProjectStore {
    projects: Project[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    loadProjects = async (predicate: string) => {
        console.log('loading projects');
        try {
            const projects = await agent.Projects.get(predicate);
            console.log(projects);
            
            runInAction(() => {
                this.projects = projects;
            })
        } catch (error) {
            console.log(error);
        }
    }
}