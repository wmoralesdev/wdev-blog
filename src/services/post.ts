import createInstance from './http';

const guestbookInstance = createInstance();

export const getPostVisits = (slug) => guestbookInstance.get<{ views: number }>(`/post/${slug}/visits`);
