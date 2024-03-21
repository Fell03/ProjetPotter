<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/" class="link">Accueil</router-link>

    <div v-if="sorts && sorts.length">
      <ul class="spell-list">
        <li v-for="sort in sorts" :key="sort.id" class="spell-item">
          <h2 class="spell-name">{{ sort.attributes.name }}</h2>
          <div class="spell-details">
            <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
            <p><strong>Description:</strong> {{ getDescription(sort.attributes) }}</p>
          </div>
          <img :src="sort.attributes.image" alt="Image du sort" class="spell-image" />
        </li>
      </ul>
      <div class="pagination">
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
      }
    }
  },
  created() {
    this.fetchSorts();
  },
  methods: {
    fetchSorts(url = 'https://api.potterdb.com/v1/spells', pageSize = 20) {
      axios.get(url, {
        params: {
          'page[size]': pageSize
        }
      })
          .then(response => {
            this.sorts = response.data.data;
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

.spell-list {
  list-style-type: none;
  padding: 0;
}

.spell-item {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.spell-name {
  font-size: 24px; /* Augmenter la taille du nom du sort */
  margin-bottom: 10px;
  color: #333; /* Utiliser une couleur de texte similaire à celle de l'accueil */
}

.spell-details {
  margin-bottom: 10px;
}

.spell-details p {
  margin: 5px 0;
}

.spell-image {
  max-width: 100%;
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
