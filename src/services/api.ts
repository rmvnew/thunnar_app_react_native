// src/services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const url = Constants.expoConfig?.extra?.SERVER_URL || 'https://thunnar.site';
console.log('URL:', url);

const api = axios.create({
    baseURL: url + '/api/v1',
});

console.log('🔧 BaseURL configurada:', api.defaults.baseURL);

// Interceptor de requisição: adiciona token e loga URL
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log('🔗 Requisição para:', config.baseURL! + config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de resposta: trata erros 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            console.warn('🔒 Sessão expirada. Redirecionando para login.');

            // Aqui você pode emitir evento ou usar contexto para logout
            return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
        }

        return Promise.reject(error);
    }
);

export default api;
