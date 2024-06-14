import axios, { AxiosResponse } from "axios";
import { About } from "../models/about";
import { Photo, Project, ProjectDetail } from "../models/project";
import { BlogPost, BlogPostDetail } from "../models/blogPost";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

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
    get: () => requests.get<About>('/about')
}

const Projects = {
    getList: (predicate: string) => requests.get<Project[]>(`/project?category=${predicate}`),
    getDetails: (id: string) => requests.get<ProjectDetail>(`/project/${id}`),
    updateDetails: (details: ProjectDetail) => requests.put(`/project`, details),
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
    getDetails: (id: string) => requests.get<BlogPostDetail>(`/blogPost/${id}`)
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