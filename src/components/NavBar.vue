<template>
<!-- FILTROS
    <div>
      <p class="pl-8 py-2">Filters</p>
      <p class="pl-5 nameFilterTitle">Years</p>
      <v-card :elevation="10" class="px-1 pt-1 filterYearCard mx-auto">
        <v-chip-group
          v-model="selectedYears"
          selected-class="text-red"
          column
          multiple
        >
        <v-chip
          v-for="(tag, index) in visibleTags"
          :key="index"
          class="mx-auto chipYears"
        >
          <p class="chipTextYear justify-center mx-auto">{{ tag }}</p>
        </v-chip>
      </v-chip-group>
      <v-card-actions class="my-n4 mr-n5">
        <v-spacer></v-spacer>
        <v-btn
          variant="plain"
          :text="showAll ? 'Mostrar menos' : 'Mostrar mais'"
          @click="showAll = !showAll"
          class=""
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="showAll">
          <v-card style="background-color: rgb(36, 36, 36)">
            <v-chip-group
            selected-class="text-red"
            column
            multiple
          >
            <v-chip
              v-for="(tag, index) in hddenTags"
              :key="'hidden-' + index"
              class="mx-auto chipYears"
            >
              <p class="chipTextYear justify-center mx-auto">{{ tag }}</p>
            </v-chip>
            </v-chip-group>
          </v-card>
        </div>
      </v-expand-transition>
      </v-card> 
    </div> -->
    
    <div id="nav" :elevation="2" class="d-flex">
        <!-- <v-img width="70" src="/src/assets/logoNavBar.png" id="logo"></v-img> -->
         <div class="d-flex me-auto">
          <router-link to="/feed"><h2 class="logo ml-10 mr-12">Lumini</h2></router-link>
          <router-link id="btnExplore" to="/popular"><p class="textsNavbar mt-n2">Em alta</p></router-link>
          <router-link id="btnTopRatings" to="/explore"><p class="textsNavbar mt-n2">Explorar</p></router-link>
        </div>
        <div>
          <div class="justify-end">
            <v-btn variant="plain" to="/favorites"><v-icon>mdi-heart-outline</v-icon></v-btn>
            <v-btn to="/profile"><v-icon>mdi-account</v-icon></v-btn>
          </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "NavBar",
    data: () => ({
      isSelectedPagePrincipal: false,
      tags: [
        '2024',
        '2023',
        '2022',
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2005',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
        '1999',
        '1998',
        '1997',
        '1996',
        '1995',
        '1994',
        '1993',
        '1992',
        '1991',
        '1990',
      ],
      show: false,
      showAll: false,
      searchQuery: '', // v-model da pesquisa

    }),
    computed: {
      visibleTags() {
        return this.tags.slice(0, this.maxVisibleTags);
      },
      hiddenTags() {
        return this.tags.slice(this.maxVisibleTags);
      },
    },
    methods: {
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
    // outras opções do componente
  }
</script>

<style>

.logo {
  font-family: Poppins;
  background: linear-gradient(to right, #2203FF, #C40D60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
}

.textsNavbar {
  font-family: Inter;
}

.textsNavbar:hover {
  background: linear-gradient(to right, #2203FF, #C40D60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nameFilterTitle {
  color: rgb(95, 95, 93);
  font-size: 12px;
}

.filterYearCard {
  width: 220px;
  background-color: rgb(36, 36, 36) !important;
}


.v-btn__content {
  width: 100px;
  font-size: 10px;
  text-transform: capitalize;
  letter-spacing: 0.2px;
}

.chipYears {
  width: 45px;
  height: 20px !important;
  color: rgb(255, 255, 255) !important;
}

.chipTextYear {
  font-size: 10px;
}

.v-list-item__overlay {
  background-color: none !important;
  opacity: 0;
}
.v-list-item--active {
  background-color: none !important;

}


/* aqui */
#nav {
  background-color: #252424;
  display: flex;
  padding: 4px;
}

#logo {
  margin-left: 10px;
}

#btnHome {
  color: white;
  text-decoration: none;
  font-family: Inter;
  font-weight: 600;
  margin-top: 15px;
  margin-left: 20px;
}

#btnExplore {
  color: white;
  text-decoration: none;
  font-family: Inter;
  font-weight: 600;
  margin-top: 15px;
  margin-left: 20px;
}

#btnTopRatings {
  color: white;
  text-decoration: none;
  font-family: Inter;
  font-weight: 600;
  margin-top: 15px;
  margin-left: 20px;
}

.textFieldSearchNavBar {
  max-width: 315px;
  max-height: 56px;
  margin-left: 100px;
  margin-right: 60px;
  padding-top: 10px;
}
</style>