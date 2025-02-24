import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useRecipeStore = defineStore({
  id: 'recipe',
  state: () => ({
    recipe: {},
    image: '',
    print: ''
  }),
  actions: {
    async getRecipe(slug) {
      const router = useRouter()

      try {
        const response = await fetch(`https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/recipe/${slug}`)
        if (response.status === 404) {
          router.push({ name: 'notFound', params: { catchAll: '404' } })
        } else {
          const recipe = await response.json()
          this.recipe = recipe

          const responseBlob = await fetch(`https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/recipe/image/${slug}`)
          const blob = await responseBlob.blob()
          this.image = URL.createObjectURL(blob)

          const responsePrint = await fetch(`https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/recipe/print/${slug}`)
          const blobRecipe = await responsePrint.blob()
          this.print = URL.createObjectURL(blobRecipe)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
