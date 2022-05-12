import { DatePipe } from "@angular/common";

export interface IPost{
    PostId?: number,
    UserId: number,
    PostContent: string,
    PostDate?: null
}