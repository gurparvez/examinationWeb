const getApprovedLabel = (value) => {
    switch (value) {
        case 1:
            return { label: 'Approved', color: 'text-green-500' };
        case 0:
            return { label: 'Pending', color: 'text-gray-700' };
        case -1:
            return { label: 'Rejected', color: 'text-red-700' };
        default:
            return { label: 'Unknown', color: 'black' };
    }
};

export default getApprovedLabel;