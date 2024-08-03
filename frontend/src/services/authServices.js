import axios from 'axios';

const BASE_URL = 'http://localhost:8085/api';

export const signup = async (formData) => {
    const {  firstName,lastName, email, password } = formData;
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            firstName,
            lastName,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Error during signup", error);
        throw error;
    }
};

export const login = async (formData) => {
    const { email, password } = formData;
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email,
            password,
        });
        const data = response.data;
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
        }
        if (data.token) {
                        localStorage.setItem('token', data.token);
                    }
        if (data.userId) {
            localStorage.setItem('userId', data.userId); // Save userId in localStorage
        }
        return data;
    } catch (error) {
        console.error("Error during login", error);
        throw error;
    }
};

// export const login = async (formData) => {
//     const { email, password } = formData;
//     try {
//         const response = await axios.post(`${AUTH_BASE_URL}/login`, {
//             email,
//             password,
//         });
//         const data = response.data;
//         if (data.accessToken) {
//             localStorage.setItem('accessToken', data.accessToken);
//         }
//         if (data.refreshToken) {
//             localStorage.setItem('refreshToken', data.refreshToken);
//         }
//         if (data.userId) {
//             localStorage.setItem('userId', data.userId);
//         }
//         retu