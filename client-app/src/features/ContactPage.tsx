import { useState } from "react";
import { Button, Form, FormInput, FormTextArea, Header, Input } from "semantic-ui-react";

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