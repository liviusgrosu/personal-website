/* eslint-disable react-refresh/only-export-components */
import {Button, Card, CardContent, CardHeader, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { Project } from "../app/models/project";
import { useStore } from "../app/stores/store";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";

interface Props {
    project: Project
}

export default observer(function ProfileCard({project}: Props) {
    const {commonStore: {token}, modalStore, projectStore} = useStore();
    const {uploadPhoto} = projectStore;

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(project.id, file);
    }

    return (
        <Card as={Link} to={`/projects/${project.id}`}>
            <Image src={project.image || '/placeholder.png'} />
            <CardContent>
                <CardHeader textAlign='center'>{project.title}</CardHeader>
            </CardContent>
            {/* {token && (
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
            )} */}

            {token && (
                <CardContent extra>
                    <div className="ui three buttons">
                        <Button 
                            basic color="blue"
                            as={Link}
                            to={`/projects-edit/${project.id}`}
                            content="Edit"
                        />
                        <Button 
                            basic color="red"
                            content="Delete"
                        />
                        <Button 
                            basic color="green"
                            content="Change Photo"
                        />
                    </div>
                </CardContent>
            )}
        </Card>
    );
})