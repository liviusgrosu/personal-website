import { ChangeEvent, useState } from "react";
import { Button, Divider, Form, FormInput, FormTextArea, Header, Message } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer ( function ContactPage() {
    
    const {contactStore} = useStore();

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
        await contactStore.contactRequest(formData);
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

            {contactStore.successMessageVisible && (
                <Message
                    success
                    header='Email Sent'
                    content={contactStore.successMessage}
                />
            )}

            {contactStore.error && (
                <Message
                    error
                    header='Error'
                    content={contactStore.error}
                />
            )}

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
                <Button loading={contactStore.loading} type='submit' primary>Submit</Button>
            </Form>
        </>
    );
})