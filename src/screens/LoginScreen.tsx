import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext'; // 👈 novo

const LoginScreen = () => {
    const [email, setEmail] = useState('rmvnew@gmail.com');
    const [password, setPassword] = useState('12345');
    const { login } = useAuth(); // 👈 novo

    const showToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
            position: 'top',
            visibilityTime: 3000,
        });
    };

    const handleLogin = async () => {
        if (!email || !password) {
            return showToast('info', 'Preencha todos os campos');
        }

        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token, refresh_token, user_id, name, profile, avatar } = response.data;

            await AsyncStorage.setItem('token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);

            await login({ user_id, name, profile, avatar }); // 👈 login via contexto

            showToast('success', 'Login realizado com sucesso');

        } catch (error: any) {
            if (error.response?.status === 404) {
                return showToast('error', 'Usuário não encontrado', error.response.data.message);
            }
            showToast('error', 'Erro no login', 'Verifique sua conexão e tente novamente');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/wallpaper.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <Text style={styles.title}>Login Thunnar</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#666"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        color: '#000',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
