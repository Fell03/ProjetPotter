<template>
  <div class="container">
    <h1>Liste des livres</h1>
    <router-link to="/">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher un livre">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

    <div v-if="livres && livres.length">
      <ul>
        <li v-for="livre in filteredLivres" :key="livre.id">
          <h3><strong>Titre : </strong>{{ livre.attributes.title }}</h3>
          <p><strong>Auteur : </strong>{{ livre.attributes.author }}</p>
          <p>Date de publication : {{ livre.attributes.release_date }}</p>
          <img :src="livre.attributes.cover" alt="Image du livre" />
        </li>
      </ul>
      <div>
        <button @click="loadPreviousPage" :disabled="!pagination.prev">Page Précédente</button>
        <button @click="loadNextPage" :disabled="!pagination.next">Page Suivante</button>
      </div>
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
      livres: [],
      pagination: {
        prev: null,
        next: null
      },
      searchQuery: '' // Variable pour stocker la requête de recherche
    }
  },

  // Méthode fetchLivres() pour récupérer les livres depuis l'API
  created() {
    this.fetchLivres();
  },
  methods: {
    fetchLivres(url = 'https://api.potterdb.com/v1/books', pageSize = 20) {
      axios.get(url, {
        params: {
          'page[size]': pageSize
        }
      })
          .then(response => {
            console.log(response.data); // Afficher les données récupérées dans la console
            this.livres = response.data.data; // Accédez correctement aux données des livres
            this.pagination.prev = response.data.links.prev;
            this.pagination.next = response.data.links.next;

            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des livres : ', error);
          });
    },

    search() {
      // Laissez l'écouteur sur la variable searchQuery déclencher la recherche automatiquement
    },
    clearSearch() {
      // Réinitialiser la requête de recherche et recharger les livres
      this.searchQuery = '';
      this.fetchLivres();
    },

    loadPreviousPage() {
      if (this.pagination.prev) {
        this.fetchLivres(this.pagination.prev);
      }
    },
    loadNextPage() {
      if (this.pagination.next) {
        this.fetchLivres(this.pagination.next);
      }
    }
  },
  computed: {
    filteredLivres() {
      // Filtrer les livres en fonction de la requête de recherch
      return this.livres.filter(livre => {
        return livre.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || livre.attributes.author.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  watch: {
    // Écouteur sur la variable searchQuery pour déclencher la recherche automatiquement
    searchQuery: function (newSearchQuery) {
      this.search();
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
