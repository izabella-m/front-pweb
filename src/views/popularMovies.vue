<template>
  <v-app style="background-color: #1e1e1e">
    <v-row class="mx-0 mt-12">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          v-bind="props"
          :elevation="isHovering ? 50 : 6"
          @click="openModal(movie)"
          v-for="movie in movies"
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
          <div class="d-flex align-end flex-column mr-2 mt-2">
            <v-btn
              @click.stop="addMovieToFavorites(movie)"
              class="btnSaveMovie mt-auto"
              icon="mdi-heart-outline"
              height="40"
              style="border-radius: 13px; max-width: 40px;"
            >
            </v-btn>
          </div>
          <v-dialog v-model="modalDetails" width="auto">
            <v-card max-width="800" color="#1e1e1e" :elevation="6">
              <v-img class="imageDialog" :src="getImageUrl(selectedMovie?.backdrop_path)" cover>
                <p @click="modalDetails = false" class="backToList"><v-icon>mdi-chevron-left</v-icon>Voltar</p>
                <h2 style="opacity: 10" class="dialogTitleMovie">{{ selectedMovie?.title }}</h2>
                <div>
                  <v-card-text class="d-flex">
                    <p class="dialogDescriptionMovie">{{ selectedMovie?.overview }}</p>
                  </v-card-text>
                </div>
              </v-img>
            </v-card>
          </v-dialog>
        </v-card>
      </v-hover>
    </v-row>
  </v-app>
</template>

<script>
import api from '/src/services/api.js';
import { addFavorite } from '/src/services/favorites.js';

export default {
  data() {
    return {
      movies: [],
      isHovering: false,
      isFavorited: false,
      modalDetails: false,
      selectedMovie: null
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await api.get('', {
          params: {
            s: 'movie',
            type: 'movie',
            page: 1
          }
        });
        if (response.data.results) {
          this.movies = this.getRandomMovies(response.data.results, 50);
          console.log('Resposta da API:', response.data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getRandomMovies(movies, count) {
      let shuffled = movies.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    getImageUrl(path) {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return `${baseUrl}${path}`;
    },
    openModal(movie) {
      this.selectedMovie = movie;
      this.modalDetails = true;
    },
    addMovieToFavorites(movie) {
      addFavorite(movie);
      alert('Filme adicionado à tela de favoritos');
    }
  },
  created() {
    this.fetchMovies();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
.btnSaveMovie {
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
