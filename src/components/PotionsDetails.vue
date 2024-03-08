<!-- PotionDetails.vue -->
<template>
  <div v-if="potion">
    <h1>{{ potion.name }}</h1>
    <p>{{ potion.description }}</p>
    <!-- Autres détails de la potion -->
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'PotionDetails',
  // Méthode fetchPotionDetails() pour récupérer les détails d'une potion depuis l'API
}
</script>

<style scoped>
@import url('../style.css');
</style>
