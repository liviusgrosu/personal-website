/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import ReactQuill from "react-quill";

export default observer(function AboutEdit() {
    const navigate = useNavigate();
    const {aboutStore} = useStore();
    const {aboutText, loadAbout, updateAbout} = aboutStore;
    const [reactQuillContent, setReactQuillContent] = useState('');

    useEffect(() => {
        loadAbout();
    }, [loadAbout]);

    useEffect(() => {
        if (aboutText !== '')
        {
            setReactQuillContent(aboutText);
        }
    }, [aboutText]);

    const handleBack = () => {
        navigate('/about');
    };

    const handleSubmit = async () => {
        await updateAbout(reactQuillContent);
        handleBack();
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