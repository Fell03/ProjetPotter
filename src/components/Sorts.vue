<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/">Accueil</router-link>

    <div v-if="sorts && sorts.length">
      <ul class="spell-list">
        <li v-for="sort in sorts" :key="sort.id" class="spell-item">
          <h3 class="spell-name">{{ sort.attributes.name }}</h3>
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
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.router-link {
  margin-right: 10px;
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
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
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
