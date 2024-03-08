<template>
  <div class="container">
    <h1>Liste des Personnages</h1>
    <router-link to="/">Accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'Personnages',
  // Méthode fetchPersonnages() pour récupérer les personnages depuis l'API
}
</script>

<style scoped>
@import url('../style.css');
</style>
