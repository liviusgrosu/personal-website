import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BlogPost } from "../models/blogPost";

export default class BlogPostStore {
    blogPosts: BlogPost[] = [];
    selectedBlogPostDetails = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadBlogPosts = async () => {
        try {
            const blogPosts = await agent.Blogs.getList();
            runInAction(() => {
                this.blogPosts = blogPosts;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadBlogPostsDetails = async (id: string) => {
        try {
            const selectedBlogPost = await agent.Blogs.getDetails(id);
            runInAction(() => {
                this.selectedBlogPostDetails = selectedBlogPost.content;
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBlogPostDetails = () => {
        this.selectedBlogPostDetails = "";
    }
}