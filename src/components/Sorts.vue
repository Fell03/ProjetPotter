<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher un sort">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

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
      sorts: [], // Variable de données pour stocker les sorts
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
    fetchSorts(url = 'https://api.potterdb.com/v1/spells',pageSize=20) {
      axios.get(url,{
        params:{
          'page[size]':pageSize
        }
      })
          .then(response => {
            console.log(response.data); // Afficher les données récupérées dans la console
            this.sorts = response.data.data; // Accédez correctement aux données des sorts
            this.pagination.prev = response.data.links.prev;
            this.pagination.next = response.data.links.next;

            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des sorts : ', error);
          });
    },
    getDescription(attributes) {
      return `${attributes.slug}, ${attributes.category}, ${attributes.creator ? `Créateur: ${attributes.creator},` : ''} Main: ${attributes.hand}, Incantation: ${attributes.incantation}`;
    },


    search() {
      const query = this.searchQuery.toLowerCase();

      // Réinitialiser la liste des sorts
      this.sorts = [];

      // Effectuer une recherche sur chaque page
      const searchPerPage = async (url) => {
        try {
          const response = await axios.get(url);
          const pageSorts = response.data.data.filter(sort => {
            // Filtrer les sorts en fonction de la requête de recherche
            return sort.attributes.name.toLowerCase().includes(query) ||
                sort.attributes.effect.toLowerCase().includes(query);
          });
          // Ajouter les sorts trouvés à la liste principale
          this.sorts.push(...pageSorts);

          // Si une page suivante existe, effectuer une recherche récursive
          if (response.data.links.next) {
            await searchPerPage(response.data.links.next);
          }
        } catch (error) {
          console.error('Erreur lors de la recherche de sorts : ', error);
        }
      };

      // Commencer la recherche sur la première page
      searchPerPage('https://api.potterdb.com/v1/spells');
    },

    clearSearch() {
      // Réinitialiser la requête de recherche et recharger les sorts
      this.searchQuery = '';
      this.fetchSorts();
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
      // Filtrer les sorts en fonction de la requête de recherche
      return this.sorts.filter(sort => {
        return sort.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            sort.attributes.effect.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
