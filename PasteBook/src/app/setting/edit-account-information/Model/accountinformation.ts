export interface IUpdateCredentials {
    userId: number;
    emailAddress: string;
    newPassword: string;
    oldPassword: string;
    confirmNewPassword: string;
}