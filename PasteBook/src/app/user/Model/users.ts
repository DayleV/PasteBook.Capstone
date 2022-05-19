export interface IUsers {
    userId?: number;
    profilePicture?: string;
    authenticationId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    gender?: string;
    mobileNumber?: string;
    profileBlurb?: string;
    userName?: string;
}

export interface IPost {
    PostId?: number;
    UserId: number | undefined;
    PostContent: string | undefined;
    PostDate: string | undefined;
}

export interface IAlbum {
    AlbumId?: number;
    UserId: number | undefined;
    AlbumName: string | undefined;
    AlbumDescription: string | undefined;
}