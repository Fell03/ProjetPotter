<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher un sort">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

    <div v-if="filteredSorts && filteredSorts.length">
      <ul>
        <li v-for="sort in filteredSorts" :key="sort.id">
          <h3>{{ sort.attributes.name }}</h3>
          <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
          <p><strong>Description:</strong>
            {{ getDescription(sort.attributes) }}
          </p>
          <img :src="sort.attributes.image" alt="Image du sort" />
        </li>
      </ul>
      <div>
        <button @click="loadPreviousPage" :disabled="!pagination.prev">Page Précédente</button>
        <button @click="loadNextPage" :disabled="!pagination.next">Page Suivante</button>
      </div>
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
      allSorts: [], // Variable de données pour stocker tous les sorts
      sorts: [], // Variable de données pour stocker les sorts affichés
      pagination: {
        prev: null,
        next: null
      },
      searchQuery: '' // Variable pour stocker la requête de recherche
    }
  },
  // Méthode fetchSorts() pour récupérer les sorts depuis l'API
  created() {
    this.fetchSorts();
  },
  methods: {
    async fetchSorts(url = 'https://api.potterdb.com/v1/spells', pageSize = 20) {
      try {
        const response = await axios.get(url, {
          params: {
            'page[size]': pageSize
          }
        });
        console.log(response.data); // Afficher les données récupérées dans la console
        this.allSorts = response.data.data; // Accéder à toutes les données des sorts
        this.pagination.prev = response.data.links.prev;
        this.pagination.next = response.data.links.next;

        // Sélectionner les 20 premiers sorts pour l'affichage initial
        this.sorts = this.allSorts.slice(0, pageSize);

        // Scroll vers le haut
        window.scrollTo({top: 0, behavior: 'smooth'});
      } catch (error) {
        console.error('Erreur lors de la récupération des sorts : ', error);
      }
    },
    getDescription(attributes) {
      return `${attributes.slug}, ${attributes.category}, ${attributes.creator ? `Créateur: ${attributes.creator},` : ''} Main: ${attributes.hand}, Incantation: ${attributes.incantation}`;
    },
    async search() {
      const query = this.searchQuery.toLowerCase();

      // Réinitialiser la liste des sorts affichés
      this.sorts = [];

      try {
        // Effectuer une nouvelle requête pour récupérer tous les sorts depuis l'API
        const response = await axios.get('https://api.potterdb.com/v1/spells');
        this.allSorts = response.data.data;

        // Filtrer les sorts en fonction de la requête de recherche sur la liste complète de tous les sorts
        this.filterSorts(this.allSorts, query);
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les sorts : ', error);
      }
    },

    filterSorts(allSorts, query) {
      // Filtrer tous les sorts en fonction de la requête de recherche
      this.sorts = allSorts.filter(sort => {
        return sort.attributes.name.toLowerCase().includes(query) ||
            sort.attributes.effect.toLowerCase().includes(query);
      });
    },
    clearSearch() {
      // Réinitialiser la requête de recherche et recharger les sorts
      this.searchQuery = '';
      this.sorts = this.allSorts.slice(0, 20); // Réinitialiser les sorts affichés à la première page
    },
    loadPreviousPage() {
      if (this.pagination.prev) {
        this.fetchSorts(this.pagination.prev);
      }
    },
    loadNextPage() {
      if (this.pagination.next) {
        this.fetchSorts(this.pagination.next);
      }
    }
  },

  computed: {
    filteredSorts() {
      // Filtrer les sorts affichés en fonction de la requête de recherch
      return this.sorts;
    }
  }
}
</script>



<style scoped>
@import url('../style.css');
</style>
