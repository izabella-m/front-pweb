<template>
  <h1> Entre com uma conta</h1>
  <p><input type="text" placeholder="Email" v-model="Email"/></p>
  <p><input type="password" placeholder="Senha" v-model="Senha"/></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="register">Entrar</button></p>
  <p><button @click="signInWithGoogle">Entre com sua conta do Google</button></p>
</template>

  <script setup>
      import { ref } from "vue";
      import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
      import { useRouter } from 'vue-router';
      const email = ref("");
      const password = ref("");
      const errMsg = ref()
      const router = useRouter()

      const register = () => {
          const auth = getAuth()
          signInWithEmailAndPassword(auth, email.value, password.value).then(() => {
              console.log("Sucessfully signed in");

              console.log(auth.currentUser)

              router.push('/feed')
          })
          .catch((error) => {
              console.log(error.code);
              switch (error.code){
                  case "auth/invalid-email":
                      errMsg.value = "Invalid email";
                      break;
                  case "auth/user-not-found":
                      errMsg.value = "No account with that email was found";
                      break;
                  case "auth/wrong-password":
                      errMsg.value = "Incorrect password";
                      break;
              }
          });
      };

      const signInWithGoogle = () => {

      }
  </script>
