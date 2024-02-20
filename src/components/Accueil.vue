<template>
  <div class="accueil">
    <h1>Bienvenue dans l'encyclopédie de l'univers de Harry Potter</h1>
    <nav>
      <router-link to="/potions">Potions</router-link>
      <router-link to="/sorts">Sorts</router-link>
      <router-link to="/livres">Livres</router-link>
      <router-link to="/personnages">Personnages</router-link>
    </nav>
    
    <div v-if="loading">Chargement en cours...</div>
    
    <div v-if="error">{{ error }}</div>
    
    <div v-if="characters.length">
      <h2>Personnages</h2>
      <ul>
        <li v-for="character in characters" :key="character.id">
          {{ character.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCharacters } from './services/charactersService';

const loading = ref(false);
const error = ref(null);
const characters = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    const data = await getCharacters();
    characters.value = data;
  } catch (err) {
    error.value = 'Une erreur est survenue lors du chargement des personnages.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.accueil {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
}

nav router-link {
  margin: 0 10px;
  font-size: 1.2em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>
