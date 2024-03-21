<template>
  <div class="container">
    <h1>Liste des Personnages</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="personnages && personnages.length">
      <ul>
        <li v-for="personnage in personnages" :key="personnage.id">
          <h3>{{ personnage.attributes.name }}</h3>
          <p>{{ generateBiography(personnage.attributes) }}</p>
          <img :src="personnage.attributes.image" alt="Image du personnage" />
        </li>
      </ul>
      <div>
        <button @click="loadPreviousPage" :disabled="!pagination.prev">Page Précédente</button>
        <button @click="loadNextPage" :disabled="!pagination.next">Page Suivante</button>
      </div>
    </div>
    <div v-else>
      <p>Aucun personnage trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Personnages',
  data() {
    return {
      personnages: [], // Variable de données pour stocker les personnages
      pagination: {
        prev: null,
        next: null
      }
    }
  },
  created() {
    this.fetchPersonnages();
  },
  methods: {
    fetchPersonnages(url = 'https://api.potterdb.com/v1/characters', pageSize = 20) {
      axios.get(url, {
        params: {
          'page[size]': pageSize
        }
      })
          .then(response => {
            console.log(response.data); // Afficher les données récupérées dans la console
            this.personnages = response.data.data; // Accéder correctement aux données des personnages
            this.pagination.prev = response.data.links.prev;
            this.pagination.next = response.data.links.next;

            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des personnages : ', error);
          });
    },
    loadPreviousPage() {
      if (this.pagination.prev) {
        this.fetchPersonnages(this.pagination.prev);
      }
    },
    loadNextPage() {
      if (this.pagination.next) {
        this.fetchPersonnages(this.pagination.next);
      }
    },
    generateBiography(attributes) {
      // Remplacer les valeurs null par "inconnu"
      for (const key in attributes) {
        if (attributes[key] === null) {
          attributes[key] = 'inconnu';
        }
      }

      return `${attributes.name || 'inconnu'}, né le ${attributes.born || 'inconnu'} à ${attributes.born || 'inconnu'},
est un(e) ${attributes.species || 'inconnu'} de nationalité ${attributes.nationality || 'inconnue'}.
Il est ${attributes.alias_names && attributes.alias_names.length > 0 ? attributes.alias_names.join(', ') : 'inconnu'},
et a exercé le/les métier(s), dont ${attributes.jobs && attributes.jobs.length > 0 ? attributes.jobs.join(', ') : 'inconnu'}.
${attributes.name ? attributes.name : 'Il'} était affilié(e) à la maison ${attributes.house || 'inconnue'} à Poudlard.`;

    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
