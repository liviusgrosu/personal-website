/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { Button, Header } from "semantic-ui-react";

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

    return (
        <>
        <Button 
            icon="left arrow icon" 
            content="Back"
            onClick={handleBack}
        />            
        {selectedBlogPostDetails && (
            <>
                <Header content={selectedBlogPostDetails.title} />
                <div dangerouslySetInnerHTML={{__html: selectedBlogPostDetails.content}}/>
            </>
        )}     
        </>
    )
})