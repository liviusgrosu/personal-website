/* eslint-disable react-refresh/only-export-components */
import {Button, Card, Image} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { Project } from "../app/models/project";
import { useStore } from "../app/stores/store";
import { useEffect } from "react";

interface Props {
    project: Project
}

export default observer(function ProfileCard({project}: Props) {
    const {loginStore} = useStore();
    const {user} = loginStore; 

    const buttonAction = (action: string) => {
        console.log(action);
    };

    return (
        <Card>
            <Link to={`/projects/${project.id}`} style={{ display: 'block', marginBottom: '1em' }}>
                <Image src={project.image || '/placeholder.png'} />
                <Card.Content>
                    <Card.Header>{project.title}</Card.Header>
                </Card.Content>
            </Link>
            {user !== null && (
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button 
                            basic color="blue"
                            onClick={() => buttonAction('edit')}
                        >
                        Edit
                        </Button>
                        <Button 
                            basic color="red"
                            onClick={() => buttonAction('delete')}
                        >
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            )}
        </Card>
    );
})