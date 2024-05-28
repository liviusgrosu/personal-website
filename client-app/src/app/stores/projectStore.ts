import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Project, ProjectDetail } from "../models/project";

export default class ProjectStore {
    projects: Project[] = [];
    selectedProjectDetails = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadProjects = async (predicate: string) => {
        console.log('loading projects');
        try {
            const projects = await agent.Projects.getList(predicate);
            console.log(projects);
            
            runInAction(() => {
                this.projects = projects;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadProjectDetails = async (id: string) => {
        console.log(`loading project details for ${id}`);
        try {
            const selectedProject = await agent.Projects.getDetails(id);
            console.log(selectedProject);
            
            runInAction(() => {
                this.selectedProjectDetails = selectedProject.content;
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedProjectDetails = () => {
        this.selectedProjectDetails = "";
    }
}