import user from '/src/API/User.js';

describe('User Login', () => {
    it('Should login successfully', async () => {
        const response = await user.login({
            auid: '222706030',
            password: 'Naresh@123',
        });

        expect(response.success).toBe(true);
        expect(response.message).toBe('Login Successfully');
        expect(response.data.user.avatar).toBeDefined();
        expect(response.data.user.fullName).toBe('Naresh Kumar');
    });

    it('Should handle failure if auid or password not provided', async () => {
        try {
            await user.login({ auid: '222706030' });
        } catch (error) {
            expect(error.message).toBe('auid and password is required.');
        }
    });

    it('Should handle failure if user not found', async () => {
        try {
            await user.login({ auid: '222706031', password: 'Naresh@123' });
        } catch (error) {
            expect(error.message).toBe('User does not exist');
        }
    });

    it('Should handle failure if password is not correct', async () => {
        try {
            await user.login({ auid: '222706030', password: 'Naresh@12' });
        } catch (error) {
            expect(error.message).toBe('Password is not valid');
        }
    });
});

describe('Get User', () => {
    it('Should give detail of logged in user', async () => {
        await user.login({
            auid: '222706030',
            password: 'Naresh@123',
        });
        const response = await user.getUser();

        expect(response.success).toBe(true);
        expect(response.message).toBe('User fetched successfully.');
    });

    it('Should handle failure if user does not exist', async () => {
        await user.logout();
        try {
            await user.getUser();
        } catch (error) {
            expect(error.message).toBe('Unauthorize request.');
        }
    });
});

describe('Update User avatar', () => {
    it('Should update avatar', async () => {
        await user.login({ auid: '222706030', password: 'Naresh@123' });

        const mockImage = new File(['avatar'], 'avatar.jpg', {
            type: 'image/jpeg',
        });
        const response = await user.updateAvatar(mockImage);

        expect(response.success).toBe(true);
    });
});

describe('User Logout', () => {
    it('Should logout', async () => {
        await user.login({ auid: '222706030', password: 'Naresh@123' });
        await user.logout();
    });
});
