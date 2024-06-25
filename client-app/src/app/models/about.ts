export interface IAbout {
    content: string;
}

export class AboutContent implements IAbout {
    constructor(content: string){
        this.content = content;
    }

    content: string;
}