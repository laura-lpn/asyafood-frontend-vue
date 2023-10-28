<template>
  <RouterLink :to="{
    name: 'category',
    params: { slug: category }
  }" class="rounded-[10px] overflow-hidden shadow-main group bg-white p-3 lg:hidden">
    <img :src="image" :alt="altImage" class="w-full h-40 bg-center object-center bg-cover z-0 object-cover rounded-t-[10px] md:h-52" />
    <h3 class="text-center font-second w-full mt-2 text-base overflow-y-clip md:text-lg">
      {{ name }}
    </h3>
  </RouterLink>
  <RouterLink :to="{
    name: 'category',
    params: { slug: category }
  }" class="overflow-hidden group relative bg-white hidden lg:flex justify-left">
    <img :src="image" :alt="altImage" class="w-full bg-center bg-cover z-0 object-cover h-full" />
    <div
      class="absolute h-full bg-transparent-home w-full z-10 left-0 top-0 -translate-x-full transition-all duration-300 ease-in-out lg:group-hover:translate-x-0">
    </div>
    <h3 class="text-white w-full absolute text-xl z-20 -top-4 right-3/4 text-right origin-bottom-right -rotate-90 -translate-x-full transition-all duration-300 ease-in-out lg:group-hover:translate-x-0">
        {{ name.toUpperCase() }}
    </h3>
  </RouterLink>
</template>

<script>
import { useCategoryStore } from '../store/CategoryStore.js'

import { onMounted, ref } from 'vue'

export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const categoryStore = useCategoryStore()
    const image = ref('')
    const altImage = ref('')
    const name = ref('')

    const getCategoryImage = async (slug) => {
      await categoryStore.getCategory(slug)
      image.value = categoryStore.image
      altImage.value = categoryStore.category.altImage
      name.value = categoryStore.category.name
    }

    onMounted(() => {
      getCategoryImage(props.category)
    })

    return {
      image,
      altImage,
      name
    }
  }
}


</script>