<script>
export default {
    name: 'MotifTitleRecipe',
    props: {
        text: {
            required: true
        },
        alt: {
            required: true
        },
        motif: {
            required: true
        },
        color: {
            required: true
        }
    },
    data() {
        return {
        };
    },
}
</script>

<template>
    <div
    class="px-[5%] mt-10 flex items-center justify-center gap-3 md:gap-4 md:px-[10%]
    ">
        <img :src="motif" :alt="alt" class="w-16 h-16 bg-cover md:w-24 md:h-24 lg:w-32 lg:h-32">
        <h1 class="font-second text-2xl leading-xl font-bold md:text-3xl md:leading-4xl lg:text-5xl lg:leading-6xl" :style="[`color: ${color}`]">{{text}}</h1>
    </div>
</template>