/* eslint-disable react-refresh/only-export-components */
import {Button, Card, CardContent, CardHeader, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import { Project } from "../app/models/project";
import { useStore } from "../app/stores/store";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";
import { router } from "../app/router/Routes";

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
        <Card onClick={() => router.navigate(`/projects/${project.id}`)}>
            <Image src={project.image || '/placeholder.png'} />
            <CardContent>
                <CardHeader textAlign='center'>{project.title}</CardHeader>
            </CardContent>

            {token && (
                <CardContent extra>
                    <div className="ui three buttons">
                        <Button 
                            basic color="blue"
                            content="Edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                router.navigate(`/projects-edit/${project.id}`);
                            }}
                        />
                        <Button 
                            basic color="red"
                            content="Delete"
                        />
                        <Button 
                            basic color="green"
                            content="Change Photo"
                            onClick={(e) => {
                                e.stopPropagation();
                                modalStore.openModal(
                                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload}/>,
                                    'Change Cover Photo'
                                );
                            }}
                        />
                    </div>
                </CardContent>
            )}
        </Card>
    );
})