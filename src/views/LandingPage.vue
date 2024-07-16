<template>
  <v-app>
    <v-main class="backgroundPage">
      
        <v-carousel class="d-md-none" progress="primary" hide-delimiters>
          <v-carousel-item cover>
           <img src="/src/assets/bannerMovies.png"/>
          </v-carousel-item>
          <v-carousel-item>
            <img src="/src/assets/chairsMovies.jpg"/>
          </v-carousel-item>
          <v-carousel-item >
            <img default src="/src/assets/chairsMovies.jpg"/>
          </v-carousel-item>
        </v-carousel>
        <!-- <v-img src="/"></v-img> -->
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      return: {
      },
    
    }),
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Sora&display=swap');

* {
font-family: 'Sora', sans-serif;
}

.backgroundPage {
  background-color: #000000; 
}

</style>








