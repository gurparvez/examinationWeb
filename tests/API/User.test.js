import { describe, it, expect } from 'vitest';
import user from '/src/API/User.js';

describe('User Login', () => {
    it('Should login successfully', async () => {
        const response = await user.login({
            auid: '222706030',
            password: 'Naresh@123',
        });

        expect(response.success).toBe(true);
        expect(response.data.accessToken).toBeDefined();
        expect(response.message).toBe('Login Successfully');
        expect(response.data.user.fullName).toBe('Naresh Kumar');
    });

    it('Should handle failure if auid or password not provided', async () => {
        expect(() => user.login({ auid: '222706030' })).toThrowError(/auid and password is requried./);
    });

    it('Should handle failure if user not found', async () => {
        expect(() => user.login({ auid: '222706031', password: 'Naresh@123' })).toThrowError(/User does not exist/);

    });

    it('Should handle failure if password is not correct', async () => {
        expect(() => user.login({ auid: '222706030', password: 'Naresh@12' })).toThrowError(/Password is not valid/);
    });
});
