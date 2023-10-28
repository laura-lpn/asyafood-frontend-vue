<template>
  <RouterLink :to="{
    name: 'recipe',
    params: { category: category, slug: recipe }
  }" class="rounded-mobile overflow-hidden shadow-main aspect-square relative group my-4">
    <img :src="image" :alt="altImage" class="w-full h-full bg-center bg-cover z-0 object-cover" />
    <div
      class="absolute h-1/4 bg-transparent-title w-full z-10 bottom-0 py-2 px-4 lg:translate-y-full transition-all duration-300 ease-in-out lg:group-hover:translate-y-0">
      <h3 class="text-white text-base text-medium w-full h-full overflow-y-clip md:text-sm lg:text-xl">
        {{ name }}
      </h3>
    </div>
  </RouterLink>
</template>

<script>
import { useRecipeStore } from '../store/RecipeStore.js'

import { onMounted, ref } from 'vue'

export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const recipeStore = useRecipeStore()
    const image = ref('')
    const altImage = ref('')
    const name = ref('')

    const getRecipeImage = async (slug) => {
      await recipeStore.getRecipe(slug)
      image.value = recipeStore.image
      altImage.value = recipeStore.recipe.altImage
      name.value = recipeStore.recipe.name
    }

    onMounted(() => {
      getRecipeImage(props.recipe)
    })

    return {
      image,
      altImage,
      name
    }
  }
}
</script>
