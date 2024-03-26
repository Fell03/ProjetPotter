<template>
  <div class="container">
    <h1>Liste des Potions</h1>
    <router-link to="/">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher une potion">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

    <div v-if="filteredPotions.length > 0">
      <ul>
        <li v-for="potion in filteredPotions" :key="potion.id">
          <h3>{{ potion.attributes.name }}</h3>
          <p><strong>Effet:</strong> {{ potion.attributes.effect }}</p>
          <p><strong>Description:</strong>{{ getDescription(potion.attributes) }}</p>
          <img :src="potion.attributes.image" alt="Image de la potion" />
        </li>
      </ul>
      <div>
        <button @click="loadPreviousPage" :disabled="!pagination.prev">Page Précédente</button>
        <button @click="loadNextPage" :disabled="!pagination.next">Page Suivante</button>
      </div>
    </div>

    <div v-else>
      <p>Aucune potion trouvée.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Potions',
  data() {
    return {
      potions: [],
      pagination: {
        prev: null,
        next: null
      },
      searchQuery: ''
    }
  },
  created() {
    this.fetchPotions();
  },
  methods: {
    fetchPotions(url = 'https://api.potterdb.com/v1/potions', pageSize = 20) {
      axios.get(url, {
        params: {
          'page[size]': pageSize
        }
      })
          .then(response => {
            this.potions = response.data.data;
            this.pagination.prev = response.data.links.prev;
            this.pagination.next = response.data.links.next;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des potions : ', error);
          });
    },
    getDescription(attributes) {
      const inventors = attributes.inventors || 'inconnu';
      const slug = attributes.slug || 'inconnu';
      const difficulty = attributes.difficulty || 'inconnu';
      return `${inventors}, ${slug}, ${difficulty}`;
    },
    search() {
      const query = this.searchQuery.toLowerCase();
      // Réinitialiser la liste des potions
      this.potions = [];

      // Effectuer une recherche sur chaque page
      const searchPerPage = async (url) => {
        try {
          const response = await axios.get(url);
          const pagePotions = response.data.data.filter(potion => {
            // Filtrer les potions en fonction de la requête de recherche
            const name = potion.attributes.name || '';
            const effect = potion.attributes.effect || '';
            return name.toLowerCase().includes(query) || effect.toLowerCase().includes(query);
          });
          // Ajouter les potions trouvées à la liste principale
          this.potions.push(...pagePotions);

          // Si une page suivante existe, effectuer une recherche récursive
          if (response.data.links.next) {
            await searchPerPage(response.data.links.next);
          }
        } catch (error) {
          console.error('Erreur lors de la recherche de potions : ', error);
        }
      };

      // Commencer la recherche sur la première pag
      searchPerPage('https://api.potterdb.com/v1/potions');
    },
    clearSearch() {
      this.searchQuery = '';
      this.fetchPotions();
    },
    loadPreviousPage() {
      if (this.pagination.prev) {
        this.fetchPotions(this.pagination.prev);
      }
    },
    loadNextPage() {
      if (this.pagination.next) {
        this.fetchPotions(this.pagination.next);
      }
    }
  },
  computed: {
    filteredPotions() {
      const query = this.searchQuery.toLowerCase();
      return this.potions.filter(potion => {
        const name = potion.attributes.name || '';
        const effect = potion.attributes.effect || '';
        return name.toLowerCase().includes(query) || effect.toLowerCase().includes(query);
      });
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
