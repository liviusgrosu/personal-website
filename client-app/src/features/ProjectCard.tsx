/* eslint-disable react-refresh/only-export-components */
import { Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemImage, Label, LabelGroup} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Project } from "../app/models/project";
import { Link } from "react-router-dom";

interface Props {
    project: Project
}

export default observer(function ProfileCard({project}: Props) {
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
    );
})