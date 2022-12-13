import { UserModel } from './user';

export interface GuestbookModel {
    id: string;
    author: UserModel;
    body: string;
    created_at: string;
    updated_at: string;
}
