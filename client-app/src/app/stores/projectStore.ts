import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Project, ProjectDetail } from "../models/project";
import DOMPurify from "dompurify";
import { store } from "./store";

export default class ProjectStore {
    projects: Project[] = [];
    selectedProjectDetails: ProjectDetail | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadProjects = async (predicate: string) => {
    try {
            const projects = await agent.Projects.getList(predicate);
            runInAction(() => {
                this.projects = projects;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadProjectDetails = async (id: string) => {
        try {
            const selectedProject = await agent.Projects.getDetails(id);
            runInAction(() => {
                this.selectedProjectDetails = selectedProject;
                this.selectedProjectDetails.content = DOMPurify.sanitize(selectedProject.content)
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateProjectDetails = async (title: string, content: string) => {
        try {
            if (this.selectedProjectDetails) {
                this.selectedProjectDetails.title = title;
                this.selectedProjectDetails.content = content;
                await agent.Projects.updateDetails(this.selectedProjectDetails);
            }
        } catch (error) {
            console.log(error);
        }
    }

    uploadPhoto = async (id: string, file: Blob) => {
        try {
            console.log('attempting to upload photo');
            const response = await agent.Projects.updatePhoto(id, file);
            const photo = response.data;
            store.modalStore.closeModal();
            runInAction(() => {
                this.projects.find(project => project.id === id)!.image = photo.url;
            });
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedProjectDetails = () => {
        this.selectedProjectDetails = null;
    }
}