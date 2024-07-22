<template>
  <v-app style="background-color: #1e1e1e">
    <v-row class="mx-0 mt-12">
      <v-card
        v-for="movie in favoriteMovies"
        :key="movie.imdbID"
        class="cardPrincipal mb-4 justify-center mx-auto"
      >
        <v-img height="296" cover :src="getImageUrl(movie.backdrop_path)">
          <div class="justify-end">
            <v-chip class="">
              <v-icon class="mr-2" color="#ffd54b">mdi-star</v-icon>
              <p style="font-family: Inter; font-weight: 700; color: #ffd54b">{{ (movie.vote_average).toFixed(1) }}</p>
            </v-chip>
          </div>
        </v-img>
        <h1 class="styleTitleMovie ml-3 mt-3">{{ movie.title }}</h1>
        <div class="ml-3">
          <p class="styleYearMovieCard">{{ movie.release_date.split('-')[0] }}</p>
        </div>
        <v-btn
          @click="removeMovieFromFavorites(movie.imdbID)"
          class="btnRemoveMovie mt-auto"
          icon="mdi-trash-can-outline"
          height="40"
          style="border-radius: 13px; max-width: 40px;"
        >
        </v-btn>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import { getFavorites, removeFavorite } from '/src/services/favorites.js';

export default {
  data() {
    return {
      favoriteMovies: []
    };
  },
  methods: {
    getImageUrl(path) {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return `${baseUrl}${path}`;
    },
    removeMovieFromFavorites(imdbID) {
      removeFavorite(imdbID);
      this.favoriteMovies = getFavorites();
      alert('Filme removido dos favoritos');
    }
  },
  created() {
    this.favoriteMovies = getFavorites();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

.cardPrincipal {
  width: 210px;
  height: 400px;
  background-color: #0c0c0c !important;
  border-radius: 15px;
  cursor: pointer;
}

.image-container {
  position: relative;
  width: 100%;
  height: 296px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Opacidade de 50% sobre a imagem */
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.text-overlay h3,
.text-overlay p {
  margin: 0;
}
.styleTitleMovie {
  font-size: 15px;
  font-family: Poppins;
  font-weight: 80px;
  letter-spacing: 0.1px;
  color: #f9f9f9;
}

.styleYearMovieCard {
  font-size: 16px;
  color: rgb(210, 210, 210);
  font-size: 12px;
  font-weight: 600;
}


.textBtnSeeMore {
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-family: Inter;
  font-weight: 700;
}
.styleYearMovie {
  font-size: 16px;
  color: grey;
}

.teste {
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.3); /* Ajuste a cor e a opacidade conforme necessário */
    color: white;
}
.btnRemoveMovie {
  background: linear-gradient(to right, #2203FF, #C40D60) !important;
}

.imageDialog {
opacity: 0.5;

}

.dialogTitleMovie {
  color: #ffffff;
  font-family: Poppins;

}

.dialogDescriptionMovie {
  font-family: Inter;

}
</style>
