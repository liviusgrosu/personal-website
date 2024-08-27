import { ChangeEvent, useState } from "react";
import { Button, Divider, Form, FormInput, FormTextArea, Header, Message } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { Formik, FormikHelpers } from "formik";

interface FormValues {
    name: string;
    email: string;
    body: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    body: Yup.string().required('Message body is required'),
});

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

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
            await contactStore.contactRequest(values);
            actions.resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setErrors({ email: 'Error submitting form' });
        } finally {
            actions.setSubmitting(false);
        }
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

            <Formik
                initialValues={{ name: '', email: '', body: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormInput
                            label='Name'
                            name='name'
                            value={values.name}
                            placeholder='Enter your name'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && errors.name ? errors.name : null} // Show error message
                        />
                        <FormInput
                            label='Email'
                            name='email'
                            value={values.email}
                            placeholder='Enter your email'
                            type='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email ? errors.email : null} // Show error message
                        />
                        <FormTextArea
                            label='Body'
                            name='body'
                            value={values.body}
                            placeholder='Enter the message body'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.body && errors.body ? errors.body : null} // Show error message
                        />
                        <Button type='submit' primary loading={isSubmitting}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </>
    );
})