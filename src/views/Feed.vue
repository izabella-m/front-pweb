<template>
  <v-app style="background-color: #1e1e1e">
    <h3 class="titleSeccion ml-4 mb-n2">Featured</h3>
    <div class="mx-n10">
      <v-slide-group
        v-model="currentSlide"
        class="pa-4"
        next-icon="mdi-plus"
        prev-icon="mdi-minus"
        show-arrows
      >
        <v-slide-group-item
          v-for="(image, slideIndex) in images"
          :key="slideIndex"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <v-card
            :class="['ma-4', selectedClass]"
            height="300"
            width="600"
            color="black"
          >
            <v-img cover class="h-100" :src="image"></v-img>
            <h2 class="text-overlay">Um lugar silencioso: DIa 1</h2>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>
    <Categories/>
      </v-app>
</template>


<script>
import Categories from '/src/components/categoriesCards.vue';

import api from '/src/services/api.js';

export default {
  components: {
    Categories,
  },
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
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.titleSeccion {
  color: white;
  font-family: Inter;
}

.text-overlay {
  position: absolute;
  bottom: 20px; /* Posição do texto, ajuste conforme necessário */
  left: 20px;  /* Posição do texto, ajuste conforme necessário */
  color: white; /* Cor do texto */
  font-size: 24px; /* Tamanho da fonte */
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  padding: 10px; /* Espaçamento interno */
}

.cardPrincipal {
  width: 200px;
  height: 380px;
  border-radius: 15px;
  background-color: #343434;
}


.styleTitleMovie {
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.mdi-minus::before {
  display: none;
}

.mdi-plus::before {
  display: none;
}

.titleCardEmphasis {
  font-size: 36px;
  z-index: 0;
  font-weight: 700;
  font-family: poppins;
}

.text-column {
  background-color: #000;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
