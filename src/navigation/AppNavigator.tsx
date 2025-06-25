// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import UserFormScreen from '../screens/UserFormScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductFormScreen from '../screens/ProductFormScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        // src/navigation/AppNavigator.tsx
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <>
                    <Stack.Screen name="Drawer" component={DrawerNavigator} />
                    <Stack.Screen name="UserForm" component={UserFormScreen} />
                    <Stack.Screen name="ProductForm" component={ProductFormScreen} />
                </>
            )}
        </Stack.Navigator>

    );
}
