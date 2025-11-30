import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useRecipeStore = defineStore({
  id: 'recipe',
  state: () => ({
    recipe: {}
  }),
  actions: {
    async getRecipe(slug) {
      const router = useRouter()

      try {
        const response = await fetch(`https://backend.asyafood.lauralpn.fr/api/recipe/${slug}`)
        if (response.status === 404) {
          router.push({ name: 'notFound', params: { catchAll: '404' } })
        } else {
          const recipe = await response.json()
          this.recipe = recipe
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
