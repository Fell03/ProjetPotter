<template>
  <div class="potion-details" v-if="potion">
    <h1>{{ potion.name }}</h1>
    <p><strong>Description:</strong> {{ potion.description }}</p>
    <!-- Ajoutez ici d'autres détails de la potion -->
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'PotionDetails',
  data() {
    return {
      potion: null
    };
  },
  mounted() {
    this.fetchPotion();
  },
  methods: {
    async fetchPotion() {
      try {
        const response = await fetch(`https://api.potterdb.com/v1/potions/${this.$route.params.id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de la potion');
        }
        const data = await response.json();
        this.potion = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.potion-details {
  padding: 20px;
}

.potion-details h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.potion-details p {
  font-size: 16px;
  margin-bottom: 5px;
}

/* Ajoutez ici d'autres styles CSS pour les détails de la potion */
</style>
