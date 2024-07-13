/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { Button, ButtonGroup, Header } from "semantic-ui-react";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";
import BlogPostDelete from "./BlogPostDelete";

export default observer(function BlogPostDetail() {
    const navigate = useNavigate();
    const {blogPostStore, modalStore, commonStore: {token}} = useStore();
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

    function handlePhotoUpload(file: Blob) {
        //uploadPhoto(id!.toString(), file);
        modalStore.closeModal();
        navigate('/projects');
    }


    return (
        <>
            <Button 
                icon="left arrow" 
                content="Back"
                onClick={handleBack}
            />
            {token && (
                <ButtonGroup>
                    <Button 
                        icon="edit" 
                        content="Edit"
                        onClick={() => {navigate(`/blog-edit/${id}`)}}
                    />
                    <Button 
                        icon="photo" 
                        content="Photo"
                        onClick={() => {
                            modalStore.openModal(
                                <PhotoUploadWidget uploadPhoto={handlePhotoUpload}/>,
                            );
                        }}
                    />
                    <Button 
                        icon="trash" 
                        content="Delete"
                        color='red'
                        onClick={() => {
                            modalStore.openModal(
                                <BlogPostDelete/>,
                            );
                        }}
                    />
                </ButtonGroup>
            )}      
        {selectedBlogPostDetails && (
            <>
                <Header content={selectedBlogPostDetails.title} />
                <div dangerouslySetInnerHTML={{__html: selectedBlogPostDetails.content}}/>
            </>
        )}     
        </>
    )
})