/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Header, Input } from "semantic-ui-react";
import ReactQuill from "react-quill";
import MyTextInput from "../app/common/MyTextInput";

export default observer(function ProjectEdit() {
    const navigate = useNavigate();
    const {projectStore} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails, updateProjectDetails} = projectStore;
    const {id} = useParams();
    const [reactQuillContent, setReactQuillContent] = useState('');
    const [title, setTitle] = useState('');

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
            setTitle(selectedProjectDetails.title);
        }
    }, [selectedProjectDetails]);

    const handleBack = () => {
        clearSelectedProjectDetails();
        navigate('/projects');
    };

    const handleSubmit = async () => {
        await updateProjectDetails(title, reactQuillContent);
        navigate(`/projects/${id}`);
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
            {selectedProjectDetails && (
                <>
                    <Input
                        defaultValue={title}
                        name = "Title"
                        label = "Title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </>
            )}

            <ReactQuill
                value={reactQuillContent}
                onChange={(value: string) => setReactQuillContent(value)}
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