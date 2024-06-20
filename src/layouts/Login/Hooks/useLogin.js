import { useMutation } from '@tanstack/react-query';
import user from '../../../API/User.js';

const useLogin = () => {
    return useMutation({
        mutationFn: ({ auid, password }) => user.login({ auid, password }),
    });
};

export default useLogin;
