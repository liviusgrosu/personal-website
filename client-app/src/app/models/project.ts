export interface IProject {
    id: string;
    title: string;
    category: string;
    image?: string;
}

export class Project implements IProject {
    constructor(
        id: string, 
        title: string,
        category: string,
        image: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.image = image;
    }
    id: string;
    title: string;
    category: string;
    image?: string;
}

export interface IProjectDetail extends IProject {
    content: string;
}

export class ProjectDetail extends Project implements IProjectDetail {
    constructor(
        id: string, 
        title: string,
        category: string,
        content: string) {
        super(id, title, category, '');
        this.content = content;
    }
    content: string;
}

export interface Photo {
    id: string;
    url: string;
}