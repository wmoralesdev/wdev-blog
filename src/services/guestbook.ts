import { GuestbookModel } from '@models/guestbook';
import { Guestbook } from '@prisma/client';
import createInstance from './http';

const guestbookInstance = createInstance();

export const signGuestbook = (data: Partial<Guestbook>) => guestbookInstance.post<GuestbookModel>('/guestbook', data);

export const getSigns = () => guestbookInstance.get<GuestbookModel[]>('/guestbook');

export const deleteSign = (id: string) => guestbookInstance.delete(`/guestbook/${id}`);
