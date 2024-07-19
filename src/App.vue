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

</style>
