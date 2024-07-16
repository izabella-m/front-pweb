<template>
  <div>
    <h3 class="ml-5 titleSeccion">Categorias</h3>
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
            :class="['mx-0', selectedClass]"                   
            class="categorieCard"
            @click="redirectToGenre(genre.id)"
            :elevation="10"
          >
          <div class="ml-3 mt-3">
            <v-avatar size="40" :image="genre.images[0]"></v-avatar>
            <v-avatar size="40" :image="genre.images[1]" class="mx-n4"></v-avatar>
            <v-avatar size="40" :image="genre.images[2]"></v-avatar>
          </div>
          <p class="ml-3 mt-3 titleCardCategories">{{ genre.name }}</p>
            <div class="d-flex fill-height align-center justify-center">
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
        { name: 'Action', id: '28', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Comedy', id: '35', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Drama', id: '18', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Horror', id: '27', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Science Fiction', id: '878', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Animation', id: '16', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Adventure', id: '12', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Fantasy', id: '14', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Thriller', id: '53', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Documentary', id: '99', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'Musical', id: '10402', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
        { name: 'War', id: '10752', images: ['https://via.placeholder.com/150/FF0000', 'https://via.placeholder.com/150/FF6347', 'https://via.placeholder.com/150/FF4500'] },
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
  color: rgb(0, 0, 0);
}

.categorieCard {
  width: 168px;
  height: 102px;
  background-color: #343434;
  border-radius: 20px;
}

</style>