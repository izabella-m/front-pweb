<template>
  <div>
    <h1>Criar uma conta</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Senha" v-model="password"/></p>
    <p><button @click="register">Entrar</button></p>
    <p><button @click="signInWithGoogle">Entre com sua conta do Google</button></p>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { useRouter } from 'vue-router';

  const email = ref("");
  const password = ref("");
  const router = useRouter();

  const register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Successfully registered");
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push("/feed");
      })
      .catch((error) => {
        console.error(error);
      });
  };
</script>
