// src/navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveBackgroundColor: 'rgb(235, 235, 235)',
                drawerActiveTintColor: 'rgb(21,110,212)',
                drawerInactiveTintColor: '#555',
                drawerLabelStyle: { fontSize: 14, fontWeight: '600' },
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Início',
                    drawerIcon: ({ color, size }) => (
                        <Feather name="home" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Users"
                component={UsersScreen}
                options={{
                    title: 'Usuários',
                    drawerIcon: ({ color, size }) => (
                        <Feather name="users" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
