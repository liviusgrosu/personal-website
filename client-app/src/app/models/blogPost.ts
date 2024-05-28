export interface BlogPost {
    id: string;
    title: string;
    date: Date;
}

export interface BlogPostDetail extends BlogPost {
    content: string;
}