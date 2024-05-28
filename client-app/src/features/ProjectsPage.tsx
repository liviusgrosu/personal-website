/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import DOMPurify from "dompurify";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProjectCard from "./ProjectCard";
export default observer (function ProjectsPage() {
    const {projectStore: {loadProjects, projects}} = useStore();
    
    useEffect(() => {
        loadProjects('all');
    }, [loadProjects])

    const panes = [
        { menuItem: 'All', key: 'all' },
        { menuItem: 'Web Dev', key: 'webdev' },
        { menuItem: 'Game Dev', key: 'gamedev' },
        { menuItem: 'Other', key: 'other' },
    ];


    return (
        <Grid>
            <Grid.Column width={16}>
                <Tab 
                    menu={{ secondary: true, pointing: true }} 
                    panes={panes} 
                    onTabChange={(_, data) => loadProjects(panes[data.activeIndex as number].key)}
                />
                <br/>
                <Card.Group itemsPerRow={3}>
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </Card.Group>
            </Grid.Column>
        </Grid>
    )
})