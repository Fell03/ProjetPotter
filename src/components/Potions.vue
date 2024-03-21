<template>
  <div class="container">
    <h1>Liste des Potions</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="potions && potions.length">
      <ul>
        <!-- Utiliser router-link pour envelopper chaque nom de potion -->
        <li v-for="potion in potions" :key="potion.id">
          <router-link :to="'/potion/' + potion.id">{{ potion.attributes.name }}</router-link>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>Aucunes potions trouvées.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Potions',
  data() {
    return {
      potions: [] // Variable de données pour stocker les potions
    }
  },
  created() {
    axios.get('https://api.potterdb.com/v1/potions')
        .then(response => {
          console.log(response.data); // Afficher les données récupérées dans la console
          this.potions = response.data.data; // Accéder correctement aux données des potions
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des potions : ', error);
        });
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
