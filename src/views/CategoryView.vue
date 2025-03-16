<template>
  <section class="w-full h-category-img-mobile lg:h-category-img relative">
    <img :src="categoryStore.category.image" :alt="categoryStore.category.altImage"
      class="w-full h-full bg-center bg-cover z-[0] object-cover" />
  </section>
  <MotifTitleCategory :text="categoryNameLowercase" :motif="categoryStore.category.motif" :alt="categoryStore.category.altMotif"
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
              class="w-4 h-4 accent-yellow cursor-pointer bg-white" />
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
    class="w-11/12 mx-auto my-12 grid grid-cols-2 md:grid-cols-3 md:w-4/5 gap-6 md:gap-26 xl:gap-y-20 xl:gap-32">
    <template v-if="paginatedRecipes.length > 0">
      <RecipeCard
        v-for="recipe in paginatedRecipes"
        :key="recipe.id"
        :recipe="recipe.slug"
        :category="categoryStore.category.slug"
        :image="recipe.image"
        :altImage="recipe.altImage"
        :name="recipe.name"
      />
    </template>
    <template v-else>
      <p class="text-center col-span-3">Aucun résultat trouvé.</p>
    </template>
  </section>
  <Pagination :currentPage="currentPage" :totalPages="filteredTotalPages" @page-changed="changePage" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useCategoryStore } from '../store/CategoryStore.js'
import { ref, watch, computed, nextTick } from 'vue'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()

    const currentPage = ref(parseInt(route.query.page) || 1)
    const selectedFilters = ref({
      types: route.query.types ? route.query.types.split(',') : [],
      genres: route.query.genres ? route.query.genres.split(',') : [],
    })

    const recipeTypes = ['Entrée', 'Plat', 'Dessert', 'Sauce']
    const recipeGenres = ['Viande', 'Poisson', 'Autre']
    const recipesPerPage = 6

    const getCategory = async (slug) => {
      try {
        await categoryStore.getCategory(slug)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          router.push({ name: "NotFound" })
        } else {
          console.error("An error occurred:", error)
        }
      }
    }

    const updateURL = () => {
      const query = {}

      if (currentPage.value > 1) {
        query.page = currentPage.value
      }
      if (selectedFilters.value.types.length > 0) {
        query.types = selectedFilters.value.types.join(',')
      }
      if (selectedFilters.value.genres.length > 0) {
        query.genres = selectedFilters.value.genres.join(',')
      }

      const newUrl = router.resolve({ query }).href
      history.replaceState(null, '', newUrl)
    }

    // 🔍 Recalcule les recettes filtrées
    const filteredRecipes = computed(() => {
      const normalizeString = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const typeFilter = selectedFilters.value.types.map(normalizeString)
      const genreFilter = selectedFilters.value.genres.map(normalizeString)
      const recipes = categoryStore.category.recipes || []

      if (typeFilter.length === 0 && genreFilter.length === 0) {
        return recipes
      }

      return recipes.filter(recipe => {
        const typeMatch = typeFilter.length === 0 || typeFilter.includes(normalizeString(recipe.type))
        const genreMatch = genreFilter.length === 0 || genreFilter.includes(normalizeString(recipe.genre))
        return typeMatch && genreMatch
      })
    })

    const filteredTotalPages = computed(() => Math.ceil(filteredRecipes.value.length / recipesPerPage))

    const paginatedRecipes = computed(() => {
      const startIdx = (currentPage.value - 1) * recipesPerPage
      return filteredRecipes.value.slice(startIdx, startIdx + recipesPerPage)
    })

    watch(selectedFilters, () => {
      currentPage.value = 1
      updateURL()
    }, { deep: true })

    watch(currentPage, updateURL)

    watch(() => route.params.slug, async (newSlug) => {
      currentPage.value = 1
      selectedFilters.value = { types: [], genres: [] }
      await getCategory(newSlug)

      nextTick(updateURL)
    }, { immediate: true })

    const changePage = (newPage) => {
      currentPage.value = newPage
    }

    return {
      categoryStore,
      currentPage,
      selectedFilters,
      filteredRecipes,
      paginatedRecipes,
      filteredTotalPages,
      changePage,
      recipeTypes,
      recipeGenres,
    }
  },
  async created() {
    await this.getCategory(this.$route.params.slug)
  }
}
</script>