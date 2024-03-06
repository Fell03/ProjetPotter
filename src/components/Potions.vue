<template>
  <div class="potions">
    <h1>Liste des Potions</h1>
    <ul>
      <li v-for="potion in potions" :key="potion.id">
        <router-link :to="{ name: 'PotionDetails', params: { id: potion.id }}" class="potion-link">{{ potion.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Potions',
  data() {
    return {
      potions: []
    };
  },
  mounted() {
    this.fetchPotions();
  },
  methods: {
    async fetchPotions() {
      try {
        const response = await fetch('https://api.potterdb.com/v1/potions');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des potions');
        }
        const data = await response.json();
        this.potions = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.potions {
  padding: 20px;
}

.potion-link {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.potion-link:hover {
  color: #007bff;
}
</style>
