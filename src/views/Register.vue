<template>
  <v-app style="background-color: #000000">
    <v-container class="fill-height mx-auto justify-center">
      <v-responsive class="align-center text-center fill-height">
        <h1 class="titleRegisterPage">Cadastre-se agora mesmo</h1>
        <p class="textDescriptionRegister mb-5">Crie sua conta gratuitamente e tenha acesso a +10000 conteúdos para explorar</p>
        
        <v-text-field 
          variant="underlined" 
          class="mx-auto justify-center emailField" 
          type="text" 
          placeholder="Email" 
          v-model="email"
        />
      
        <v-text-field
          variant="underlined" 
          class="mx-auto justify-center passwordField mb-10" 
          type="password" 
          placeholder="Senha" 
          v-model="password"
        />

        <v-btn
          class="btnRegister mb-2" 
          @click="register" 
          rounded 
          width="280">
          <p class="btnRegisterText">Criar conta</p>
        </v-btn>
      
        <v-container class="d-flex distancerDivider">
          <v-divider class="mx-auto ml-10" :thickness="3" color="white" width="10"></v-divider>
            <p class="mt-n2 mx-3" style="color: white; font-size: 12px">ou</p>
          <v-divider class="mx-auto mr-10" :thickness="3" color="white" width="10"></v-divider>
        </v-container>

        <v-btn 
          class="btnRegister" 
          rounded  
          @click="signInWithGoogle" 
          width="280">
          <v-img style="position: absolute; z-index: 1" src="/src/assets/googleicon.png" />
          <p class="btnRegisterText">Cadastre-se com sua conta do Google</p>
        </v-btn>

        <v-spacer></v-spacer>

        <p class="LoggedText mt-10">Já tem cadastro?<v-btn width="4" variant="icon" class="LoggedTextClick mb-1 ml-n3" @click="goToLogin"><p style="font-size: 12px; color: #ffffff; ">Login</p></v-btn></p>
      </v-responsive>
    </v-container>
  </v-app>
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
  
  function goToLogin() {
    router.push('/login');
  }
  
</script>

<style>

.fill-height {
  max-width: 380px;
}

.titleRegisterPage {
  font-family: "Anton";
  font-size: 35px;
  font-weight: 200;
  background: linear-gradient(90deg, #2203FF, #C40D60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.textDescriptionRegister {
  color: white;
  font-family: Inter;
}

.emailField {
  color: #ffffff;
  max-width: 350px;
}

.distancerDivider {
  margin-left: 10px;
}

.btnRegister {
  background: linear-gradient(to right, #2203FF, #C40D60) !important;
  color: white;
}

.btnRegisterText {
  color: #ffffff;
  font-weight: 500; 
  font-size: 12px; 
  font-family: poppins;
  text-transform: initial;
}

.passwordField {
  color: rgb(255, 255, 255);
  max-width: 350px;
}

.LoggedText {
  color: white;
  font-size: 12px;
}

.LoggedTextClick {
  color: white;
  cursor: pointer;
}

</style>