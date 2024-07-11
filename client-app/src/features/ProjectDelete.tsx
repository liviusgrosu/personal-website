import { Button, Grid, Header, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../app/stores/store";
 

export default function ProjectDelete() {
    const navigate = useNavigate();
    const {modalStore, projectStore: {deleteProject}} = useStore();

    const {id} = useParams();

    function handleDelete() {
        deleteProject(id!.toString());
        modalStore.closeModal();
        navigate('/projects');
    }

    return (
        <>
            <ModalHeader className='modal-header'>
                Delete Portfolio
            </ModalHeader>
            <ModalContent className="modal-header">
                Are you sure you want to delete this portfolio page? This is a irreversable action
            </ModalContent>
            <ModalActions>
                <Button onClick={handleDelete} content="Delete" negative icon='trash'/>
            </ModalActions>
        </>
    )
}