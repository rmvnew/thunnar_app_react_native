// src/navigation/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import UserFormScreen from '../screens/UserFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await AsyncStorage.getItem('user');
            setIsAuthenticated(!!user);
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) return null; // Pode ser um spinner

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="Drawer" component={DrawerNavigator} />
                    <Stack.Screen name="Main" component={DrawerNavigator} />
                    <Stack.Screen name="UserForm" component={UserFormScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}
