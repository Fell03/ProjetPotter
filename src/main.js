import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Potions from './components/Potions.vue';
import Accueil from './components/Accueil.vue';
import Livres from "./components/Livres.vue";
import Personnages from "./components/Personnages.vue";
import PotionsDetails from "./components/PotionsDetails.vue";
import Sorts from "./components/Sorts.vue";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Accueil },
        { path: '/potions', component: Potions },
        { path: '/livres', component: Livres},
        { path: '/personnages', component: Personnages},
        { path: '/potion/:id', component: PotionsDetails},
        { path: '/sorts', component: Sorts}
    ]
});

const app = createApp(App);



app.use(router);
app.mount('#app');
