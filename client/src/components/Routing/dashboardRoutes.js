// @material-ui/icons
import Person from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

// core components/views for layout
import DashboardProfile from 'views/Dashboard/DashboardProfile';
//import CreateProfile from 'views/ProfilePage/CreateProfile';
//import EditProfile from 'views/ProfilePage/EditProfile';
import CategoryPage from 'views/CategoryPage/CategoryPage';
import ProductPage from 'views/ProductPage/Product';

const dashboardRoutes = [
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: DashboardProfile,
    layout: '/dashboard'
  },
  {
    path: '/category',
    name: 'Add Category',
    icon: AddIcon,
    component: CategoryPage,
    layout: '/dashboard'
  },
  {
    path: '/create-product',
    name: 'Add Product',
    icon: AddIcon,
    component: ProductPage,
    layout: '/dashboard'
  }
];
export default dashboardRoutes;
