export interface IUsers {
    UserId: number;
    AuthenticationId: number;
    FirstName: string;
    LastName: string;
}

export interface IPost {
    PostId?: number;
    UserId: number | undefined;
    PostContent: string | undefined;
    PostDate: string | undefined;
}