import { useQuery } from '@tanstack/react-query';
import { form } from '/src/API/index.js';

const useGetAllForms = () => {
    return useQuery({
        queryKey: ['forms'],
        queryFn: form.getAllForms,
        retry: 2,
    });
};

export default useGetAllForms;