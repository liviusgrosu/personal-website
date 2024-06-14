/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import ReactQuill from "react-quill";

export default observer(function ProjectEdit() {
    const navigate = useNavigate();
    const {projectStore} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails} = projectStore;
    const {id} = useParams();

    const [reactQuillContent, setReactQuillContent] = useState('');

    useEffect(() => {
        if (id) {
            loadProjectDetails(id);
        }
        return () => {
            clearSelectedProjectDetails();
        }
    }, [id, loadProjectDetails, clearSelectedProjectDetails]);

    useEffect(() => {
        if (selectedProjectDetails) {
            setReactQuillContent(selectedProjectDetails.content);
        }
    }, [selectedProjectDetails]);

    const handleBack = () => {
        clearSelectedProjectDetails();
        navigate('/projects');
    };

    const handleSubmit = () => {
        console.log(reactQuillContent);
    };

    const handleChange = (value: string) => {
        setReactQuillContent(value);
    };

    return (
        <>
            <Button 
                icon="left arrow icon" 
                content="Back"
                onClick={handleBack}
            />
            <Button 
                icon="save icon" 
                content="Save"
                onClick={handleSubmit}
            />
            <ReactQuill
                value={reactQuillContent}
                onChange={handleChange}
                modules={{
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean']
                ]
                }}
            />        
        </>
    )
})