<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="sorts && sorts.length">
      <ul>
        <li v-for="sort in sorts" :key="sort.id">
          <h3>{{ sort.attributes.name }}</h3>
          <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
          <p><strong>Description:</strong>
            {{ getDescription(sort.attributes) }}
          </p>
          <img :src="sort.attributes.image" alt="Image du sort" />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun sort trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Sorts',
  data() {
    return {
      sorts: [] // Variable de données pour stocker les sorts
    }
  },
  // Méthode fetchSorts() pour récupérer les sorts depuis l'API
  created() {
    axios.get('https://api.potterdb.com/v1/spells')
        .then(response => {
          console.log(response.data); // Afficher les données récupérées dans la console
          this.sorts = response.data.data; // Accédez correctement aux données des sorts
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des sorts : ', error);
        });
  },
  methods: {
    getDescription(attributes) {
      return `${attributes.slug}, ${attributes.category}, ${attributes.creator ? `Créateur: ${attributes.creator},` : ''} Main: ${attributes.hand}, Incantation: ${attributes.incantation}`;
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
