import axios from 'axios';
import { api, root } from '../constants';

class User {
    constructor() {
        this.instance = axios.create({
            baseURL: root,
            withCredentials: true,
        });
    }

    login = async({ auid, password }) => {
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
            } else if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            } else {
                // Something happened in setting up the request
                throw new Error('Error in making request to the server');
            }
        }
    }

    logout = async() => {
        try {
            const response = await this.instance.post(api.logout);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(error.response.data.message || 'Logout failed');
            } else if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            } else {
                // Something happened in setting up the request
                throw new Error('Error in making request');
            }
        }
    }

    // Not tested
    getUser = async() => {
        try {
            const response = await this.instance.get(api.getUser);
            return response.data;
        } catch (error) {
            console.log(error);
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(error.response.data.message || 'Login failed');
            } else if (error.request) {
                // Request made but no response received
                throw new Error(
                    'No response received from server! Check Your internet connection.',
                );
            } else {
                // Something happened in setting up the request
                throw new Error('Error in making request');
            }
        }
    }
}

const user = new User();

export default user;
