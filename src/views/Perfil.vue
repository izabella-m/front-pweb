<template>
  <LandingPage />
  <v-contaner>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Perfil</span>
          </v-card-title>
          <v-card-text>
            <!-- perfil view-->
            <!-- {{ perfil view }} -->
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                   v-model="perfil.username"
                   label="Usuário"
                   readonly>
                  </v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                   v-model="perfil.first_name"
                   label="Nome"
                   readonly>
                  </v-text-field></v-col>
              </v-row>
            </v-container>

          </v-card-text>
        </v-card>
      </v-col>
  </v-contaner>
</template>

<script setup>
  import LandingPage from '@/components/LandingPage.vue'
</script>
