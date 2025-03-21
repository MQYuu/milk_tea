import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import Cart from '../pages/Cart.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Contact from '../pages/Contact.vue'
import Profile from '../pages/Profile.vue'
import Chang_Password from '../pages/Chang_Password.vue'

const routes = [
  {path: '/', component: Home },
  {path: '/listProducts', component: Products},
  {path: '/cart', component: Cart},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/contact', component: Contact},
  {path: '/profile', component: Profile},
  {path: '/change-password', component: Chang_Password}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;