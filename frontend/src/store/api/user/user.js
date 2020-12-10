import axios from '../../../axios';

export const loginRequest = async (data) => {
    return axios.post('/auth/login', data);
}

