<template>
  <v-app style="background-color: #1e1e1e">
    <v-container class="fill-height mx-auto justify-center">
        <v-card width="500" color="#343434">
          <v-card-title>
            <span class="headline">Perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="100">
                    <v-img :src="avatarUrl" />
                  </v-avatar>
                </v-col>
                <v-col cols="12">
                  <v-text-field variant="underlined" v-model="name" label="Nome" readonly></v-text-field>
                  <v-text-field variant="underlined" v-model="email" label="Email" readonly></v-text-field>
                </v-col>
                <v-col cols="12" class="d-flex justify-center mt-4">
                  <v-btn color="error" @click="signOutUser"><p style="font-family: Inter; font-size: 14px">Sair</p></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
    </v-container>  
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import defaultAvatar from '@/assets/avatar.jpg';

const name = ref('');
const email = ref('');
const avatarUrl = ref(defaultAvatar);
const router = useRouter();


onMounted(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    email.value = user.email;
    name.value = user.displayName || '';
    avatarUrl.value = user.photoURL || defaultAvatar;
  } else {
    console.error("User not logged in");
  }
});

const signOutUser = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.push('/login');
  }).catch((error) => {
    console.error("Erro ao fazer logout:", error);
  });
};
</script>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
