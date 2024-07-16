
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { path: "/", component: () => import ("../views/Home.vue")},
    { path: "/register", component: () => import ("../views/Register.vue")},
    { path: "/login", component: () => import ("../views/Login.vue")},
    { path: "/feed", component: () => import ("../views/Feed.vue"), meta:{ requiresAuth: true }},
    { path: "/profile", component: () => import ("../views/profile.vue"), meta: { requiresAuth: true }},
    { path: "/popular", component: () => import ("../views/popularMovies.vue"), meta: { requiresAuth: true }},
    { path: "/explore", component: () => import ("../views/explorePage.vue"), meta: { requiresAuth: true }},
    { path: "/:id", component: () => import ("../views/categoriesPage.vue"), meta: { requiresAuth: true }},
    { path: "/favorites", component: () => import ("../views/favorites.vue"), meta: { requiresAuth: true }},
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
