import axios, { AxiosResponse } from "axios";
import { About } from "../models/about";
import { Project } from "../models/project";

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
    get: (predicate: string) => requests.get<Project[]>(`/project?category=${predicate}`) 
}

const agent = {
    About,
    Projects
}

export default agent;