<template>
  <div class="container">
    <h1>Liste des Personnages</h1>
    <router-link to="/">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher un personnage">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

    <div v-if="personnages && personnages.length">
      <ul>
        <li v-for="personnage in filteredPersonnages" :key="personnage.id">
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
      },
      searchQuery: '' // Variable pour stocker la requête de recherche
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

            window.scrollTo({top: 0, behavior: 'smooth'});
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des personnages : ', error);
          });
    },
    search() {
      const query = this.searchQuery.toLowerCase();

      // Réinitialiser la liste des personnages
      this.personnages = [];

      // Effectuer une recherche sur chaque page
      const searchPerPage = async (url) => {
        try {
          const response = await axios.get(url);
          const pagePersonnages = response.data.data.filter(personnage => {
            // Filtrer les personnages en fonction de la requête de recherche
            return personnage.attributes.name.toLowerCase().includes(query);
          });
          // Ajouter les personnages trouvés à la liste principale
          this.personnages.push(...pagePersonnages);

          // Si une page suivante existe, effectuer une recherche récursive
          if (response.data.links.next) {
            await searchPerPage(response.data.links.next);
          }
        } catch (error) {
          console.error('Erreur lors de la recherche de personnage : ', error);
        }
      };

      // Commencer la recherche sur la première page
      searchPerPage('https://api.potterdb.com/v1/characters');
    },

    clearSearch() {
      // Réinitialiser la requête de recherche et recharger les personnages
      this.searchQuery = '';
      this.fetchPersonnages();
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
  },


  computed: {
    filteredPersonnages() {
      // Filtrer les personnages en fonction de la requête de recherche
      return this.personnages.filter(personnage => {
        return personnage.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }
}
</script>

<style scoped>
@import url('../style.css');
</style>
