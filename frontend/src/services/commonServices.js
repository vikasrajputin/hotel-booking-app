import axios from 'axios';

const BASE_URL = 'http://localhost:8086';
const IMAGE_BASE_URL = 'http://localhost:8080';
const ROOM_BASE_URL = 'http://localhost:8086';
const USERRATING_BASE_URL = 'http://localhost:8082';
const USERPROFILE_BASE_URL = 'http://localhost:8081';
const AUTH_BASE_URL = 'http://localhost:8085/api';

const refreshTokenAPI = async () => {
    try {
        const refreshToken = localStorage.getItem('token');
        const response = await axios.post(`${AUTH_BASE_URL}/refreshToken`, { token: refreshToken });
        const { accessToken, userId } = response.data;

        // Save new access token and user ID in local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);

        return accessToken;
    } catch (error) {
        console.error("Error refreshing token", error);
        throw error;
    }
};

const createApiClient = (baseURL) => {
    const client = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    client.interceptors.request.use(config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    client.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshTokenAPI();

            // Update the authorization header with the new access token
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return axios(originalRequest);
        }

        return Promise.reject(error);
    });

    return client;
};

const apiClient = createApiClient(BASE_URL);
const imageApiClient = createApiClient(IMAGE_BASE_URL);
const roomApiClient = createApiClient(ROOM_BASE_URL);
const ratingApiClient = createApiClient(USERRATING_BASE_URL);
const userProfileApiClient = createApiClient(USERPROFILE_BASE_URL);

// Example service functions

export const searchHotels = async (params) => {
    try {
        const response = await apiClient.get('/rooms/search', { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching hotels data", error);
        throw error;
    }
};

export const sortByPrice = async (order, params) => {
    try {
        const response = await apiClient.get(`/${order}/price`, { params });
        return response.data;
    } catch (error) {
        console.error(`Error fetching hotels data by ${order} price`, error);
        throw error;
    }
};

export const getHotelsByUserRating = async (params) => {
    try {
        const response = await apiClient.get('/rooms/userRating', { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching hotels data by user rating", error);
        throw error;
    }
};

export const searchHotelsByName = async (params) => {
    try {
        const response = await apiClient.get('/rooms/hotelNames', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels data by search query', error);
        throw error;
    }
};

// New function to fetch hotel images
export const fetchImages = async (hotelId, roomType) => {
    try {
        const response = await imageApiClient.get(`/hotel/${hotelId}/images/${roomType}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export const fetchRoomsByHotelNames = async (params) => {
    try {
        const response = await roomApiClient.get('/rooms/hotelNames/Types', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching rooms by hotel names', error);
        throw error;
    }
};

export const fetchUserRating = async (hotelId) => {
    try {
        const response = await ratingApiClient.get(`/rating/${hotelId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user rating:', error);
        throw error;
    }
};

export const fetchUserInfo = async (userId) => {
    try {
        const response = await userProfileApiClient.get(`/userInfo/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export const fetchUserBookingsHistory = async (userId) => {
    try {
        const response = await userProfileApiClient.get(`/userHistory/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking history:', error);
        throw error;
    }
};

export const fetchUserBookingsByDateRange = async (userId, startMonth, endMonth, year) => {
    try {
        const response = await userProfileApiClient.get(`/userHistory/${userId}/${startMonth}/${endMonth}/${year}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings by date range:', error);
        throw error;
    }
};

// // Auth services

// export const signup = async (formData) => {
//     const { firstName, lastName, email, password } = formData;
//     try {
//         const response = await axios.post(`${AUTH_BASE_URL}/register`, {
//             firstName,
//             lastName,
//             email,
//             password,
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error during signup", error);
//         throw error;
//     }
// };

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
