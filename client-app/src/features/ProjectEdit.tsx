/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownItemProps, DropdownProps, Icon, Input, Label, Select } from "semantic-ui-react";
import ReactQuill from "react-quill";
import { categoryOptions } from "../app/common/options/categoryOptions";

export default observer(function ProjectEdit() {
    const navigate = useNavigate();
    const {projectStore} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails, updateProjectDetails, createProjectDetails} = projectStore;
    const {id} = useParams();
    const [reactQuillContent, setReactQuillContent] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categoryOptions[0].value);
    const [tags, setTags] = useState<string[]>([]);

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
            setCategory(selectedProjectDetails.category);
            setTags(selectedProjectDetails.tags);
        }
    }, [selectedProjectDetails]);

    const handleSubmit = async () => {
        if (id) {
            await updateProjectDetails(title, category, reactQuillContent, tags);
            navigate(`/projects/${id}`);
        } else {
            await createProjectDetails(title, category, reactQuillContent, tags);
            navigate(`/projects`);
        }
    };

    const [inputValue, setInputValue] = useState<string>('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            // Add the new tag to the local state
            if (!tags.includes(inputValue.trim())) {
                setTags([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    return (
        <>
            <Button 
                icon="cancel" 
                content="Cancel"
                onClick={() => {navigate(`/projects/${id}`)}}
            />
            <Button 
                icon="save" 
                content="Save"
                onClick={handleSubmit}
            />

            <Input
                defaultValue={title}
                name = "Title"
                label = "Title"
                onChange={(event) => setTitle(event.target.value)}
            />

            <Select
                options={categoryOptions}
                value={category}
                onChange={(_, data) => setCategory(data.value as string)}
            />

            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a tag and press enter'
            />

            <div>
                {tags.map(tag => (
                    <Label key={tag} style={{ margin: '5px' }}>
                        {tag}
                        <Icon name='delete' onClick={() => handleRemoveTag(tag)} />
                    </Label>
                ))}
            </div>

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