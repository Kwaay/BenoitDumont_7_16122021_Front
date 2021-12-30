<template>
  <div id="app">
    <Accueil msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Accueil from './components/Accueil.vue'

export default {
  name: 'App',
  components: {
    Accueil
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #020202;
  margin-top: 60px;
}
#app a {
  color: black !important;
}
</style>
