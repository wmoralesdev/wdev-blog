import { Guestbook } from '@prisma/client';
import createInstance from './http';

const guestbookInstance = createInstance();

export const signGuestbook = (data: Partial<Guestbook>) => guestbookInstance.post<Guestbook>('/guestbook', data);

export const getSigns = () => guestbookInstance.get<Guestbook[]>('/guestbook');
