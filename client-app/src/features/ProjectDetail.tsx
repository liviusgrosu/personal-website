/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { Button, ButtonGroup, Header, Label } from "semantic-ui-react";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";
import ProjectDelete from "./ProjectDelete";
import ResizableIframe from "../app/common/ResizableIframe";
import FitIframes from "../app/common/FitIframes";
import IframeResizer from "@iframe-resizer/react";

export default observer(function ProjectDetail() {
    const navigate = useNavigate();
    const {projectStore, modalStore, commonStore: {token}} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails, uploadPhoto} = projectStore;

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            loadProjectDetails(id);
        }
        return () => {
            clearSelectedProjectDetails();
        }
    }, [id, loadProjectDetails, clearSelectedProjectDetails])

    const handleBack = () => {
        clearSelectedProjectDetails();
        navigate('/projects');
    };

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(id!.toString(), file);
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
                        onClick={() => {navigate(`/projects-edit/${id}`)}}
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
                                <ProjectDelete/>,
                            );
                        }}
                    />
                </ButtonGroup>
            )}
            {selectedProjectDetails && (
                <>
                    <Header content={selectedProjectDetails.title} />
                    <div>
                        {selectedProjectDetails?.tags.map(tag => (
                            <Label content={tag} key={tag} style={{ margin: '5px' }}/>
                        ))}
                    </div>

                    <div className="videoContainer">
                        <iframe  className="responsive-iframe" src="https://user-images.githubusercontent.com/1690449/119239331-bf6df700-bb1e-11eb-87d7-678d8ba15065.mp4"></iframe>
                    </div> 

                    <div className="detailsPage" dangerouslySetInnerHTML={{__html: selectedProjectDetails.content}}/>
                </>
            )}            
        </>
    )
})