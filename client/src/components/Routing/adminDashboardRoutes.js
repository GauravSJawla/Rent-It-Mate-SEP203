// @material-ui/icons
import Person from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

// core components/views for Admin layout
import ListUsers from 'views/ProfilePage/ListUsers';
import CategoryPage from 'views/CategoryPage/CategoryPage';


const adminDashboardRoutes = [
    {
        path: '/all-users',
        name: 'All users',
        icon: Person,
        component: ListUsers,
        layout: '/admin-dashboard'
    },
    {
        path: '/category',
        name: 'Add Category',
        icon: AddIcon,
        component: CategoryPage,
        layout: '/admin-dashboard'
      }
];
export default adminDashboardRoutes;
