/* eslint-disable react-refresh/only-export-components */
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Divider, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import MyTextInput from "../app/common/MyTextInput";
import { ChangeLoginValues, UserFormValues } from "../app/models/user";

export default observer (function LoginForm() {
    const {loginStore, commonStore: {token}} = useStore();
    return (
        <Formik
            initialValues={
                token 
                    ? {email: '', currentPassword: '', newPassword: '', error: null}
                    : {email: '', password: '', error: null}    
                }
            onSubmit={(values, {setErrors}) => {
                if (token) {
                    loginStore.changeAccountDetails(values as ChangeLoginValues).catch(() => 
                        setErrors({error: 'Could not change credentials'}) 
                    )
                } else {
                    loginStore.login(values as UserFormValues).catch(() => 
                        setErrors({error: 'Invalid email and/or password'}) 
                    )
                }
            }}>

            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Divider horizontal>
                        <Header
                            content={token 
                                ? "Update Account" 
                                : "Login"
                            }
                            as='h3'
                        />
                    </Divider>
                    <MyTextInput placeholder="Email" name='email'/>
                    {token ? (
                        <>
                            <MyTextInput placeholder="Current Password" name='currentPassword' type='password'/>
                            <MyTextInput placeholder="New Password" name='newPassword' type='password'/>
                        </>
                    ) : (
                        <MyTextInput placeholder="Password" name='password' type='password'/>
                    )}
                    <ErrorMessage
                        name='error' render={() => <Label style={{marginBottom: 10 }} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content={token ? 'Update' : 'Login'} type="submit" fluids/>
                    {token && (
                        <Button content='Logout' onClick={loginStore.logout} fluids/>
                    )}
                </Form>
            )}
        </Formik>
    )
})