import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    category: {}
  }),
  actions: {
    async getCategory(slug) {
      const router = useRouter()

      try {
        const response = await fetch(`https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/category/${slug}`)
        if (response.status === 404) {
          router.push({ name: 'notFound', params: {catchAll: '404'} })
        } else {
          const category = await response.json()
          this.category = category
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
