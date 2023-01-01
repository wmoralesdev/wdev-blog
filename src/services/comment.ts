import { CommentModel } from '@models/comment';
import { Comment, Reply } from '@prisma/client';
import createInstance from './http';

const commentInstance = createInstance();

export const createComment = (slug: string, data: Partial<Comment>) => commentInstance.post<CommentModel>(`/post/${slug}/comment`, data);

export const getComments = (slug: string) => commentInstance.get<CommentModel[]>(`/post/${slug}/comment`);

export const createReply = (slug: string, commentId: string, data: Partial<Reply>) => commentInstance.post<CommentModel>(`/post/${slug}/comment/${commentId}/reply`, data);
