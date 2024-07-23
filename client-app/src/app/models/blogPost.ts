export interface IBlogPost {
    id: string;
    title: string;
    description: string;
    date: Date;
    image?: string;
}

export class BlogPost implements IBlogPost {
    constructor(
        id: string,
        title: string,
        description: string,
        date: Date,
        image: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.image = image;
    }
    id: string;
    title: string;
    description: string;
    date: Date;
    image?: string;
}

export interface IBlogPostDetail extends IBlogPost {
    content: string;
}

export class BlogPostDetail extends BlogPost implements IBlogPostDetail {
    constructor(
        id: string,
        title: string,
        description: string,
        date: Date,
        content: string) {
        super(id, title, description, date, '');
        this.content = content;
    }
    content: string;
}