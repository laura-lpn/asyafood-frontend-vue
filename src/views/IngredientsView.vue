<template>
  <section class="bg-ingredients h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
  </section>
  <MotifTitle text="Ingrédients" />
  
  <section class="w-11/12 mx-auto my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:w-4/5 gap-4 md:gap-12">
    <template v-if="ingredients.length > 0">
      <IngredientCard
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :name="ingredient.name"
        :image="ingredient.image"
        :altImage="ingredient.altImage"
      />
    </template>
    <template v-else>
      <p class="text-center col-span-3">Aucun ingrédient trouvé</p>
    </template>
  </section>
</template>

<script>
export default {
  name: "IngredientsView",
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    async getIngredients() {
      const response = await fetch('https://backend.asyafood.fr/api/ingredients', {
        method: 'GET',
        credentials: 'include'
      });
      const ingredients = await response.json();
      this.ingredients = ingredients;
    }
  },
  async mounted() {
    await this.getIngredients();
  }
}
</script>