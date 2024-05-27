import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import AboutPage from "../../features/AboutPage"
import PortfolioPage from "../../features/PortfolioPage";
import BlogPage from "../../features/BlogPage";
import ContactPage from "../../features/ContactPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: 
        [
            { path: 'about', element: <AboutPage/> },
            { path: 'portfolio', element: <PortfolioPage/> },
            { path: 'blog', element: <BlogPage/> },
            { path: 'contact', element: <ContactPage/> },
            { path: '/', element: <Navigate to="/about" /> }
        ]
    }
])