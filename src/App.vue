<template>
  <NavBar />
  <router-view/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
