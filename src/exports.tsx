/*Components exports*/
export { default as DashboardLayout} from './components/dashboard-layout/dashboard-layout';
export { default as Sidebar } from './components/sidebar/sidebar';
export { default as Dashboard } from './components/dashboard/dashboard';

/*Types exports and assets*/
export type {Column} from './UI/tables/table';
export { default as Logo} from '../src/assets/stockmanagerlogo.png'


/*UI exports*/
export { default as MainCard} from './UI/mainCard/maincard';
export { default as Table } from './UI/tables/table';
export { default as Modal } from './UI/crudModal/modal'

/*Features exports*/
export { default as ProviderPage } from './features/providers/providerPage';
export { default as ProviderDetail } from './features/providers/providerDetail';
export { default as ProviderForm } from './features/providers/providerForm';

export { default as CategoryPage } from './features/categories/categoryPage';
export { default as CategoryDetail}  from './features/categories/categoryDetail';
export { default as CategoryForm } from './features/categories/CategoryForm';
 
export { default as ProductPage } from './features/products/productPage';

export { default as OrderPage } from './features/orders/orderPage';
export { default as Login } from './features/login/login';
export { default as SignUp } from './features/login/signup';