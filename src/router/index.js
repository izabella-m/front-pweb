<<<<<<< HEAD
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';
=======
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/LandingPage.vue'

const routes = [
  { path: '/', component: Home },
]
>>>>>>> d4782d106a61b36597c130f62c729d6d5b062825

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import ("../views/Home.vue")},
    { path: "/register", component: () => import ("../views/Register.vue")},
    { path: "/login", component: () => import ("../views/Login.vue")},
    {
      path: "/feed",
      component: () => import ("../views/Feed.vue"),
      meta:{
        requiresAuth: true,
      },
    },
  ],
});

<<<<<<< HEAD
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
      alert("you don't have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
=======
export default router

// // router.js

// import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/homePage.vue'
// // import Doubt from '@/views/Doubt.vue'
// import UnansweredQuestion from '@/views/unansweredQuestion.vue'
// import LoginPage from '@/views/Auth/LoginPage.vue'
// import RegisterPage from '@/views/Auth/RegisterPage.vue'
// import SubmitQuestion from '@/views/SubmitQuestionPage.vue'

// const routes = [
//   { path: '/', component: Home },
//   // { path: '/doubt', component: Doubt },
//   { path: '/unansweredquestion', component: UnansweredQuestion },
//   { path: '/login', component: LoginPage },
//   { path: '/register', component: RegisterPage },  
//   { path: '/makeQuestion', component: SubmitQuestion },  
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router
>>>>>>> d4782d106a61b36597c130f62c729d6d5b062825
