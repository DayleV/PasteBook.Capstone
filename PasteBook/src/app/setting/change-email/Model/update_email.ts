export interface IUpdateUserEmail {
    userId: number;
    oldEmailAddress: string;
    newEmailAddress: string;
    confirmNewEmailAddress: string;
    oldPassword: string;
}

export interface IUpdateUserEmailRequest{
    userId: number;
    emailAddress: string;
    oldPassword: string;
}