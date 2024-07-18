<template>
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
                <v-col cols="12" class="d-flex justify-center">
                  <v-avatar size="100">
                    <v-img :src="avatarUrl" />
                  </v-avatar>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="name" label="Nome" readonly></v-text-field>
                  <v-text-field v-model="email" label="Email" readonly></v-text-field>
                </v-col>
                <v-col cols="12" class="d-flex justify-center mt-4">
                  <v-btn color="error" @click="signOutUser">Sair</v-btn>
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
