// src/screens/ProductFormScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, StyleSheet
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import api from '../services/api';
import { ProductInterface } from '../common/interfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RoutePropForm = RouteProp<RootStackParamList, 'ProductForm'>;

export default function ProductFormScreen() {
    const route = useRoute<RoutePropForm>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { product } = route.params || {};

    const [name, setName] = useState(product?.product_name || '');
    const [qty, setQty] = useState(String(product?.product_quantity || 0));
    const [price, setPrice] = useState(String(product?.product_unit_price || 0));
    const [saving, setSaving] = useState(false);

    const handle = async () => {
        if (!name) return Alert.alert('Preencha o nome');
        setSaving(true);
        try {
            const data = { product_name: name, product_quantity: Number(qty), product_unit_price: Number(price) };
            if (product) {
                await api.put(`/products/${product.product_id}`, data);
            } else {
                await api.post('/products', data);
            }
            navigation.goBack();
        } catch (e) {
            Alert.alert('Erro ao salvar');
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={fStyles.container}>
            <Text style={fStyles.title}>{product ? 'Editar' : 'Novo'} Produto</Text>
            <TextInput style={fStyles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={fStyles.input} placeholder="Quantidade" keyboardType="numeric" value={qty} onChangeText={setQty} />
            <TextInput style={fStyles.input} placeholder="Preço" keyboardType="decimal-pad" value={price} onChangeText={setPrice} />
            <TouchableOpacity style={[fStyles.btn, saving && fStyles.disabled]} onPress={handle} disabled={saving}>
                {saving ? <ActivityIndicator color='#fff' /> : <Text style={fStyles.btnText}>{product ? 'Atualizar' : 'Salvar'}</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
}

const fStyles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { backgroundColor: '#fff', borderRadius: 6, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: '#ddd' },
    btn: { backgroundColor: '#007bff', padding: 14, borderRadius: 6, alignItems: 'center' },
    disabled: { backgroundColor: '#999' },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
