// src/screens/ProductListScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';

import api from '../services/api';
import { Feather } from '@expo/vector-icons';
import { ProductInterface } from '../common/interfaces';

import {
    CompositeNavigationProp, useNavigation
} from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList, DrawerParamList } from '../navigation/types';

// combinamos o Drawer (onde essa tela vive) com o NativeStack (onde ProductForm vive)
type ScreenNavProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, 'ProductList'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function ProductListScreen() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<ScreenNavProp>();

    const fetch = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.items);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsub = navigation.addListener('focus', fetch);
        return unsub;
    }, [navigation]);

    const renderItem = ({ item }: { item: ProductInterface }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductForm', { product: item })}
        >
            <Text style={styles.name}>{item.product_name}</Text>
            <Text style={styles.quantity}>Qtd: {item.product_quantity}</Text>
            <Text style={styles.price}>
                R$ {Number(item.product_unit_price || 0).toFixed(2)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Produtos</Text>
            {loading
                ? <ActivityIndicator size="large" color="#007bff" />
                : <FlatList
                    data={products}
                    keyExtractor={i => i.product_id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            }
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('ProductForm')}
            >
                <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    item: { backgroundColor: '#fff', padding: 15, marginBottom: 12, borderRadius: 8, elevation: 2 },
    name: { fontSize: 16, fontWeight: 'bold' },
    quantity: { fontSize: 14, color: '#555' },
    price: { fontSize: 14, color: '#007bff' },
    fab: {
        position: 'absolute', right: 20, bottom: 30,
        backgroundColor: '#007bff', width: 55, height: 55,
        borderRadius: 30, alignItems: 'center', justifyContent: 'center',
        elevation: 5
    },
});
