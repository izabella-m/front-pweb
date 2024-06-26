<template>
  <LandingPage />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-img :src="avatarImage" max-width="100%" max-height="100%" contain></v-img>
                </v-col>
                <v-col cols="8">
                  <v-text-field v-model="perfil.username" label="Usuário" readonly></v-text-field>
                  <v-text-field v-model="perfil.first_name" label="Nome" readonly></v-text-field>
                  <v-text-field v-model="perfil.email" label="Email" readonly></v-text-field>
                  <v-btn color="success" @click="logout">Sair</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LandingPage from '@/components/LandingPage.vue';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';

const perfil = ref({
  username: '',
  first_name: '',
  email: ''
});
const avatar = ref('');

const getPerfil = async () => {
  try {
    const user = await getAuth().currentUser;
    if (!user) return;

    const response = await axios.get(`/user/detail/${user.uid}/`);
    perfil.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserAvatar = async () => {
  try {
    const user = await getAuth().currentUser;
    if (!user) return;

    const response = await axios.get(`/user/image/${user.uid}/`);
    avatar.value = response.data.avatar;
  } catch (error) {
    console.error(error);
  }
};

const avatarImage = computed(() => {
  return avatar.value || 'https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png';
});

const logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    this.$router.push({ name: 'login' });
  }).catch((error) => {
    console.error(error);
  });
};

onMounted(() => {
  getPerfil();
  getUserAvatar();
});
</script>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
