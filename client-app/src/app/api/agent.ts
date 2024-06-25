import axios, { AxiosResponse } from "axios";
import { Photo, Project, IProjectDetail, ProjectDetail } from "../models/project";
import { BlogPost, BlogPostDetail, IBlogPostDetail } from "../models/blogPost";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { AboutContent } from "../models/about";

axios.defaults.baseURL = 'http://localhost:7117';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  })

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const About = {
    getAbout: () => requests.get<string>('/about'),
    updateAbout: (content: AboutContent) => requests.put('/about', content)
}

const Projects = {
    getList: (predicate: string) => requests.get<Project[]>(`/project?category=${predicate}`),
    getDetails: (id: string) => requests.get<IProjectDetail>(`/project/${id}`),
    createDetails: (details: ProjectDetail) => requests.post(`/project`, details),
    updateDetails: (details: IProjectDetail) => requests.put(`/project`, details),
    updatePhoto: (id: string, file: Blob) => {
        const formData = new FormData;
        formData.append('File', file);
        return axios.post<Photo>(`/project/coverPhoto/${id}`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}

const Blogs = {
    getList:  () => requests.get<BlogPost[]>('/blogPost'),
    getDetails: (id: string) => requests.get<IBlogPostDetail>(`/blogPost/${id}`),
    createDetails: (details: BlogPostDetail) => requests.post(`/blogPost`, details),
    updateDetails: (details: IBlogPostDetail) => requests.put(`/blogPost`, details),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
}

const agent = {
    About,
    Projects,
    Blogs,
    Account
}

export default agent;