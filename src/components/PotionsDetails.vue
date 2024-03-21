<template>
  <div v-if="potion">
    <h1>{{ potion.attributes.name }}</h1>
    <router-link to="/potions">Potions</router-link>
    <img :src="potion.attributes.image" alt="Image de la potion" v-if="potion.attributes.image" />
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
  <div v-else>
    <p>Loading...</p>
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
@import url('../style.css');
</style>
