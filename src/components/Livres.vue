<template>
  <div class="container">
    <h1>Liste des livres</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="livres && livres.length">
      <ul>
        <li v-for="livre in livres" :key="livre.id">
          <h3><strong>Titre : </strong>{{ livre.attributes.title }}</h3>
          <p><strong>Auteur : </strong>{{ livre.attributes.author }}</p>
          <p>Date de publication : {{ livre.attributes.release_date }}</p>
          <img :src="livre.attributes.cover" alt="Image du livre" />
        </li>
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
      livres: []
    }
  },
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

            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des livres : ', error);
          });
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
  }
}
</script>

<style scoped>
  @import url('../style.css');
</style>
