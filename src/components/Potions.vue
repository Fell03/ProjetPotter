<template>
  <div class="container">
    <h1>Liste des Potions</h1>
    <router-link to="/" class="link">Accueil</router-link>

    <div v-if="potions && potions.length">
      <ul class="potion-list">
        <!-- Utiliser router-link pour envelopper chaque nom de potion -->
        <li v-for="potion in potions" :key="potion.id" class="potion-item">
          <router-link :to="'/potion/' + potion.id" class="potion-link">{{ potion.attributes.name }}</router-link>
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

.potion-item {
  margin-bottom: 10px;
}

.potion-link {
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;
}

.potion-link:hover {
  color: #0056b3;
}

.link {
  font-size: 1.2em;
  color: #ffffff;
  background-color: #862e18;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px; /* Ajouter un espace en bas du lien */
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.link:hover {
  background-color: #ad4731;
  transform: scale(1.05); /* Ajouter un effet d'agrandissement au survol */
}
</style>
