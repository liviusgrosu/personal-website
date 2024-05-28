import axios, { AxiosResponse } from "axios";
import { About } from "../models/about";
import { Project, ProjectDetail } from "../models/project";
import { BlogPost, BlogPostDetail } from "../models/blogPost";

axios.defaults.baseURL = 'http://localhost:7117';

console.log('Axios base URL:', axios.defaults.baseURL);

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const About = {
    get: () => requests.get<About>('/about')
}

const Projects = {
    getList: (predicate: string) => requests.get<Project[]>(`/project?category=${predicate}`),
    getDetails: (id: string) => requests.get<ProjectDetail>(`/project/${id}`)
}

const Blogs = {
    getList:  () => requests.get<BlogPost[]>('/blogPost'),
    getDetails: (id: string) => requests.get<BlogPostDetail>(`/blogPost/${id}`)
}

const agent = {
    About,
    Projects,
    Blogs
}

export default agent;