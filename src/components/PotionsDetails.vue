<template>
  <div class="potion-details-container">
    <div v-if="potion" class="potion-details">
      <h1>{{ potion.attributes.name }}</h1>
      <router-link to="/potions">Retour à la liste des potions</router-link>
      <img :src="potion.attributes.image" alt="Image de la potion" v-if="potion.attributes.image" />
      <div class="details">
        <p><strong>Caractéristiques:</strong> {{ potion.attributes.characteristics }}</p>
        <p><strong>Difficulté:</strong> {{ potion.attributes.difficulty }}</p>
        <p><strong>Effet principal:</strong> {{ potion.attributes.effect }}</p>
        <p><strong>Inventeurs:</strong> {{ potion.attributes.inventors }}</p>
        <p><strong>Ingrédients:</strong> {{ potion.attributes.ingredients }}</p>
        <p><strong>Fabricants:</strong> {{ potion.attributes.manufacturers }}</p>
        <p><strong>Effets secondaires:</strong> {{ potion.attributes.side_effects }}</p>
        <p><strong>Temps nécessaire:</strong> {{ potion.attributes.time }}</p>
        <a :href="potion.attributes.wiki" target="_blank" v-if="potion.attributes.wiki">Wiki Harry Potter</a>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Potions from "./Potions.vue";

export default {
  name: 'PotionDetails',
  components: {Potions},
  data() {
    return {
      potion: null
    };
  },
  created() {
    this.fetchPotionDetails();
  },
  methods: {
    fetchPotionDetails() {
      const potionId = this.$route.params.id;
      axios.get(`https://api.potterdb.com/v1/potions/${potionId}`)
          .then(response => {
            this.potion = response.data.data;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des détails de la potion : ', error);
          });
    }
  }
}
</script>

<style scoped>
.potion-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.potion-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.potion-details h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.potion-details img {
  max-width: 100%;
  margin-bottom: 20px;
}

.details {
  margin-top: 20px;
}

.details p {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>
