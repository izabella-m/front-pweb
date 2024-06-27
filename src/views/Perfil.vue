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
                <v-col cols="12">
                  <v-text-field v-model="name" label="Nome" readonly></v-text-field>
                  <v-text-field v-model="email" label="Email" readonly></v-text-field>
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
import { getAuth } from 'firebase/auth';

const name = ref('');
const email = ref('');

onMounted(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    email.value = user.email;
    name.value = user.displayName || '';
  } else {
    console.error("User not logged in");
  }
});
</script>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
