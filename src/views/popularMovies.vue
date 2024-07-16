<template>
  <v-app style="background-color: #1e1e1e">
    <v-container class="m-0 p-0">
    <v-row class="mx-0 mt-12">
        <v-card  v-for="movie in movies" :key="movie.imdbID" class="cardPrincipal justify-center mx-auto" :elevation="2">
          <!-- <v-img height="296" cover :src="getImageUrl(movie.backdrop_path)">
          </v-img> -->
          <div class="image-container">
            <v-img height="296" cover :src="getImageUrl(movie.backdrop_path)">
            </v-img>

            <div class="overlay px-4 d-flex align-start flex-column">
              <h1 class="styleTitleMovie mt-3 mb-auto">{{ movie.title }}</h1>
              <v-rating
                readonly
              ></v-rating>
          
              <v-row class="align-end mb-2">
                <div class="mt-12">
                  <p>{{ movie.release_date.split('-')[0] }}</p>
                </div>
                <div class="mx-auto">
                  <v-btn class="mr-2" color="#00B9AE" icon="mdi-heart-outline" height="50" style="border-radius: 13px; max-width: 50px;">
                  </v-btn>
                  <v-btn :elevation="0" class="teste" height="49" width="150" style="border-radius: 13px">
                    <p class="textBtnSeeMore">Veja mais</p>
                  </v-btn>
                </div>                 
              </v-row>

            </div>
          </div>  
          <!-- <v-card-title class="styleTitleMovie">{{ movie.title }}</v-card-title>
          <v-card-title class="styleTitleMovie">{{ movie.release_date }}</v-card-title>
          <v-rating
            v-model="scaledVoteAverage"
            class="ma-2"
            density="compact"
            ></v-rating>
          <v-row>
            <v-card-subtitle class="styleYearMovie" v-if="movie.Year">{{ movie.Year }}</v-card-subtitle>
            <v-btn width="10" @click="toggleHeart" variant="plain">
              <v-icon>{{ isFavorited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-row>
          <v-card-text>{{ movie.Plot }}</v-card-text> -->
        </v-card>
    </v-row>
  </v-container>
  </v-app>
</template>

<script>
import api from '/src/services/api.js';
 
export default {
  data() {
    return {
      movies: [],
      isHovering: false,
      isFavorited: false
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
          console.log('Resposta da API:', response.results.data);

        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getRandomMovies(movies, count) {
      let shuffled = movies.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    toggleHeart() {
      this.isFavorited = !this.isFavorited;
    },
    scaledVoteAverage() {
      // Divide a nota original por 2 para ajustar à escala de 0 a 5
      return this.movie.vote_average / 2;
    },
    getImageUrl(path) {
      const baseUrl = 'https://image.tmdb.org/t/p/w500';
      return `${baseUrl}${path}`;
    },
    convertToFiveStars(value) {
        return value / 2;
     }  // Divide o valor por 2 para obter a escala correta
  },
  computed: {

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
  width: 237px;
  height: 298px;
  margin: 10px;  
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
  font-size: 20px;
  font-family: Poppins;
  font-weight: 80px;
  letter-spacing: 0.1px;
  color: #f9f9f9;
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
</style>
