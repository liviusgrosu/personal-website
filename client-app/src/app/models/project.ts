export interface IProject {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    image?: string;
}

export class Project implements IProject {
    constructor(
        id: string, 
        title: string,
        description: string,
        category: string,
        image: string,
        tags: string[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.image = image;
        this.tags = tags;
    }
    id: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    tags: string[];

}

export interface IProjectDetail extends IProject {
    content: string;
}

export class ProjectDetail extends Project implements IProjectDetail {
    constructor(
        id: string, 
        title: string,
        description: string,
        category: string,
        content: string,
        tags: string[]) {
        super(id, title, description, category, '', tags);
        this.content = content;
    }
    content: string;
}

export interface Photo {
    id: string;
    url: string;
}