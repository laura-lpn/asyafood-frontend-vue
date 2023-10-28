<script>
import { useCategoryStore } from '../../store/CategoryStore.js';
export default {
    name: 'Navlink',
    props: {
        text: {
            required: true
        },
        slug: {
            required: true
        }
    },
    data() {
        return {
        };
    },
    setup() {
        const categoryStore = useCategoryStore();

        const updateCategory = (slug) => {
        categoryStore.getCategory(slug);
        };

        return {
        updateCategory,
        };
    },
}
</script>

<template>
    <router-link :to="{ name: 'category', params: { slug: slug }}" @click="updateCategory(slug)"
    class="font-medium
    relative duration-500 block
    hover:text-red
    after:absolute after:content-[''] after:top-full after:h-0.5 after:w-full after:left-0 after:bg-red after:rounded-full after:origin-right after:scale-x-0 after:transition-transform after:duration-500
    hover:after:origin-left hover:after:scale-x-100
    ">{{text}}</router-link>
</template>

<style>
.router-link-active {
    color: #BD1000;
}
.router-link-active::after {
    transform: scaleX(100%) !important;
    transform-origin: left !important;
}
</style>