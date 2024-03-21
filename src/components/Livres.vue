<template>
  <div class="container">
    <h1>Liste des livres</h1>
    <router-link to="/" class="link">Accueil</router-link>

    <div v-if="livres && livres.length">
      <ul class="books-list">
        <li v-for="livre in livres" :key="livre.id" class="book-item">
          <h3 class="book-title"><strong>Titre : </strong>{{ livre.attributes.title }}</h3>
          <p class="book-author"><strong>Auteur : </strong>{{ livre.attributes.author }}</p>
          <p class="book-release-date"><strong>Date de publication :</strong> {{ livre.attributes.release_date }}</p>
          <img :src="livre.attributes.cover" alt="Image du livre" class="book-cover" />
        </li>
      </ul>
      <div class="pagination">
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
      }
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
            this.livres = response.data.data;
            this.pagination.prev = response.data.links.prev;
            this.pagination.next = response.data.links.next;
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9e9d4; /* Utiliser la même couleur de fond que sur la page d'accueil */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px; /* Augmenter la taille du titre */
  text-align: center; /* Centrer le titre */
  color: #ad4731; /* Utiliser une couleur de titre similaire à celle de l'accueil */
  margin-bottom: 30px;
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

.books-list {
  list-style-type: none;
  padding: 0;
}

.book-item {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.book-title {
  font-size: 24px; /* Augmenter la taille du nom du livre */
  margin-bottom: 10px;
  color: #333; /* Utiliser une couleur de texte similaire à celle de l'accueil */
}

.book-author,
.book-release-date {
  margin-bottom: 10px;
}

.book-cover {
  max-width: 200px; /* Ajustez la taille maximale selon vos besoins */
  display: block;
  margin-top: 10px;
}

.pagination {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
