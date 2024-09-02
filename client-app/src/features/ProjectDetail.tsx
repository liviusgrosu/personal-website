/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { Button, ButtonGroup, Header, Icon, Label } from "semantic-ui-react";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";
import ProjectDelete from "./ProjectDelete";

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
            <ButtonGroup>
                <Button 
                    icon="left arrow" 
                    content="Back"
                    onClick={handleBack}
                />
                {selectedProjectDetails && selectedProjectDetails.githubRepo != "" && (
                    <Button 
                        icon="github" 
                        content="Check out the repo"
                        color='black'
                        href={selectedProjectDetails.githubRepo}
                        target='_blank'
                        rel='noopener noreferrer'
                    />
                )}
                
            </ButtonGroup>
            {token && (
                <div style={{ marginTop: '20px' }}>
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
                </div>
            )}
            {selectedProjectDetails && (
                <>
                    <Header content={selectedProjectDetails.title} as="h2"/>
                    <div>
                        {selectedProjectDetails?.tags.map(tag => (
                            <Label content={tag} key={tag} style={{ margin: '5px' }}/>
                        ))}
                    </div>
                    
                    <div className="detailsPage" dangerouslySetInnerHTML={{__html: selectedProjectDetails.content}}/>
                </>
            )}            
        </>
    )
})