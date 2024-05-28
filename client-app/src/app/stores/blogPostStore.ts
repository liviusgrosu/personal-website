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
        console.log('loading blog posts');
        try {
            const blogPosts = await agent.Blogs.getList();
            console.log(blogPosts);
            
            runInAction(() => {
                this.blogPosts = blogPosts;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadBlogPostsDetails = async (id: string) => {
        console.log(`loading blog post details for ${id}`);
        try {
            const selectedBlogPost = await agent.Blogs.getDetails(id);
            console.log(selectedBlogPost);
            
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