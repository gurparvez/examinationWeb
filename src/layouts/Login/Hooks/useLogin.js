import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import user from '../../../API/User.js';
import { login } from '../../../store/authSlice.js';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ auid, password }) => user.login({ auid, password }),
        onSuccess: (data) => {
            console.log(data);
            dispatch(login(data.data));
            const isAdmin = data?.data.user.role === 'A';
            if (isAdmin) navigate('/admin');
            else navigate('/user');
        },
        onError: (err) => console.error('Login Error:', err),
    });
};

export default useLogin;
