<template >
  <v-app id="app">


</v-app>
</template>

<script>
  export default {
    data: () => ({
      return: {
      },
      step: 1,
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      images: [ '@/assets/chairsMovies.jpg', '@/assets/chairsMovies.jpg']

    }),
    computed: {
      currentTitle() {
        switch (this.step) {
          case 1:
            return 'Sign-up'
          case 2:
            return 'Create a password'
          default:
            return 'Account created'
        }
      },
    },
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Sora&display=swap');

* {
font-family: 'Sora', sans-serif;
}

</style>








