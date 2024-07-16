<template>
  <v-app style="background-color: #1e1e1e">
    <v-container>
      <v-text-field
        v-model="searchQuery"
        @keyup.enter="searchMovies"
        append-inner-icon="mdi-magnify"
        density="compact"
        placeholder="Pesquisar filmes"
        hide-details
        rounded
        single-line
        @click:append-inner="searchMovies"
      ></v-text-field> 
      <v-row v-if="movies.length" class="mt-3">
        <div
          v-for="movie in movies"
          :key="movie.imdbID"
          class="ma-3 mx-auto"
        >
        <v-hover v-slot="{ isHovering, props }">

          <v-card class="cardPrincipal" :elevation="2" v-bind="props">
            <v-img height="296" cover :src="movie.Poster">
              <v-expand-transition>
                <div
                  v-if="isHovering"
                  class="d-flex transition-fast-in-fast-out bg-grey-darken-2 v-card--reveal text-h2"
                  style="height: 100%"
                >
                  See more
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-title class="styleTitleMovie">{{ movie.Title }}</v-card-title>
            <v-row>
              <v-card-subtitle class="styleYearMovie" v-if="movie.Year">{{ movie.Year }}</v-card-subtitle>
              <v-btn width="10" @click="toggleHeart" variant="plain">
                <v-icon>{{ isFavorited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              </v-btn>
            </v-row>
            <v-card-text>{{ movie.Plot }}</v-card-text>
          </v-card>
        </v-hover>
        </div>
      </v-row>
      <!-- <v-alert v-else-if="!loading && movies.length === 0" type="info">
        Nenhum filme do ano 2000 encontrado
      </v-alert>
      <v-alert type="error" v-if="error">{{ error }}</v-alert>
      <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>  -->
    </v-container>
  </v-app>
</template>

<script>

import api from '/src/services/apiGeneral.js';

export default {
  data() {
    return {
      currentSlide: 0, //slides
      numberOfSlides: 3, // slides visíveis
      images: [
        "/src/assets/umLugarSIlencioso.png",
        "/src/assets/furiosa.png",
        "/src/assets/divertidamenteBanner.png"
      ], // imagens dos slides
      movie: {},
      loading: false,
      error: null,
      movies: [],
      isFavorited: false, // card do resultado da pesquisa
      searchQuery: '', // v-model da pesquisa
    };
  },
  created() {
    this.fetchMovieData();
  },
  mounted() {
    this.fetchMovies();
    this.startAutoSlide();
  },
  methods: {
    startAutoSlide() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.numberOfSlides;
      }, 4000); // Define 4 segundos para a mudança de card
    },
    toggleHeart() {
      this.isFavorited = !this.isFavorited;
    }, // Estado do botão de curtida
    async fetchMovieData() {
      this.loading = true;
      this.error = null;

      console.log('Iniciando requisição para a API...');
      
      try {
        const response = await api.get('', {
          params: { i: 'tt3896198' }
        });

        console.log('Resposta da API:', response.data.results);

        this.movie = response.data.results;
      } catch (error) {
        console.error('Erro ao carregar os dados:', error.message);
        this.error = 'Erro ao carregar os dados: ' + error.message;
      } finally {
        this.loading = false;
      }
    },  
    async fetchMovies() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get('', {
          params: {
            s: '', // Termo de busca genérico para trazer filmes variados
            y: '2000', // Filtrar por ano 2000
            apikey: 'd8c16e35',
            type: 'movie',
          },
        });

        if (response.data.Response === 'False') {
          this.error = response.data.Error;
          this.movies = [];
        } else if (response.data.Search.length === 0) {
          // Se não há filmes na resposta, exibe o alerta
          this.error = 'Nenhum filme do ano 2000 encontrado';
          this.movies = [];
        } else {
          // Filtrar os filmes antes de armazenar em 'movies'
          this.movies = response.data.Search.filter((movie) => movie.Year === '2000');
        }
      } catch (error) {
        this.error = 'Erro ao carregar os dados: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
    btnHome() {
        this.isSelectedPagePrincipal = !this.isSelectedPagePrincipal; // Altera o estado do botão
      },
      async searchMovies() {
      if (!this.searchQuery) {
        alert('Preencha o campo de pesquisa!');
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await api.get('', {
          params: { s: this.searchQuery, apikey: 'd8c16e35' }
        });

        if (response.data.Response === 'False') {
          this.error = response.data.Error;
          this.movies = [];
        } else {
          this.movies = response.data.Search;
        }
      } catch (error) {
        this.error = 'Erro ao carregar os dados: ' + error.message;
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>