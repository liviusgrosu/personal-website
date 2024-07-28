import { useState } from "react";
import { Button, Divider, Form, FormInput, FormTextArea, Header, Icon, Input } from "semantic-ui-react";

export default function ContactPage() {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        body: ''
      });
    
      const handleSubmit = () => {
        console.log('Form data submitted:', formData);
        // Handle form submission logic here
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
                />
                <FormInput
                    label='Email'
                    name='email'
                    value={formData.email}
                    placeholder='Enter your email'
                    type='email'
                />
                <FormTextArea
                    label='Body'
                    name='body'
                    value={formData.body}
                    placeholder='Enter the message body'
                />
                <Button type='submit' primary>Submit</Button>
            </Form>
        </>
      );
}