import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
            headerShown: true,
        }}
    >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        {/* Adicione mais telas */}
    </Drawer.Navigator>
);

export default DrawerNavigator;
