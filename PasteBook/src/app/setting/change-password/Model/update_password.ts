export interface IUpdateUserPassword {
    userId: number;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface IUpdateUserPasswordRequestData{
    userId: number;
    oldPassword: string;
    newPassword: string;
}