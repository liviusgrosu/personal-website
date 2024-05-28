/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { Button } from "semantic-ui-react";

export default observer(function ProjectDetail() {
    const navigate = useNavigate();
    const {projectStore} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails} = projectStore;

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

    const sanitizedHtml = DOMPurify.sanitize(selectedProjectDetails);

    return (
        <>
        <Button 
            icon="left arrow icon" 
            content="Back"
            onClick={handleBack}
        />            
        <div dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
        </>
    )
})