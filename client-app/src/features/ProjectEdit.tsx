/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, GridColumn, FormField, Header, Icon, Input, Label, Select, TextArea, TextAreaProps, FormGroup } from "semantic-ui-react";
import ReactQuill from "react-quill";
import { categoryOptions } from "../app/common/options/categoryOptions";

export default observer(function ProjectEdit() {
    const navigate = useNavigate();
    const {projectStore} = useStore();
    const {selectedProjectDetails, loadProjectDetails, clearSelectedProjectDetails, updateProjectDetails, createProjectDetails} = projectStore;
    const {id} = useParams();
    const [reactQuillContent, setReactQuillContent] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(categoryOptions[0].value);
    const [tags, setTags] = useState<string[]>([]);
    const [inputTagValue, setInputTagValue] = useState<string>('');

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
            setDescription(selectedProjectDetails.description);
            setCategory(selectedProjectDetails.category);
            setTags(selectedProjectDetails.tags);
        }
    }, [selectedProjectDetails]);

    const handleSubmit = async () => {
        if (id) {
            await updateProjectDetails(title, description, category, reactQuillContent, tags);
            navigate(`/projects/${id}`);
        } else {
            await createProjectDetails(title, description, category, reactQuillContent, tags);
            navigate(`/projects`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputTagValue.trim()) {
            e.preventDefault();
            // Add the new tag to the local state
            if (!tags.includes(inputTagValue.trim())) {
                setTags([...tags, inputTagValue.trim()]);
            }
            setInputTagValue('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleDescriptionChange = (_: ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => {
        setDescription(data.value as string);
    };

    return (
        <Form>
            <FormField>
                <Button 
                    icon="cancel" 
                    content="Cancel"
                    onClick={() => {navigate(`/projects/${id}`)}}
                />
                <Button 
                    icon="save" 
                    content="Save"
                    primary
                    onClick={handleSubmit}
                />
            </FormField>
            <FormGroup>
                <FormField width={10}>
                    <Header content="Title"/>
                    <Input
                        defaultValue={title}
                        name = "Title"
                        fluid
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </FormField>
                <FormField width={6}>
                    <Header content="Category"/>
                    <Select
                        options={categoryOptions}
                        value={category}
                        onChange={(_, data) => setCategory(data.value as string)}
                    />
                </FormField>
            </FormGroup>
            <FormField>
                <Header content="Description"/>
                <TextArea
                    placeholder='Enter project description' 
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </FormField>


            <FormField>
                <Header content="Tags"/>
                <Input
                    value={inputTagValue}
                    onChange={(e) => setInputTagValue(e.target.value)}
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
            </FormField>
            <FormField>
                <Header content="Content"/>
                <ReactQuill
                    value={reactQuillContent}
                    onChange={(value: string) => setReactQuillContent(value)}
                    modules={{
                        toolbar: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'align': [] }],
                            ['link', 'image', 'video'],
                            ['clean']
                        ]
                    }}
                />
            </FormField>

        </Form>
    )
})