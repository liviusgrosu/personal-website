import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;

    constructor () {
        makeAutoObservable(this);

        // This happens when the token is set when the user logins successfully and logout
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                }
                else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }
    setToken = (token: string | null) => {
        this.token = token;
    }
}