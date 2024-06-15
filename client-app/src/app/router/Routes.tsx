import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import AboutPage from "../../features/AboutPage"
import ContactPage from "../../features/ContactPage";
import ProjectsPage from "../../features/ProjectsPage";
import ProjectDetail from "../../features/ProjectDetail";
import BlogPosts from "../../features/BlogPosts";
import BlogPostDetail from "../../features/BlogPostDetail";
import LoginForm from "../../features/LoginForm";
import ProjectEdit from "../../features/ProjectEdit";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: 
        [
            { path: 'about', element: <AboutPage/> },
            { path: 'projects', element: <ProjectsPage/> },
            { path: 'projects/:id', element: <ProjectDetail/> },
            { path: 'projects-edit/:id', element: <ProjectEdit/>},
            { path: 'blog', element: <BlogPosts/> },
            { path: 'blog/:id', element: <BlogPostDetail/> },
            { path: 'contact', element: <ContactPage/> },
            { path: 'login', element: <LoginForm/>},
            { path: '/', element: <Navigate to="/about" /> }
        ]
    }
])