// src/screens/UserFormScreen.tsx

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import api from '../services/api';
import * as ImageManipulator from 'expo-image-manipulator';


type Profile = { profile_id: number; profile_name: string };
type Company = { company_id: number; company_name: string };
type User = {
    user_id: number;
    user_name: string;
    user_email: string;
    user_profile_id: number;
    company_id?: number;
    avatar?: string;
};

export default function UserFormScreen({ route, navigation }: any) {
    const editingUser: User | undefined = route.params?.user;
    const [name, setName] = useState(editingUser?.user_name ?? '');
    const [email, setEmail] = useState(editingUser?.user_email ?? '');
    const [profileId, setProfileId] = useState<number>(editingUser?.user_profile_id ?? 0);
    const [companyId, setCompanyId] = useState<number | undefined>(editingUser?.company_id);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null);

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const resp = await api.get('/profile');
                setProfiles(resp.data);
            } catch { }
            try {
                const resp = await api.get('/company');
                setCompanies(resp.data.items || resp.data);
            } catch { }
            if (editingUser?.avatar) {
                try {
                    const r = await api.post('/s3/path', { path: editingUser.avatar });
                    setAvatarUri(r.data.url);
                } catch { }
            }
        })();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({ type: 'error', text1: 'Permissão negada' });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // imagem original
            allowsEditing: true,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            // 🔽 Redimensiona a imagem para máximo de 800px
            const manipulated = await ImageManipulator.manipulateAsync(
                asset.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            const fileName = manipulated.uri.split('/').pop()!;
            const mimeType = 'image/jpeg';

            setAvatarUri(manipulated.uri);
            setFile({
                uri: manipulated.uri,
                name: fileName,
                type: mimeType,
            });
        }
    };

    const handleSubmit = async () => {
        if (!name || !email || !profileId) {
            return Toast.show({ type: 'info', text1: 'Preencha todos os campos' });
        }

        const form = new FormData();
        form.append('user_name', name);
        form.append('user_email', email);
        form.append('user_profile_id', String(profileId));

        if (companyId) {
            form.append('company_id', String(companyId));
        }

        if (avatarUri && file) {
            const formattedUri = avatarUri.startsWith('file://') ? avatarUri : `file://${avatarUri}`;
            form.append('file', {
                uri: formattedUri,
                name: file.name,
                type: file.type || 'image/jpeg',
            } as any);
        }

        try {
            setLoading(true);

            const endpoint = editingUser
                ? `/user/${editingUser.user_id}`
                : '/user';
            const method = editingUser ? api.put : api.post;

            await method(endpoint, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Toast.show({
                type: 'success',
                text1: editingUser ? 'Usuário atualizado!' : 'Usuário criado!',
            });
            navigation.goBack();

        } catch (err: any) {
            console.error('Erro ao salvar usuário:', err.response?.data || err);
            const msg = err.response?.data?.message || 'Falha ao salvar usuário';
            Toast.show({ type: 'error', text1: 'Erro', text2: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={styles.scrollView}                    // <- ocupa full screen
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="always"           // <- garante que o toque passe
            >
                <Text style={styles.heading}>
                    {editingUser ? 'Editar Usuário' : 'Criar Usuário'}
                </Text>

                <TouchableOpacity
                    style={styles.avatarBox}
                    onPress={pickImage}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // <- amplia área de toque
                >
                    {avatarUri
                        ? <Image source={{ uri: avatarUri }} style={styles.avatar} />
                        : <Text style={styles.avatarPlaceholder}>+</Text>
                    }
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Perfil</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={profileId} onValueChange={v => setProfileId(v)}>
                        <Picker.Item label="Selecione..." value={0} />
                        {profiles.map(p => (
                            <Picker.Item key={p.profile_id} label={p.profile_name} value={p.profile_id} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Empresa (opcional)</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={companyId} onValueChange={v => setCompanyId(v)}>
                        <Picker.Item label="Nenhuma" value={undefined} />
                        {companies.map(c => (
                            <Picker.Item key={c.company_id} label={c.company_name} value={c.company_id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}   // <- e aqui também
                >
                    {loading
                        ? <ActivityIndicator color="#fff" />
                        : <Text style={styles.buttonText}>
                            {editingUser ? 'Atualizar' : 'Criar'}
                        </Text>
                    }
                </TouchableOpacity>
            </ScrollView>

            <Toast />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1 },
    scrollView: { flex: 1 },
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    avatarBox: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: '#ddd',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 16
    },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    avatarPlaceholder: { fontSize: 32, color: '#666' },
    input: {
        width: '100%', padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8, marginBottom: 12
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 4,
        fontWeight: '600'
    },
    pickerWrapper: { width: '100%', backgroundColor: '#fff', borderRadius: 8, marginBottom: 12 },
    button: {
        marginTop: 8,
        width: '100%',
        padding: 14,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonDisabled: { backgroundColor: '#999' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
