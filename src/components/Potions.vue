<!-- Potions.vue -->
<template>
  <div>
    <h1>Liste des Potions</h1>
    <ul>
      <li v-for="potion in potions" :key="potion.id">
        <router-link :to="{ name: 'PotionDetails', params: { id: potion.id }}">{{ potion.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Potions',
  // Méthode fetchPotions() pour récupérer les potions depuis l'API
}
</script>

<style scoped>
/* Styles spécifiques à la liste des potions */
</style>
