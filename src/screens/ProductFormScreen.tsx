// src/screens/ProductFormScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity,
    Alert, ScrollView, ActivityIndicator, StyleSheet
} from 'react-native';
import { TextInput as PaperInput, Button } from 'react-native-paper';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import api from '../services/api';
import Toast from 'react-native-toast-message';


import { RootStackParamList } from '../navigation/types';

type RoutePropForm = RouteProp<RootStackParamList, 'ProductForm'>;

export default function ProductFormScreen() {
    const route = useRoute<RoutePropForm>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { product } = route.params || {};

    // Estados para cada campo
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState(0);
    const [productBarcode, setProductBarcode] = useState('');
    const [productUnitPrice, setProductUnitPrice] = useState(0);
    const [productBuyingPrice, setProductBuyingPrice] = useState(0);
    const [productNcm, setProductNcm] = useState('');
    const [productCfop, setProductCfop] = useState('');
    const [productCest, setProductCest] = useState('');
    const [productUnit, setProductUnit] = useState('');
    const [productOrigin, setProductOrigin] = useState(0);
    const [productCst, setProductCst] = useState('');
    const [productIcms, setProductIcms] = useState(0);
    const [productIpi, setProductIpi] = useState(0);
    const [productPis, setProductPis] = useState(0);
    const [productCofins, setProductCofins] = useState(0);
    const [productLocation, setProductLocation] = useState('');

    const [saving, setSaving] = useState(false);

    // Preenche em edição
    useEffect(() => {
        if (product) {
            setProductName(product.product_name || '');
            setProductQuantity(product.product_quantity);
            setProductBarcode(product.product_barcode || '');
            setProductUnitPrice(Number(product.product_unit_price) || 0);
            setProductBuyingPrice(Number((product as any).product_buying_price) || 0);
            setProductNcm(product.product_ncm || '');
            setProductCfop(product.product_cfop || '');
            setProductCest(product.product_cest || '');
            setProductUnit(product.product_unit || '');
            setProductOrigin(product.product_origin || 0);
            setProductCst(product.product_cst || '');
            setProductIcms(Number((product as any).product_icms) || 0);
            setProductIpi(Number((product as any).product_ipi) || 0);
            setProductPis(Number((product as any).product_pis) || 0);
            setProductCofins(Number((product as any).product_cofins) || 0);
            setProductLocation(product.product_location || '');
        }
    }, [product]);

    const handleSave = async () => {
        if (!productName.trim()) {
            Toast.show({ type: 'error', text1: 'O nome do produto é obrigatório.' });
            return;
        }
        setSaving(true);

        const payload = {
            product_name: productName.trim(),
            product_quantity: productQuantity,
            product_barcode: productBarcode.trim(),
            product_unit_price: productUnitPrice,
            product_buying_price: productBuyingPrice,
            product_ncm: productNcm.trim(),
            product_cfop: productCfop.trim(),
            product_cest: productCest.trim(),
            product_unit: productUnit.trim(),
            product_origin: productOrigin,
            product_cst: productCst.trim(),
            product_icms: productIcms,
            product_ipi: productIpi,
            product_pis: productPis,
            product_cofins: productCofins,
            product_location: productLocation.trim(),
        };

        try {
            if (product) {
                await api.put(`/products/${product.product_id}`, payload);
                Toast.show({ type: 'success', text1: 'Produto atualizado com sucesso!' });
            } else {
                await api.post('/products', payload);
                Toast.show({ type: 'success', text1: 'Produto criado com sucesso!' });
            }
            navigation.goBack();
        } catch (err) {
            console.error(err);
            Toast.show({ type: 'error', text1: 'Falha ao salvar produto.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{product ? 'Editar' : 'Novo'} Produto</Text>



                <PaperInput
                    label="Nome do Produto"
                    mode="outlined"
                    value={productName}
                    onChangeText={setProductName}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Quantidade"
                    mode="outlined"
                    keyboardType="numeric"
                    value={String(productQuantity)}
                    onChangeText={t => setProductQuantity(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Código de Barras"
                    mode="outlined"
                    value={productBarcode}
                    onChangeText={setProductBarcode}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Preço de Compra"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productBuyingPrice)}
                    onChangeText={t => setProductBuyingPrice(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Preço de Venda"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productUnitPrice)}
                    onChangeText={t => setProductUnitPrice(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="NCM (8 dígitos)"
                    mode="outlined"
                    value={productNcm}
                    onChangeText={setProductNcm}
                    maxLength={8}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="CFOP (4 dígitos)"
                    mode="outlined"
                    value={productCfop}
                    onChangeText={setProductCfop}
                    maxLength={4}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="CEST (7 dígitos)"
                    mode="outlined"
                    value={productCest}
                    onChangeText={setProductCest}
                    maxLength={7}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Unidade (ex: pc, kg)"
                    mode="outlined"
                    value={productUnit}
                    onChangeText={setProductUnit}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="Origem (0-8)"
                    mode="outlined"
                    keyboardType="numeric"
                    value={String(productOrigin)}
                    onChangeText={t => setProductOrigin(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="CST/CSOSN (3 chars)"
                    mode="outlined"
                    value={productCst}
                    onChangeText={setProductCst}
                    maxLength={3}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="ICMS (%)"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productIcms)}
                    onChangeText={t => setProductIcms(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />



                <PaperInput
                    label="IPI (%)"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productIpi)}
                    onChangeText={t => setProductIpi(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="PIS (%)"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productPis)}
                    onChangeText={t => setProductPis(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    label="COFINS (%)"
                    mode="outlined"
                    keyboardType="decimal-pad"
                    value={String(productCofins)}
                    onChangeText={t => setProductCofins(Number(t) || 0)}
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                />

                <PaperInput
                    style={{
                        marginBottom: 20,
                        height: 60,
                        backgroundColor: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                    label="Localização (ex: GAVETA 1)"
                    mode="outlined"
                    value={productLocation}
                    onChangeText={setProductLocation}

                />

                <TouchableOpacity
                    style={[styles.button, saving && styles.buttonDisabled]}
                    onPress={handleSave}
                    disabled={saving}
                >
                    {saving
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>{product ? 'Atualizar' : 'Cadastrar'}</Text>
                    }
                </TouchableOpacity>
            </ScrollView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 12,
        marginBottom: 14,
        borderWidth: 1,


    },
    button: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 50,
    },
    buttonDisabled: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
