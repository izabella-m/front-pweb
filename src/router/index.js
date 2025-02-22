
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Favorites from '/src/views/favorites.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", component: () => import ("../views/LandingPage"), meta:{ hideNavbar: true }},
    { path: "/register", component: () => import ("../views/Register.vue"), meta:{ hideNavbar: true }},
    { path: "/login", component: () => import ("../views/Login.vue"), meta:{ hideNavbar: true }},
    { path: "/home", component: () => import ("../views/Home.vue"), meta:{ requiresAuth: true }},
    { path: "/feed", component: () => import ("../views/Feed.vue"), meta:{ requiresAuth: true }},
    { path: "/profile", component: () => import ("../views/profile.vue"), meta: { requiresAuth: true}},
    { path: "/popular", component: () => import ("../views/popularMovies.vue"), meta: { requiresAuth: true }},
    { path: "/explore", component: () => import ("../views/explorePage.vue"), meta: { requiresAuth: true }},
    { path: "/:id", component: () => import ("../views/categoriesPage.vue"), meta: { requiresAuth: true }},
    { path: "/favorites", name: Favorites, component: () => import ("../views/favorites.vue"), meta: { requiresAuth: true }},
  ],

});
const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const removeListener = onAuthStateChanged (
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)){
    if (await getCurrentUser()){
      next();
    } else{
      alert("Você não tem acesso!");
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
