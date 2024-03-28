<template>
  <div class="container">
    <h1>Liste des Sorts</h1>
    <router-link to="/" class="link">Accueil</router-link>

    <div>
      <input type="text" v-model="searchQuery" placeholder="Rechercher un sort">
      <button @click="search">Rechercher</button>
      <button @click="clearSearch">Effacer</button>
    </div>

    <div v-if="filteredSorts && filteredSorts.length">
      <ul class="spell-list">
        <li v-for="sort in filteredSorts" :key="sort.id" class="spell-item">
          <h3 class="spell-name">{{ sort.attributes.name }}</h3>
          <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
          <p><strong>Description:</strong> {{ getDescription(sort.attributes) }}</p>
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
      allSorts: [],
      sorts: [],
      pagination: {
        prev: null,
        next: null
      },
      searchQuery: ''
    }
  },
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
        console.log(response.data);
        this.allSorts = response.data.data;
        this.pagination.prev = response.data.links.prev;
        this.pagination.next = response.data.links.next;

        this.sorts = this.allSorts.slice(0, pageSize);

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
      this.sorts = [];
      try {
        const response = await axios.get('https://api.potterdb.com/v1/spells');
        this.allSorts = response.data.data;
        this.filterSorts(this.allSorts, query);
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les sorts : ', error);
      }
    },
    filterSorts(allSorts, query) {
      this.sorts = allSorts.filter(sort => {
        return sort.attributes.name.toLowerCase().includes(query) ||
            sort.attributes.effect.toLowerCase().includes(query);
      });
    },
    clearSearch() {
      this.searchQuery = '';
      this.sorts = this.allSorts.slice(0, 20);
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
      return this.sorts;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9e9d4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  text-align: center;
  color: #ad4731;
  margin-bottom: 30px;
}

.link {
  font-size: 1.2em;
  color: #ffffff;
  background-color: #862e18;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.link:hover {
  background-color: #ad4731;
  transform: scale(1.05);
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
  font-size: 24px;
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
