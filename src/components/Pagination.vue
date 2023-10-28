<template>
  <div class="flex justify-center mt-20">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="[page === currentPage ? 'bg-red text-white border-red' : 'border-yellow text-black hover:bg-yellow hover:text-white']"
      @click="goToPage(page)"
      class="w-10 h-auto aspect-square border-2 cursor-pointer my-1 mx-2 rounded-main font-bold font-second"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  methods: {
    goToPage(page) {
      this.$emit('page-changed', page);
    },
  },
};
</script>