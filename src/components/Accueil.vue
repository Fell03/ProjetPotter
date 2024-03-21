<template>
  <div class="container">
    <h1>Bienvenue dans l'Univers Harry Potter</h1>
    <nav>
      <router-link to="/potions" class="link">Potions</router-link>
      <router-link to="/livres" class="link">Livres</router-link>
      <router-link to="/personnages" class="link">Personnages</router-link>
      <router-link to="/sorts" class="link">Sorts</router-link>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  text-align: center;
  padding: 50px 20px; /* Ajouter un peu plus d'espace autour du contenu */
  background-color: #f9e9d4; /* Couleur de fond */
}

h1 {
  font-size: 3.5em; /* Augmenter la taille du titre */
  color: #ad4731; /* Utiliser une couleur de titre plus vive */
  margin-bottom: 30px; /* Augmenter l'espacement en bas du titre */
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Permettre le retour à la ligne des liens si nécessaire */
}

.link {
  margin: 10px 20px; /* Ajouter de l'espace autour des liens */
  padding: 15px 30px; /* Augmenter la taille des liens */
  font-size: 1.2em;
  color: #ffffff;
  background-color: #862e18; /* Utiliser une couleur de fond plus foncée */
  border-radius: 25px; /* Utiliser une bordure arrondie pour les liens */
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, transform 0.3s; /* Ajouter une transition fluide */
}

.link:hover {
  background-color: #ad4731; /* Changer la couleur de fond au survol */
  transform: scale(1.1); /* Ajouter un effet d'agrandissement au survol */
}
</style>
