import { useMemo } from 'react';

const useFormattedDate = (date: string) => {
    const formattedDate = useMemo(() => new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }), [date]);

    return formattedDate;
};

export default useFormattedDate;
