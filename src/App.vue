<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <NavBar v-if="!route.meta.hideNavbar && isLoggedIn" />
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from './router/index';
import NavBar from './components/NavBar.vue';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth ();
  onAuthStateChanged(auth, (user) => {
    if (user){
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
