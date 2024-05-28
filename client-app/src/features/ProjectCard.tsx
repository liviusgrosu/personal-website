/* eslint-disable react-refresh/only-export-components */
import {Card, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { Project } from "../app/models/project";

interface Props {
    project: Project
}

export default observer(function ProfileCard({project}: Props) {
    return (
        <Card as={Link} to={`/projects/${project.id}`}>
            <Image src={project.image || '/placeholder.png'} />
            <Card.Content>
                <Card.Header>{project.title}</Card.Header>
            </Card.Content>
        </Card>
    )
})