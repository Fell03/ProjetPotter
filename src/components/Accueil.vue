<template>
  <div>
    <h1>Accueil</h1>
    <button @click="goToPage('/potions')">Potions</button>
    <button @click="goToPage('/sorts')">Sorts</button>
    <button @click="goToPage('/livres')">Livres</button>
    <button @click="goToPage('/personnages')">Personnages</button>
  </div>
</template>

<script>
export default {
  name: 'Accueil',
  methods: {
    goToPage(path) {
      this.$router.push(path); // Redirige vers la page spécifiée
    }
  }
}
</script>

<style scoped>
/* Styles spécifiques à la page d'accueil */
</style>
