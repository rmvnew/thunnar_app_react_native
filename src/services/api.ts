import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const url = Constants.expoConfig?.extra?.SERVER_URL || 'https://thunnar.site';
console.log('URL:', url);

const api = axios.create({
    baseURL: url + '/api/v1',
});

console.log('object', api.defaults.baseURL);

// Interceptor para adicionar o token no cabeçalho
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor para tratar 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            // Aqui você pode emitir um evento, chamar logout do contexto ou algo similar
            console.warn('Sessão expirada. Redirecionando para login.');

            // ⚠ Não temos window.location.href — o ideal é um contexto que chame navigation.navigate('Login')

            return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
        }

        return Promise.reject(error);
    }
);


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


export default api;
