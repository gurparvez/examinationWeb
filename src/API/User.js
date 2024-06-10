import axios from 'axios';
import { root } from '../constants';

class User {
    constructor() {
        this.instance = axios.create({
            baseURL: root,
        });
    }

    async login({ auid, password }) {
        try {
            const response = await this.instance({
                url: '/user/login',
                method: 'POST',
                data: {
                    auid, password,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // Request made and server responded with an error
                return error.response.data;
            } else if (error.request) {
                // Request made but no response received
                throw new Error('No response received from server! Check Your internet connection.');
            } else {
                // Something happened in setting up the request
                throw new Error('Error in making request');
            }
        }
    }
}

const user = new User();

export default user;
