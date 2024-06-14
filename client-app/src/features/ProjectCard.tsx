/* eslint-disable react-refresh/only-export-components */
import {Button, Card, Icon, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { Project } from "../app/models/project";
import { useStore } from "../app/stores/store";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";

interface Props {
    project: Project
}

export default observer(function ProfileCard({project}: Props) {
    const {commonStore, modalStore, projectStore} = useStore();
    const {token} = commonStore; 
    const {uploadPhoto} = projectStore;

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(project.id, file);
    }

    return (
        <Card>
            <div style={{ position: 'relative' }}>
                <Link to={`/projects/${project.id}`} style={{ display: 'block', marginBottom: '1em' }}>
                    <Image src={project.image || '/placeholder.png'} />
                    <Card.Content>
                        <Card.Header>{project.title}</Card.Header>
                    </Card.Content>
                </Link>
                {token !== null && (
                    <Button 
                        icon="pencil"
                        basic 
                        color="blue" 
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
                        onClick={(e) => {e.stopPropagation(); modalStore.openModal(
                            <PhotoUploadWidget uploadPhoto={handlePhotoUpload}/>,
                            'Change Cover Photo'
                        )}}
                    />
                )}
            </div>

            {token !== null && (
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button 
                            basic color="blue"
                            as={Link}
                            to={`/projects-edit/${project.id}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            basic color="red"
                            
                        >
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            )}
        </Card>
    );
})