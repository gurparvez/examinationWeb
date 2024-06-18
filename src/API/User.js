import axios from 'axios';
import { api, root } from '../constants';

class User {
    constructor() {
        this.instance = axios.create({
            baseURL: root,
            withCredentials: true,
        });
    }

    login = async ({ auid, password }) => {
        try {
            const response = await this.instance.post(api.login, {
                auid,
                password,
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(error.response.data.message || 'Login failed');
            }
            if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            // Something happened in setting up the request
            throw new Error('Error in making request to the server');
        }
    };

    logout = async () => {
        try {
            const response = await this.instance.post(api.logout);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(error.response.data.message || 'Logout failed');
            }
            if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            // Something happened in setting up the request
            throw new Error('Error in making request');
        }
    };

    getUser = async () => {
        try {
            const response = await this.instance.get(api.getUser);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(
                    error.response.data.message ||
                        'Error in fetching user data',
                );
            }
            if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            // Something happened in setting up the request
            throw new Error('Error in making request');
        }
    };

    updateAvatar = async (image) => {
        const formData = new FormData();
        formData.append('avatar', image);
        try {
            const response = await this.instance.patch(
                api.updateAvatar,
                formData,
            );
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                throw new Error(
                    error.response.data.message || 'Update avatar failed',
                );
            }
            if (error.request) {
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            throw new Error('Error in making request');
        }
    };

    updateUser = async ({
        phoneNumber,
        email,
        motherName,
        fatherName,
        address,
        fullName,
    }) => {
        try {
            const response = await this.instance.patch(api.updateUser, {
                phoneNumber,
                email,
                motherName,
                fatherName,
                address,
                fullName,
            });
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                throw new Error(
                    error.response.data.message || 'Update profile failed',
                );
            }
            if (error.request) {
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            throw new Error('Error in making request');
        }
    };

    isFormLive = async () => {
        try {
            const response = await this.instance.get(api.formLive);
            return response.data.data.formLive;
        } catch (error) {
            console.log(error);
            if (error.response) {
                throw new Error(
                    error.response.data.message || 'getting isFormLive failed',
                );
            }
            if (error.request) {
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            }
            throw new Error('Error in making request');
        }
    };
}

const user = new User();

export default user;
