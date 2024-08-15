import { useMutation, useQueryClient } from '@tanstack/react-query';
import user from '../../../API/User.js';
import { logout } from '../../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: user.logout,
        onSuccess: () => {
            queryClient.clear();
            logout();
            navigate('/');
        },
        onError: (err) => console.error('Logout Error:', err),
    });
}

export default useLogout