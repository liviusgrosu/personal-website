export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
}

export interface ProjectDetail extends Project {
    content: string;
}