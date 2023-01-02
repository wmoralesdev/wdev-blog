import { UserModel } from './user';

export interface ReplyModel {
    body: string;
    author: UserModel;
    id: string;
    created_at: string;
    commentId?: string;
}

export interface CommentModel {
    body: string;
    author: UserModel;
    id: string;
    replies: ReplyModel[];
    created_at: string;
}
