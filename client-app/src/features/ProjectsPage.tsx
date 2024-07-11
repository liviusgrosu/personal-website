/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useStore } from "../app/stores/store"
import { observer } from "mobx-react-lite";
import { Button, Grid, ItemGroup, Tab } from "semantic-ui-react";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
export default observer (function ProjectsPage() {
    const {projectStore: {loadProjects, projects}, commonStore: {token}} = useStore();
    
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
                {token && (
                    <Button 
                        icon="plus icon" 
                        content="New Portfolio"
                        as={Link}
                        to={`/projects-create`}
                        style={{ marginBottom: '15px' }}
                        fluid
                        primary
                    />    
                )}
                <ItemGroup relaxed>
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </ItemGroup>
            </Grid.Column>
        </Grid>
    )
})