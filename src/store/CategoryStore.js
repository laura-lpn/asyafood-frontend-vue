import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    category: {},
    image: '',
    motif: ''
  }),
  actions: {
    async getCategory(slug) {
      const router = useRouter()

      try {
        const response = await fetch(`https://127.0.0.1:8000/api/category/${slug}`)
        if (response.status === 404) {
          router.push({ name: 'notFound', params: {catchAll: '404'} })
        } else {
          const category = await response.json()
          this.category = category

          const responseBlob = await fetch(`https://127.0.0.1:8000/api/category/image/${slug}`)
          const blob = await responseBlob.blob()
          this.image = URL.createObjectURL(blob)

          const responseMotif = await fetch(`https://127.0.0.1:8000/api/category/motif/${slug}`)
          const blobMotif = await responseMotif.blob()
          this.motif = URL.createObjectURL(blobMotif)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
