<template>
  <div class="container">
    <h1>Liste des Personnages</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="personnages && personnages.length">
      <ul>
        <li v-for="personnage in personnages" :key="personnage.id">{{ personnage.attributes.name }}</li>
      </ul>
    </div>

    <div v-else>
      <p>Aucun personnages trouvé.</p>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Personnages',
  data(){
    return{
      personnages:[]// Variable de données pour stocker les personnages
    }
  },
  // Méthode fetchPersonnages() pour récupérer les personnages depuis l'API
  created(){
    axios.get('https://api.potterdb.com/v1/characters')
        .then(response => {
          console.log(response.data); // Afficher les données récupérées dans la console
          this.personnages = response.data.data; // Accéder correctement aux données des personnages
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des personnages : ', error);
        });
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
