// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components/views for Admin layout
import DashboardProfile from 'views/Dashboard/DashboardProfile';
import CreateProfile from 'views/ProfilePage/CreateProfile';
import EditProfile from 'views/ProfilePage/EditProfile';
import CategoryPage from 'views/CategoryPage/CategoryPage';

const dashboardRoutes = [
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: DashboardProfile,
    layout: "/dashboard"
  },
  {
    path: "/create-profile",
    name: "Create Profile",
    icon: Person,
    component: CreateProfile,
    layout: "/dashboard"
  },
  {
    path: "/edit-profile",
    name: "Edit Profile",
    icon: Person,
    component: EditProfile,
    layout: "/dashboard"
  },
  {
    path: "/category",
    name: "Add Category",
    icon: Person,
    component: CategoryPage,
    layout: "/dashboard"
  },
];

export default dashboardRoutes;
