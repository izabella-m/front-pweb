<template>
  <div class="hello">
    <v-btn to="/login"> login</v-btn>
    <v-btn to="/register"> register</v-btn>

    <h3> LINK PARA O REPOSITÓRIO</h3>
    <ul>
      <li><a href="https://github.com/izabella-m/front-pweb" target="_blank" rel="noopener">LUMIERE</a></li>
    </ul>
  </div>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
