<template>
  <v-app style="background-color: #000000">
    <v-container class="fill-height mx-auto justify-center">
      <v-responsive class="align-center text-center fill-height">
        <h1 class="titleLoginPage">Bem-vindo de volta</h1>
        <p class="textDescriptionLogin mb-5">Entre para explorar e continue sua jornada pelo mundo dos filmes</p>
        <v-text-field
          variant="underlined"
          type="text"
          placeholder="Email"
          v-model="email"
          class="mx-auto justify-center emailField"
        />
        <v-text-field
          variant="underlined"
          class="mx-auto justify-center passwordField mb-10"
          type="password"
          placeholder="Senha"
          v-model="password"
        />
        <p v-if="errMsg">{{ errMsg }}</p>
        <v-btn
          @click="register"
          class="btnLogin"
          rounded
          width="280">
          <p class="btnLoginText">Entre</p>
        </v-btn>

        <v-container class="d-flex distancerDivider">
          <v-divider class="mx-auto ml-10" :thickness="3" color="white" width="10"></v-divider>
            <p class="mt-n2 mx-3" style="color: white; font-size: 12px">ou</p>
          <v-divider class="mx-auto mr-10" :thickness="3" color="white" width="10"></v-divider>
        </v-container>

        <v-btn
          @click="signInWithGoogle"
          class="btnLogin"
          rounded
          width="280">
            <p class="btnLoginText">Entre com sua conta do Google</p>
        </v-btn>

        <v-spacer></v-spacer>

        <p class="registerTextRoute mt-10">Ainda não tem uma conta?<v-btn width="4" variant="icon" class="LoggedTextClick mb-1 ml-2" @click="goToRegister"><p style="font-size: 12px; color: #ffffff; text-transform: initial">Cadastre-se</p></v-btn></p>
      </v-responsive>
    </v-container>
  </v-app>
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
        console.log("Successfully signed in");
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
            errMsg.value = "No account with that email was found";
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
        console.log("Successfully signed in with Google");
        console.log(result.user);
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        errMsg.value = "Erro ao fazer login com o Google";
      });
  };

  function goToRegister() {
    router.push('/register');
  }
</script>

<style>

.fill-height {
  max-width: 380px;
}

.titleLoginPage {
  font-family: "Anton";
  font-size: 35px;
  font-weight: 200;
  background: linear-gradient(90deg, #2203FF, #C40D60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.textDescriptionLogin {
  color: white;
  font-family: Inter;
}

.emailField {
  color: #ffffff;
  max-width: 350px;
}

.passwordField {
  color: rgb(255, 255, 255);
  max-width: 350px;
}

.btnLogin {
  background: linear-gradient(to right, #2203FF, #C40D60) !important;
  color: white;
}

.btnLoginText {
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  font-family: poppins;
  text-transform: initial;
}

.distancerDivider {
  margin-left: 10px;
}

.registerTextRoute {
  color: white;
  font-size: 12px;
}
</style>
