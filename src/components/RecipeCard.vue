<template>
  <RouterLink :to="{
    name: 'recipe',
    params: { category: category, recipeSlug: recipe }
  }" class="rounded-mobile overflow-hidden shadow-main aspect-square relative my-2 md:my-4">
    <img :src="image" :alt="altImage" class="w-full h-full bg-center bg-cover z-0 object-cover" />
    <div
      class="absolute h-1/3 md:h-1/4 leading-5 bg-transparent-title w-full z-10 bottom-0 py-1 md:py-2 px-2 md:px-3 lg:px-4">
      <h3 class="text-white flex items-center text-sm leading-5 lg:leading-7 text-medium w-full h-full overflow-y-clip md:text-base lg:text-xl">
        {{ name }}
      </h3>
    </div>
  </RouterLink>
</template>

<script>

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
    },
    image: {
      type: String,
      required: true
    },
    altImage: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
