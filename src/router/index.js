// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/LandingPage.vue'

const routes = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

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