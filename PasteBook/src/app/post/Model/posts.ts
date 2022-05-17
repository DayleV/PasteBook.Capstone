import { IUsers } from "src/app/user/Model/users"

export interface IPosts {
    PostId?: number,
    UserId?: number,
    PostContent: string,
    PostDate?: Date
}
export interface IPostDetail{
    post?: IPost,
    comments?: IComment[],
    likes?: ILike[]
}
export interface IPost {
    postId?: number,
    userId?: number,
    postContent?: string,
    postDate?: Date,
    user?: IUsers
}
export interface IComment {
    commentId?: number,
    postId?: number,
    userId?: number,
    commentContent?: string,
    commentDate?: string
}
export interface ILike {
    likeId?: number,
    userId?: number,
    postId?: number
}