// // src/navigation/types.ts
// import { UserInterface, ProductInterface } from '../common/interfaces';

// export type RootStackParamList = {
//     Login: undefined;
//     Drawer: undefined;
//     UserForm: { user?: UserInterface };
//     ProductList: undefined;
//     ProductForm: { product?: ProductInterface } | undefined;
// };

// // O Drawer só expõe telas “filhas” do RootStack:
// export type DrawerParamList = Pick<
//     RootStackParamList,
//     'Drawer' | 'UserForm' | 'ProductList'
// >;


// src/navigation/types.ts

import { UserInterface, ProductInterface } from '../common/interfaces';

//
// ROOT STACK (contém Login, Drawer Container e telas “fora” do Drawer)
//
export type RootStackParamList = {
    Login: undefined;
    Drawer: undefined;                    // container do DrawerNavigator
    UserForm: { user?: UserInterface };
    ProductList: undefined;                    // rota para a listagem
    ProductForm: { product?: ProductInterface } | undefined;  // rota para o form
};

//
// DRAWER NAVIGATOR (apenas as telas que aparecem no menu lateral)
//
export type DrawerParamList = {
    Home: undefined;  // sua tela inicial (HomeScreen)
    Users: undefined;  // UsersScreen, se permitido
    ProductList: undefined;  // ProductListScreen
};
