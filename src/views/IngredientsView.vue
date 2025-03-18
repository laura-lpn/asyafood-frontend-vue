<template>
  <section class="bg-ingredients h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
  </section>
  <MotifTitle text="Ingrédients" />
  
  <section
      class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2">
    <template v-if="ingredients.length > 0">
      <p>{{ 
        ingredients.length > 1 ? 'Il y a ' + ingredients.length + ' ingrédients' : 'Il y a ' + ingredients.length + ' ingrédient'
         }}</p>
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
      console.log(response);
      const ingredients = await response.json();
      console.log(ingredients);
      this.ingredients = ingredients;
    }
  },
  async mounted() {
    await this.getIngredients();
  }
}
</script>