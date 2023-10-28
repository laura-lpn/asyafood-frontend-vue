<template>
  <section class="w-full h-category-img-mobile lg:h-category-img relative">
    <img :src="categoryStore.image" :alt="categoryStore.category.altImage"
      class="w-full h-full bg-center bg-cover z-[0] object-cover" />
    <div class="w-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48 absolute h-full bottom-0">
    </div>
  </section>
  <MotifTitleCategory :text="categoryNameLowercase" :motif="categoryStore.motif" :alt="categoryStore.category.altMotif"
    :color="categoryStore.category.color" />
  <section class="text-center w-4/5 mx-auto my-6 lg:w-3/5" v-html="categoryStore.category.description"></section>
  <a href="#recettes" class="flex justify-center text-3xl"
    :style="[`color: ${categoryStore.category.color}`]"><font-awesome-icon :icon="['fas', 'chevron-down']" /></a>
  <section
    class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-4 px-2 md:w-3/4 md:px-8">
    <h2 class="text-lg font-medium font-second gap-4 flex items-center md:text-xl lg:text-2xl"
      :style="[`color: ${categoryStore.category.color}`]">
      <font-awesome-icon :icon="['fas', 'filter']" />Filtres
    </h2>
    <div class="flex flex-col w-full xl:flex-row">
      <div class="flex gap-4 mt-4 md:mx-auto">
        <span class="font-medium text-base w-1/3 text-right md:w-auto"
          :style="[`color: ${categoryStore.category.color}`]">Type de plat</span>
        <div class="w-2/3 grid grid-cols-2 gap-y-2 md:w-auto md:flex md:gap-6">
          <label v-for="type in recipeTypes" :key="type" class="flex items-center gap-2 justify-start">
            <input type="checkbox" :value="type" v-model="selectedFilters.types"
              class="w-4 h-4 accent-yellow cursor-pointer" />
            {{ type }}
          </label>
        </div>
      </div>
      <div class="flex gap-4 mt-4 md:mx-auto">
        <span class="font-medium text-base w-1/3 text-right md:w-auto"
          :style="[`color: ${categoryStore.category.color}`]">Genre</span>
        <div class="w-2/3 grid grid-cols-2 gap-y-2 md:w-auto md:flex md:gap-6">
          <label v-for="genre in recipeGenres" :key="genre" class="flex items-center gap-2 justify-start">
            <input type="checkbox" :value="genre" v-model="selectedFilters.genres"
              class="w-4 h-4 accent-yellow cursor-pointer" />
            {{ genre }}
          </label>
        </div>
      </div>
    </div>
  </section>
  <section id="recettes"
    class="w-11/12 mx-auto my-12 grid grid-cols-2 md:grid-cols-3 md:w-4/5 gap-10 md:gap-26 xl:gap-y-20 xl:gap-32">
    <template v-if="paginatedRecipes.length > 0">
      <RecipeCard
        v-for="recipe in paginatedRecipes"
        :key="recipe.id"
        :recipe="recipe.slug"
        :category="categoryStore.category.slug"
      />
    </template>
    <template v-else>
      <p class="text-center col-span-3">Aucun résultat trouvé.</p>
    </template>
  </section>
  <Pagination :currentPage="currentPage" :totalPages="filteredTotalPages" @page-changed="changePage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { useCategoryStore } from '../store/CategoryStore.js'
import { ref } from 'vue'

export default {
  data: () => ({
    selectedFilters: {
      types: [],
      genres: []
    },
    recipesPerPage: 6,
  }),
  computed: {
    categoryNameLowercase() {
      const categoryName = this.categoryStore.category.name
      if (categoryName) {
        return categoryName.toLowerCase()
      }
      return ''
    },
    filteredRecipes: function () {
      const normalizeString = (str) => {
        return str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      };

      const typeFilter = this.selectedFilters.types.map(normalizeString);
      const genreFilter = this.selectedFilters.genres.map(normalizeString);
      const recipes = this.categoryStore.category.recipes;

      if (typeFilter.length === 0 && genreFilter.length === 0) {
        return recipes;
      }

      const filtered = recipes.filter((recipe) => {
        const typeMatch = typeFilter.length === 0 || typeFilter.includes(recipe.type);
        const genreMatch = genreFilter.length === 0 || genreFilter.includes(recipe.genre);
        return typeMatch && genreMatch;
      });
      return filtered;
    },
    filteredTotalPages() {
      const filteredRecipes = this.filteredRecipes;
      return Math.ceil((filteredRecipes || []).length / this.recipesPerPage);
    },
    paginatedRecipes() {
      const startIdx = (this.currentPage - 1) * this.recipesPerPage;
      const endIdx = startIdx + this.recipesPerPage;

      if (this.filteredRecipes) {
        return this.filteredRecipes.slice(startIdx, endIdx);
      } else {
        return [];
      }
    }
  },
  setup() {
    const categoryStore = useCategoryStore()
    const currentPage = ref(1)
    const recipeTypes = ['Entrée', 'Plat', 'Dessert', 'Sauce']
    const recipeGenres = ['Viande', 'Poisson', 'Autre']

    const getCategory = async (slug) => {
      try {
        await categoryStore.getCategory(slug);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Rediriger vers la page NotFound en cas d'erreur 404
          router.push({ name: "NotFound" });
        } else {
          // Gérer d'autres erreurs ici si nécessaire
          console.error("An error occurred:", error);
        }
      }
    }

    const changePage = (newPage) => {
      currentPage.value = newPage
    }
    return {
      categoryStore,
      getCategory,
      currentPage,
      changePage,
      recipeTypes,
      recipeGenres,
    }
  },
  async created() {
    const router = useRouter()
    const slug = router.currentRoute.value.params.slug
    await this.getCategory(slug)
  }
}
</script>
