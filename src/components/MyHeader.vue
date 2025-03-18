<template>
  <header
    class="
    bg-white lg:bg-white-transparent shadow-main
    py-3 lg:px-20
    w-full z-[100] h-auto fixed
    flex justify-center items-center flex-col
    ">
    <div class="relative flex justify-center items-center w-full">
      <RouterLink :to="{ name: 'home'}" title="Accueil" class="hover:animate-pulse z-[100]">
        <img src="/logo.svg" alt="logo Asya Food" class="h-16 lg:h-20" />
      </RouterLink>
      <nav class="absolute left-7 text-xl flex gap-5 lg:right-0 lg:left-auto">
        <RouterLink :to="{name : 'ingredients'}" title="Ingrédients"
          class="text-yellow lg:text-red hover:text-yellow">
          <font-awesome-icon :icon="['far', 'pepper-hot']" />
        </RouterLink>
        <RouterLink :to="{name : 'list'}" title="Liste de course"
          class="text-yellow lg:text-red hover:text-yellow">
          <font-awesome-icon :icon="['fas', 'list-check']" />
        </RouterLink>
        <RouterLink :to="{name : 'account'}" title="Mon compte"
          class="text-yellow lg:text-red hover:text-yellow">
          <font-awesome-icon :icon="['far', 'user']" />
        </RouterLink>
      </nav>
      <nav class="flex items-end flex-col font-second text-base bg-white absolute w-auto rounded-l-main pb-5 pl-10 text-right top-2 right-0 pr-7 transition lg:hidden">
        <button class="cursor-pointer text-3xl text-red" @click="toggleMobileMenu">
          <font-awesome-icon v-if="!mobileMenuOpen" :icon="['fas', 'bars-staggered']" />
          <font-awesome-icon v-else :icon="['fas', 'xmark']" />
        </button>
        <ul id="mobile-menu" :class="{ 'hidden max-h-0': !mobileMenuOpen, 'flex flex-col gap-4 pb-2 mt-2 max-h-max overflow-hidden transition-all duration-300' : mobileMenuOpen}">
          <li v-for="category in categoriesWithRecipe" class="text-black font-medium" :key="category.id">
            <Navlink :text="category.name" :slug="category.slug" @click="selectCategory" />
          </li>
        </ul>
      </nav>
    </div>
    <nav class="gap-6 items-center justify-between w-full text-black font-second font-medium text-base hidden lg:flex">
      <Navlink v-for="category in categoriesWithRecipe" :text="category.name" :slug="category.slug" :key="category.id"/>
    </nav>
  </header>
</template>

<script>
import Navlink from './button/NavLink.vue';

export default {
  components: {
    Navlink,
  },
  data() {
    return {
      categories: [],
      mobileMenuOpen: false
    }
  },
  computed: {
    categoriesWithRecipe() {
      return this.categories.filter(category => category.recipes.length > 0);
    }
  },
  methods: {
    async getCategories() {
      const response = await fetch('https://backend.asyafood.fr/api/categories');
      const categories = await response.json();
      this.categories = categories;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    selectCategory() {
      this.mobileMenuOpen = false;
    }
  },
  async created() {
    await this.getCategories();
  },
};
</script>