<template>
  <div class="container">
    <h1>Liste des livres</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="livres && livres.length">
      <ul>
        <li v-for="livre in livres" :key="livre.id">{{ livre.attributes.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun livre trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Livres',
  data() {
    return {
      livres: [] // Variable de données pour stocker les livres
    }
  },
  // Méthode fetchLivres() pour récupérer les livres depuis l'API
  created() {
    axios.get('https://api.potterdb.com/v1/books')
        .then(response => {
          console.log(response.data); // Afficher les données récupérées dans la console
          this.livres = response.data.data; // Accéder correctement aux données des livres
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des livres : ', error);
        });
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
