<template>
  <h1> Entre com uma conta</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Senha" v-model="password"/></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="register">Entrar</button></p>
  <p><button @click="signInWithGoogle">Entre com a sua conta do Google</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Login realizado com sucesso");
      console.log(auth.currentUser);
      router.push('/feed');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Email inválido";
          break;
        case "auth/user-not-found":
          errMsg.value = "Nenhuma conta com esse e-mail foi encontrada";
          break;
        case "auth/wrong-password":
          errMsg.value = "Senha incorreta";
          break;
        default:
          errMsg.value = "Erro desconhecido";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Login realizado com sucesso no Google");
      console.log(result.user);
      router.push('/feed');
    })
    .catch((error) => {
      console.log(error.code);
      errMsg.value = "Erro ao fazer login com o Google";
    });
};
</script>
