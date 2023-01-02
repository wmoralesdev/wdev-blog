import { CommentModel } from '@models/comment';
import { Comment, Reply } from '@prisma/client';
import createInstance from './http';

const commentInstance = createInstance();

export const createComment = (slug: string, data: Partial<Comment>) => commentInstance.post<CommentModel>(`/post/${slug}/comment`, data);

export const getComments = (slug: string) => commentInstance.get<CommentModel[]>(`/post/${slug}/comment`);

export const deleteComment = (slug: string, commentId: string) => commentInstance.delete<CommentModel>(`/post/${slug}/comment/${commentId}`);

export const createReply = (slug: string, commentId: string, data: Partial<Reply>) => commentInstance.post<CommentModel>(`/post/${slug}/comment/${commentId}/reply`, data);

export const deleteReply = (slug: string, commentId: string, replyId: string) => commentInstance.post<CommentModel>(`/post/${slug}/comment/${commentId}/reply/${replyId}`);
