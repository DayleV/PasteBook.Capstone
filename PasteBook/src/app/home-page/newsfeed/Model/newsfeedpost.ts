export interface IPosts {
    PostId?: number,
    UserId: number,
    PostContent: string,
    PostDate?: Date
}

export interface INewsFeedPosts{
    post: {
        postId?: number,
        userId: number,
        postContent: string,
        postDate?: Date
    },
    commentCount?: number,
    likeCount?: string,
}