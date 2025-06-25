import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import { ProductInterface } from '../common/interfaces';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductListScreen() {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<Props>();

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.items);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsub = navigation.addListener('focus', fetchProducts);
        return unsub;
    }, [navigation]);

    const handleDelete = (id: number, name: string) => {
        Alert.alert(
            'Confirmar exclusão',
            `Deseja realmente deletar "${name}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Deletar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/products/${id}`);
                            setProducts(prev => prev.filter(p => p.product_id !== id));
                        } catch {
                            Alert.alert('Erro', 'Não foi possível deletar o produto.');
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: ProductInterface }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.product_name}</Text>
                <Text style={styles.quantity}>Qtd: {item.product_quantity}</Text>
                <Text style={styles.price}>R$ {Number(item.product_unit_price || 0).toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
                {/* Editar */}
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => navigation.navigate('ProductForm', { product: item })}
                >
                    <Feather name="edit" size={20} color="#4caf50" />
                </TouchableOpacity>

                {/* Deletar */}
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => handleDelete(item.product_id, item.product_name!)}
                >
                    <Feather name="trash-2" size={20} color="#f44336" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007bff" />;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={p => p.product_id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

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
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    card: { flexDirection: 'row', padding: 15, margin: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
    info: { flex: 1 },
    name: { fontWeight: 'bold', fontSize: 16 },
    quantity: { color: '#555', marginTop: 4 },
    price: { color: '#007bff', marginTop: 4 },
    actions: { flexDirection: 'row', alignItems: 'center' },
    icon: { marginLeft: 12 },
    fab: {
        position: 'absolute', right: 20, bottom: 30,
        backgroundColor: '#007bff', width: 55, height: 55,
        borderRadius: 30, alignItems: 'center', justifyContent: 'center',
        elevation: 5
    },
});
