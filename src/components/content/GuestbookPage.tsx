import React, { FC } from 'react';
import { Guestbook } from '@components/guestbook';
import Signs from '@components/guestbook/Signs';

const GuestbookPage: FC = () => (
    <div>
        <Guestbook />
        <Signs />
    </div>
);

export default GuestbookPage;
