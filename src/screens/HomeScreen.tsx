import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>Bem-vindo ao Thunnar!</Text>
    </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24 }
});
