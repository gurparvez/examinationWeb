import { format } from 'date-fns';

const formatDateForInput = (date) => {
    const dateObj = new Date(date);
    return format(new Date(dateObj), 'yyyy-MM-dd');
};

export default formatDateForInput;
