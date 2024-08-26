import { ChangeEvent, useState } from "react";
import { Button, Divider, Form, FormInput, FormTextArea, Header } from "semantic-ui-react";
import agent from "../app/api/agent";

export default function ContactPage() {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        body: ''
      });
    

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async () => {
    await agent.Contact.contactRequest(formData);
    };
    
    return (
        <>
            <Divider horizontal>
                <Header as='h3'>
                    Socials
                </Header>
            </Divider>
            <Divider hidden />

            <Button 
                icon="linkedin"
                color='linkedin'
                href="https://www.linkedin.com/in/liviusgrosu/"
                target='_blank'
                content="Linkdin"
            />
            <Button 
                icon="github" 
                color='black'
                href="https://github.com/liviusgrosu"
                target='_blank'
                content="Github"
            />
            <Divider hidden />
            <Divider horizontal>
                <Header as='h3'>
                    Email Me
                </Header>
            </Divider>
            <Divider hidden />
            <Form onSubmit={handleSubmit}>
                <FormInput
                    label='Name'
                    name='name'
                    value={formData.name}
                    placeholder='Enter your name'
                    onChange={handleChange}
                />
                <FormInput
                    label='Email'
                    name='email'
                    value={formData.email}
                    placeholder='Enter your email'
                    type='email'
                    onChange={handleChange}
                />
                <FormTextArea
                    label='Body'
                    name='body'
                    value={formData.body}
                    placeholder='Enter the message body'
                    onChange={handleChange}
                />
                <Button type='submit' primary>Submit</Button>
            </Form>
        </>
    );
}