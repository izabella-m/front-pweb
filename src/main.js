/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

import router from './router/index';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBM0wXgP5fHGRzaYKOaEFD-VUaKzGyz4VE",
  authDomain: "lumiere-pweb.firebaseapp.com",
  projectId: "lumiere-pweb",
  storageBucket: "lumiere-pweb.appspot.com",
  messagingSenderId: "596129220953",
  appId: "1:596129220953:web:716ae336262a54399f6448"
};

  // Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

registerPlugins(app);

app.use(router);

app.mount('#app');
