export interface User {
    username: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
}

export interface ChangeLoginValues {
    email: string;
    currentPassword: string;
    newPassword: string;
}