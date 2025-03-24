<template>
    <section class="bg-home h-section-img-mobile md:h-section-img w-full bg-center xl:h-[90vh] bg-cover bg-no-repeat">
        <div class="w-full h-full bg-filter-home flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48">
            <h1 class="text-2xl font-second font-bold w-full leading-xl mb-6 md:text-4xl md:mb-12 md:leading-3xl lg:text-5xl lg:leading-6xl xl:w-4/5">
                Découvrez les saveurs de la cuisine <em class="text-red not-italic font-bold">asiatique</em>
            </h1>
            <p class="w-full font-medium text-base leading-xl md:text-xl md:leading-2xl md:mb-5 xl:w-4/5">
                De la cuisine <em class="text-red not-italic font-medium">japonaise</em> à la cuisine 
                <em class="text-red not-italic font-medium">thaïlandaise</em> en passant par la cuisine 
                <em class="text-red not-italic font-medium">chinoise</em>, vous trouverez ici des recettes simples à 
                réaliser chez vous.<br>Laissez-nous vous guider dans un <em class="text-red not-italic font-medium">voyage
                culinaire</em> à travers l'Asie et découvrez de nouveaux goûts et de 
                <em class="text-red not-italic font-medium">nouvelles saveurs</em> à chaque bouchée.<br>Bon appétit !
            </p>
            <a href="#recent" class="duration-500">
                <Vue3Lottie :animationData="ScrollJSON" :height="100" :width="100" />
            </a>
        </div>
    </section>
    <section id="recent" class="relative w-full overflow-hidden">
        <MotifTitleSection text="Ajout récent" color="yellow" />
        <div class="flex overflow-x-scroll snap-x-mandatory w-screen mx-auto md:overflow-auto z-10 p-5 md:p-0">
            <div class="flex snap-start justify-center gap-10 md:w-11/12 lg:w-4/5 mx-auto xl:w-[65%] xl:gap-24">
                <RecipeCardHome 
                    v-for="recentRecipe in recentRecipes" 
                    :key="recentRecipe.id" 
                    :recipe="recentRecipe.slug"
                    :category="recentRecipe.category.slug" 
                    :image="recentRecipe.image" 
                    :altImage="recentRecipe.altImage" 
                    :name="recentRecipe.name" 
                    class="w-[60vw] h-auto md:w-auto"
                />
            </div>
        </div>
    </section>
    <section class="w-full">
        <MotifTitleSection text="Nos recettes par pays" color="red" />
        <div class="grid grid-cols-2 w-11/12 mx-auto gap-5 md:grid-cols-3 md:gap-8 lg:grid-cols-6 lg:gap-0 lg:w-full lg:h-[65vh]">
            <CategoryCard 
                v-for="category in categoriesWithRecipe" 
                :key="category.id" 
                :category="category.slug" 
                :name="category.name" 
                :image="category.image" 
                :altImage="category.altImage"
            />
        </div>
    </section>
    <section class="w-full bg-gray-100 py-12 px-5 md:px-16 lg:px-48 text-center">
        <MotifTitleSection text="Ajoutez facilement vos ingrédients à votre liste de courses" color="yellow" />
        <p class="text-lg md:text-xl mb-6">
            Créez un compte pour pouvoir ajouter tous les ingrédients d'une recette à votre liste de courses et y accéder à tout moment.
        </p>
        <RouterLink to="/inscription" class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3">
            Créer un compte
        </RouterLink>
    </section>
    <section class="w-full bg-yellow-50 py-12 px-5 md:px-16 lg:px-48 text-center">
        <MotifTitleSection text="Ingrédients asiatiques incontournables" color="red" />
        <p class="text-lg md:text-xl mb-6">
            Découvrez les ingrédients indispensables pour cuisiner des plats asiatiques authentiques.
        </p>
        <RouterLink to="/ingredients" class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3">
            Voir les ingrédients
        </RouterLink>
    </section>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';

import ScrollJSON from '../assets/json/scroll.json';
import CategoryCard from '../components/CategoryCard.vue';
import RecipeCardHome from '../components/RecipeCardHome.vue';

export default {
    components: {
        Vue3Lottie,
        RecipeCardHome,
        CategoryCard
    },
    data() {
        return {
            ScrollJSON,
            categories: [],
            recentRecipes: [],
        }
    },
    computed: {
        categoriesWithRecipe() {
            return this.categories.filter(category => category.recipes.length > 0);
        }
    },
    methods: {
        async getRecentRecipes() {
            const response = await fetch('https://backend.asyafood.fr/api/recipes?limit=3&orderBy=id&order=desc');
            const recentRecipes = await response.json();
            this.recentRecipes = recentRecipes;
        },
        async getCategories() {
            const response = await fetch('https://backend.asyafood.fr/api/categories');
            const categories = await response.json();
            this.categories = categories;
        }
    },
    async created() {
        await this.getCategories();
        await this.getRecentRecipes();
    },
};
</script>