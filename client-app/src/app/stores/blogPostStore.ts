import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BlogPost, BlogPostDetail, IBlogPostDetail } from "../models/blogPost";
import { v4 as uuid } from "uuid";
import DOMPurify from "dompurify";

export default class BlogPostStore {
    blogPosts: BlogPost[] = [];
    selectedBlogPostDetails: IBlogPostDetail | null = null;

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
                this.selectedBlogPostDetails = selectedBlogPost;
                this.selectedBlogPostDetails!.content = DOMPurify.sanitize(selectedBlogPost.content);
            })
        } catch (error) {
            console.log(error);
        }
    }

    createBlogPostDetails = async(title: string, date: Date, content: string) =>  {
        try {
            await agent.Blogs.createDetails(
                new BlogPostDetail(
                    uuid(), 
                    title,
                    date, 
                    content
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    updateBlogPostDetails = async (title: string, date: Date, content: string) => {
        console.log(`date2 : ${date}`)
        try {
            if (this.selectedBlogPostDetails) {
                this.selectedBlogPostDetails.title = title;
                this.selectedBlogPostDetails.date = date;
                this.selectedBlogPostDetails.content = content;
                await agent.Blogs.updateDetails(this.selectedBlogPostDetails);
            }
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBlogPostDetails = () => {
        this.selectedBlogPostDetails = null;
    }
}