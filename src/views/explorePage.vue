<template>
  <v-app style="background-color: #1e1e1e">
    <div>
      <v-text-field
        v-model="searchQuery"
        @keyup.enter="searchMovies"
        append-inner-icon="mdi-magnify"
        density="compact"
        placeholder="Pesquisar filmes"
        hide-details
        rounded
        @click:append-inner="searchMovies"
        max-width="200"
        variant="flat"
        bg-color="white"
      ></v-text-field> 
    </div>
    <v-row v-if="movies.length" class="mt-12 mx-0">
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="ma-3 mx-auto"
      >
        <v-card class="cardPrincipal mb-4 justify-center mx-auto">
        <v-img height="290" cover class="m-0 p-0" :src="movie.Poster"></v-img>
        <h1 class="styleTitleMovie ml-3 mt-3">{{ movie.Title }}</h1>
        <div class="ml-3">
          <p class="styleYearMovieCard">{{ movie.Year }}</p>
        </div>
        <div class="d-flex align-end flex-column mr-2 mt-2">
          <v-btn 
            @click="movieSaveDatabase" 
            class="btnSaveMovie mt-auto" 
            icon="mdi-heart-outline" 
            height="40" 
            style="border-radius: 13px; max-width: 40px;"
          >
          </v-btn>
        </div>                 
        </v-card>
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
      </div>
    </v-row>
      <!-- <v-alert v-else-if="!loading && movies.length === 0" type="info">
        Nenhum filme do ano 2000 encontrado
      </v-alert>
      <v-alert type="error" v-if="error">{{ error }}</v-alert>
      <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>  -->
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
      modalDetails: false,
      selectedMovie: null,
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
        this.movies = [];

        try {
          const promises = [];
          const resultsPerPage = 10; // OMDb retorna 10 resultados por página
          const totalPages = 5; // Queremos 50 resultados, então 5 páginas

          for (let page = 1; page <= totalPages; page++) {
            const promise = api.get('', {
              params: { s: this.searchQuery, apikey: 'd8c16e35', page }
            });
            promises.push(promise);
          }

          const responses = await Promise.all(promises);

          responses.forEach(response => {
            console.log('Resposta da API:', response.data); // Log da resposta da API

            if (response.data.Response === 'True') {
              this.movies.push(...response.data.Search);
            } else if (response.data.Response === 'False' && !this.error) {
              this.error = response.data.Error;
            }
          });

          if (this.movies.length === 0 && this.error) {
            this.error = 'Nenhum filme encontrado';
          }
        } catch (error) {
          this.error = 'Erro ao carregar os dados: ' + error.message;
        } finally {
          this.loading = false;
        }
      },
    openModal(movie) { //modal dos detalhes do filme
      this.selectedMovie = movie;
      this.modalDetails = true;
    },
  }
};
</script>

<style>

  .cardPrincipal {
    width: 210px;
    height: 400px;
    background-color: #0c0c0c !important;
    border-radius: 15px !important;
    cursor: pointer;
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

