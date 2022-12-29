import createInstance from './http';

const guestbookInstance = createInstance();

export const trackPostVisit = (slug) => guestbookInstance.get<{ views: number }>(`/post/${slug}`);
