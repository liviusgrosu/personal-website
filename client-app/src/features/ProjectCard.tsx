/* eslint-disable react-refresh/only-export-components */
import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Container, Icon, Image, Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemImage, Label, LabelGroup} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import { Project } from "../app/models/project";
import { useStore } from "../app/stores/store";
import PhotoUploadWidget from "../app/imageUpload/PhotoUploadWidget";
import { router } from "../app/router/Routes";
import { Link } from "react-router-dom";

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
            <Item as={Link} to={`/projects/${project.id}`}>
                <ItemImage src={project.image || '/placeholder.png'} />
                <ItemContent>
                    <ItemHeader content={project.title}></ItemHeader>
                    <ItemDescription content={project.description}/>
                    <ItemExtra>
                        <LabelGroup size='small'>
                            {project.tags.map(tag => (
                                <Label content={tag}/>
                            ))}
                        </LabelGroup>
                    </ItemExtra>
                </ItemContent>
            </Item>
        
        // <Card onClick={() => router.navigate(`/projects/${project.id}`)}>
        //     <Image src={project.image || '/placeholder.png'} />
        //     <CardContent>
        //         <CardHeader textAlign='center'>{project.title}</CardHeader>
        //         <CardDescription>
        //             <Container textAlign="center">
        //                 <LabelGroup size='small'>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                     <Label content="C++"/>
        //                 </LabelGroup>
        //             </Container>
        //         </CardDescription>
        //     </CardContent>

        //     {token && (
        //         <CardContent extra>
        //             <ButtonGroup fluid>
        //                 <Button 
        //                     icon
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         router.navigate(`/projects-edit/${project.id}`);
        //                     }}
        //                 >
        //                     <Icon name='edit' />
        //                 </Button>
        //                 <Button 
        //                     icon
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         modalStore.openModal(
        //                             <PhotoUploadWidget uploadPhoto={handlePhotoUpload}/>,
        //                             'Change Cover Photo'
        //                         );
        //                     }}
        //                 >
        //                     <Icon name='picture' />
        //                 </Button>
        //                 <Button 
        //                     negative 
        //                     icon
        //                     onClick={(e) => {
        //                         e.stopPropagation();
        //                         modalStore.openModal(
        //                             <>

        //                             </>,
        //                             'Delete Project'
        //                         );
        //                     }}
        //                 >
        //                     <Icon name='trash' />
        //                 </Button>    
        //             </ButtonGroup>
        //         </CardContent>
        //     )}
        // </Card>
    );
})