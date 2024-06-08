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
            throw error;
        }
    }
}
