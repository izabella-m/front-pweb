<template>
  <div class="justify-start m-0">
    <h3 class="ml-5 titleSeccion m-0 p-0 align-start justify-start">Categorias</h3>
    <v-slide-group
      v-model="model"
      selected-class="bg-success"
      show-arrows
    >
      <v-slide-group-item
        v-for="genre in genres"
        :key="genre.id"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-col>
          <v-card
            :class="[selectedClass]"
            class="pl-5 categorieCard"
            @click="redirectToGenre(genre.id)"
            :elevation="10"
          >
          <div class="mt-3">
            <v-avatar size="40" :image="genre.images[0]"></v-avatar>
            <v-avatar size="40" :image="genre.images[1]" class="mx-n4"></v-avatar>
            <v-avatar size="40" :image="genre.images[2]"></v-avatar>
          </div>
          <p class="mt-3 titleCardCategories">{{ genre.name }}</p>
            <div class="d-flex fill-height">
              <v-scale-transition>
                <v-img
                  v-if="isSelected"
                  :src="genre.image"
                  class="genre-image"
                ></v-img>
              </v-scale-transition>
            </div>
          </v-card>
        </v-col>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>


<script>
export default {
  name: 'Categories',
  data() {
    return {
      model: null,
      genres: [
        { name: 'Ação', id: '28', images: ['/src/assets/categories/acao1.png', '/src/assets/categories/acao2.png', '/src/assets/categories/acao3.png'] },
        { name: 'Comédia', id: '35', images: ['/src/assets/categories/comedia1.png', '/src/assets/categories/comedia2.png', '/src/assets/categories/comedia3.png'] },
        { name: 'Drama', id: '18', images: ['/src/assets/categories/drama1.png', '/src/assets/categories/drama2.png', '/src/assets/categories/drama3.png'] },
        { name: 'Horror', id: '27', images: ['/src/assets/categories/terror1.png', '/src/assets/categories/terror2.png', '/src/assets/categories/terror3.png'] },
        { name: 'Ficção Científica', id: '878', images: ['/src/assets/categories/ficcaocientifica1.png', '/src/assets/categories/ficcaocientifica2.png', '/src/assets/categories/ficcaocientifica3.png'] },
        { name: 'Animação', id: '16', images: ['/src/assets/categories/animacao1.png', '/src/assets/categories/animacao2.png', '/src/assets/categories/animacao3.png'] },
        { name: 'Aventura', id: '12', images: ['/src/assets/categories/aventura1.png', '/src/assets/categories/aventura2.png', '/src/assets/categories/aventura3.png'] },
        { name: 'Fantasia', id: '14', images: ['/src/assets/categories/fantasia1.png', '/src/assets/categories/fantasia2.png', '/src/assets/categories/fantasia3.png'] },
        { name: 'Suspense', id: '53', images: ['/src/assets/categories/thriller1.png', '/src/assets/categories/thriller2.png', '/src/assets/categories/thriller3.png'] },        { name: 'Documentário', id: '99', images: ['/src/assets/categories/documentario1.png', '/src/assets/categories/documentario2.png', '/src/assets/categories/documentario3.png'] },
        { name: 'Musical', id: '10402', images: ['/src/assets/categories/musical1.png', '/src/assets/categories/musical2.png', '/src/assets/categories/musical3.png'] },
        { name: 'Guerra', id: '10752', images: ['/src/assets/categories/guerra1.png', '/src/assets/categories/guerra2.png', '/src/assets/categories/guerra3.png'] },
    ]
    };
  },
  methods: {
    redirectToGenre(genreId) {
      this.$router.push({ path: `/${genreId}` });
    }
  }
}
</script>

<style>

.titleSeccion {
  color: white;
  font-family: Inter;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}

.titleCardCategories {
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  color: rgb(255, 255, 255);
}

.categorieCard {
  width: 168px;
  height: 102px;
  background-color: #343434 !important;
  border-radius: 20px !important;
}


.categorieCard:hover {

  background-color: #f1ba21 !important;
}

</style>
