export interface IPostDisplay {
    post: {
        postId?: number,
        userId: number,
        postContent: string,
        postDate?: Date
    },
    commentCount?: number,
    likeCount?: string,
}