import { user, form } from '../../src/API/index.js';

describe('Get all Forms', () => {

    it('should give an error if user not logged in', async () => {
        try {
            await form.getAllForms();
        } catch (error) {
            expect(error.message).toBe('Unauthorize request.');
        }
    });

    it('Should get all the forms', async () => {
        await user.login({ auid: '222706030', password: 'Naresh@123' });
        const response = await form.getAllForms();
        expect(response).toBeDefined;
        expect(response.success).toBeTruthy;
        expect(response.message).toBe('All forms Data.');
        // expect(response.success).toBeTruthy
        // expect(response.message).toBe("All forms Data.");
    });
});
