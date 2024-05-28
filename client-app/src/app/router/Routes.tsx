import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import AboutPage from "../../features/AboutPage"
import BlogPage from "../../features/BlogPage";
import ContactPage from "../../features/ContactPage";
import ProjectsPage from "../../features/ProjectsPage";
import ProjectDetail from "../../features/ProjectDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: 
        [
            { path: 'about', element: <AboutPage/> },
            { path: 'projects', element: <ProjectsPage/> },
            { path: 'projects/:id', element: <ProjectDetail/> },
            { path: 'blog', element: <BlogPage/> },
            { path: 'contact', element: <ContactPage/> },
            { path: '/', element: <Navigate to="/about" /> }
        ]
    }
])