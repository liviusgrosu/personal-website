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
import BlogPostEdit from "../../features/BlogPostEdit";
import AboutEdit from "../../features/AboutEdit";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: 
        [
            { path: 'about', element: <AboutPage/> },
            { path: 'about-edit', element: <AboutEdit/> },
            { path: 'projects', element: <ProjectsPage/> },
            { path: 'projects/:id', element: <ProjectDetail/> },
            { path: 'projects-edit/:id', element: <ProjectEdit key='edit'/>},
            { path: 'projects-create', element: <ProjectEdit key='create'/>},
            { path: 'blog', element: <BlogPosts/> },
            { path: 'blog/:id', element: <BlogPostDetail/> },
            { path: 'blog-edit/:id', element: <BlogPostEdit key='edit'/> },
            { path: 'blog-create', element: <BlogPostEdit key='create'/> },
            { path: 'contact', element: <ContactPage/> },
            { path: 'login', element: <LoginForm/>},
            { path: '/', element: <Navigate to="/about" /> }
        ]
    }
])