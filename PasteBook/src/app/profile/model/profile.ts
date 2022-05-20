export interface IPost {
    PostId?: number,
    UserId?: number,
    PostContent?: string,
    PostDate?: Date
}

export interface IProfilePosts{
    post: {
        postId?: number,
        userId: number,
        postContent: string,
        postDate?: Date
    },
    commentCount?: number,
    likeCount?: string,
}

export interface IProfileAlbum{
    album: {
        albumId?: number,
        userId: number,
        albumName: string,
        albumDescription: string,
        photos?: File
    }   
}

export interface IUsers {
    userId?: number;
    authenticationId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    gender?: string;
    mobileNumber?: string;
    profileBlurb?: string;
    userName?: string;
}

export interface IUserFriend {
    userFriend: {
        userFriendId?: number;
        userId?: number | undefined;
        friendId: number | undefined;
        status?: boolean
    }
    
}
export interface IUser_Friends {
    userFriendId?: number,
    userId?: number | undefined;
    friendId?: number | undefined;
    requesterId?: number | undefined;
    status?: boolean;
}