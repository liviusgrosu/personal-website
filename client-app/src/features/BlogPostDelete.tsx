import { Button, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../app/stores/store";
 

export default function BlogPostDelete() {
    const navigate = useNavigate();
    const {modalStore, blogPostStore: {deleteBlogPost}} = useStore();

    const {id} = useParams();

    function handleDelete() {
        deleteBlogPost(id!.toString());
        modalStore.closeModal();
        navigate('/blog');
    }

    return (
        <>
            <ModalHeader className='modal-header'>
                Delete Blog Post
            </ModalHeader>
            <ModalContent className="modal-header">
                Are you sure you want to delete this blog post? 
                This is a irreversable action
            </ModalContent>
            <ModalActions>
                <Button onClick={handleDelete} content="Delete" negative icon='trash'/>
            </ModalActions>
        </>
    )
}