import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import ProductoRc from "../views/ProductoRc.vue";
import RegistroPerfil   from "../views/RegistroPerfil.vue";
import PerfilEditar from "../views/PerfilEditar.vue";
import UsuarioRegistro from "../views/UsuarioRegistro.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/RegistroPerfil",
    name: "RegistroPerfil",
    component: RegistroPerfil,
  },
  { path: '/PerfilEditar/:idPerfil', name: 'PerfilEditar', component: PerfilEditar },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/UsuarioRegistro",
    name: "UsuarioRegistro",
    component: UsuarioRegistro,
  },
  {
    path: "/productorc",
    name: "ProductoRc",
    component: ProductoRc,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
