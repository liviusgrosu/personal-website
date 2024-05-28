/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { Button } from "semantic-ui-react";

export default observer(function BlogPostDetail() {
    const navigate = useNavigate();
    const {blogPostStore} = useStore();
    const {selectedBlogPostDetails, loadBlogPostsDetails, clearSelectedBlogPostDetails} = blogPostStore;

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            loadBlogPostsDetails(id);
        }
        return () => {
            clearSelectedBlogPostDetails();
        }
    }, [id, loadBlogPostsDetails, clearSelectedBlogPostDetails])

    const handleBack = () => {
        clearSelectedBlogPostDetails();
        navigate('/blog');
    };

    const sanitizedHtml = DOMPurify.sanitize(selectedBlogPostDetails);

    return (
        <>
        <Button 
            icon="left arrow icon" 
            content="Back"
            onClick={handleBack}
        />            
        <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
        </>
    )
})