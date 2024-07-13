/* eslint-disable react-refresh/only-export-components */
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, FormField, FormGroup, Header, Input } from "semantic-ui-react";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";

export default observer(function BlogPostEdit() {
    const navigate = useNavigate();
    const {blogPostStore} = useStore();
    const {selectedBlogPostDetails, loadBlogPostsDetails, clearSelectedBlogPostDetails, updateBlogPostDetails, createBlogPostDetails} = blogPostStore;
    const {id} = useParams();
    const [reactQuillContent, setReactQuillContent] = useState('');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (id) {
            loadBlogPostsDetails(id);
        }
        return () => {
            clearSelectedBlogPostDetails();
        }
    }, [id, loadBlogPostsDetails, clearSelectedBlogPostDetails]);

    useEffect(() => {
        if (selectedBlogPostDetails) {
            setReactQuillContent(selectedBlogPostDetails.content);
            setTitle(selectedBlogPostDetails.title);
            setStartDate(new Date(selectedBlogPostDetails.date));
        }
    }, [selectedBlogPostDetails]);

    const handleSubmit = async () => {
        if (id) {
            await updateBlogPostDetails(title, startDate, reactQuillContent);
            navigate(`/blog/${id}`);
        } else {
            await createBlogPostDetails(title, startDate, reactQuillContent);
            navigate(`/blog`);
        }
    };

    return (
        <Form>
            <FormField>
                <Button 
                    icon="cancel" 
                    content="Cancel"
                    onClick={() => {navigate(`/blog/${id}`)}}
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
                    <Header content="Date"/>
                    <div className="customDatePickerWidth">
                        <DatePicker
                            selected={startDate} 
                            onChange={(date) => {setStartDate(date!); console.log(`date: ${startDate}`)}}
                            showTimeSelect
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                    </div>
                </FormField>
            </FormGroup>

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
                        ['link', 'image'],
                        ['clean']
                    ]
                    }}
                /> 
            </FormField>
        </Form>
    )
})