import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { ContactRequest } from '../models/contactRequest';

export default class ContactStore {
    successMessageVisible = false;
    successMessage = '';
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async contactRequest(formData: ContactRequest) {
        this.loading = true;
        this.error = '';

        console.log(formData);

        try {
            const response = await agent.Contact.contactRequest(formData);
            console.log("response ", response);
            if (response.status === 200) {  
                this.showSuccessMessage('Your email has been successfully sent.');
            }
        } catch (error) {
            this.error = 'Error submitting form: ' + (error as Error).message;
            console.error('Error submitting form:', error);
        } finally {
            this.loading = false;
        }
    }

    showSuccessMessage(message: string) {
        this.successMessage = message;
        this.successMessageVisible = true;

        setTimeout(() => {
            this.successMessageVisible = false;
        }, 3000);
    }
}