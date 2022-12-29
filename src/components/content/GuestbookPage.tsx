import React, { FC } from 'react';
import { Guestbook } from '@components/guestbook';
import Signs from '@components/guestbook/Signs';

const GuestbookPage: FC = () => (
    <>
        <Guestbook />
        <Signs />
    </>
);

export default GuestbookPage;
