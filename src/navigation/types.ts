// src/navigation/types.ts
import { UserInterface, ProductInterface } from '../common/interfaces';

export type RootStackParamList = {
    Login: undefined;
    Drawer: undefined;
    UserForm: { user?: UserInterface };
    ProductList: undefined;
    ProductForm: { product?: ProductInterface } | undefined;
};

// O Drawer só expõe telas “filhas” do RootStack:
export type DrawerParamList = Pick<
    RootStackParamList,
    'Drawer' | 'UserForm' | 'ProductList'
>;
