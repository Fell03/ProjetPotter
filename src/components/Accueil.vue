<template>
  <div>
    <h1>Accueil</h1>
    <router-link to="/potions">Potions</router-link>
    <router-link to="/sorts">Sorts</router-link>
    <router-link to="/livres">Livres</router-link>
    <router-link to="/personnages">Personnages</router-link>
  </div>
</template>

<script>
export default {
  name: 'Accueil'
}
</script>

<style scoped>
/* Styles spécifiques à la page d'accueil */
</style>
