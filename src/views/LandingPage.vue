<template>
  <v-app style="background-color: #000000">
    <v-row>
      <v-col cols="6"> 
        <v-container class="fill-height">
          <div>
            <h1>Encontre filmes</h1> 
            <h2>Tenha o melhor do cinema em suas mãos</h2>
            <p class="descriptionTitle">Aqui você irá encontrar os melhores filmes para salvar. Você pode encontrar por busca ou mias assistidos, além de poder ver detalhes dos filmes, e tudo isso de graça!</p>
            <v-btn class="btnWelcome mt-10" variant="outlined" to="/register">
              <v-icon>mdi-play</v-icon>
              <p class="textBtnWelcome">Acesse agora mesmo</p>
            </v-btn>
          </div>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-container class="fill-height">
        <div class="cardBannerPosition d-flex">
          <v-card class="cardBannerPrincipal1 mt-10">
            <v-img src="/src/assets/LandingPageBanner1.png"></v-img>
          </v-card>
          <v-card class="cardBannerPrincipal">
            <v-img src="/src/assets/image.png"></v-img>
          </v-card>
          <v-card class="cardBannerPrincipal3 mt-10">
            <v-img src="/src/assets/LandingPageBanner2.png"></v-img>
          </v-card>
        </div>
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@100..900&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.fill-height {
  max-width: 600px;
}
h1 {
  font-family: "Oswald";
  color: white;
  font-size: 25px;
}

h2 {
  font-family: "Anton";
  font-size: 40px;
  font-weight: 200;
  background: linear-gradient(90deg, #2203FF, #C40D60);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cardBannerPrincipal1 {
  width: 200px;
  border-radius: 10px;
  transform: rotate(-10deg)
}

.cardBannerPrincipal {
  width: 200px;
  border-radius: 10px;

}

.cardBannerPrincipal3 {
  width: 200px;
  border-radius: 10px;
  transform: rotate(10deg)
}

.cardBannerPosition {
  justify-content: center;
  justify-items: center;
  align-items: center;
}


.descriptionTitle {
  font-family: poppins;
  color: white;
  
}

.btnWelcome {
  color: #C40D60;
  width: 190px;
}

.textBtnWelcome {
  font-family: poppins;
  font-size: 12px;
  font-weight: bold;
  text-transform: initial;
}
</style>
