// src/navigation/MainStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator'; // <- Seu menu lateral
import UserFormScreen from '../screens/UserFormScreen'; // <- Fora do Drawer
import UsersScreen from '../screens/UsersScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="UserForm" component={UserFormScreen} />
        </Stack.Navigator>
    );
}
