export interface IBlogPost {
    id: string;
    title: string;
    date: Date;
}

export class BlogPost implements IBlogPost {
    constructor(
        id: string,
        title: string,
        date: Date) {
        this.id = id;
        this.title = title;
        this.date = date;
    }
    id: string;
    title: string;
    date: Date;
}

export interface IBlogPostDetail extends IBlogPost {
    content: string;
}

export class BlogPostDetail extends BlogPost implements IBlogPostDetail {
    constructor(
        id: string,
        title: string,
        date: Date,
        content: string) {
        super(id, title, date);
        this.content = content;
    }
    content: string;
}