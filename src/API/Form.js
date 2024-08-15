import axiosInstance from './axios.js';
import { api } from '../constants/index.js';

class Form {
    getAllForms = async () => {
        try {
            const response = await axiosInstance.get(api.allForms);
            return response.data;
        } catch (error) {
            if (error.response) {
                // Request made and server responded with an error
                throw new Error(error.response.data.message || 'Failed to get the forms');
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

//     TODO: functions for all the api calls
}

const form = new Form();

export default form;
