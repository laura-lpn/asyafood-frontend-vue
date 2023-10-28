<script>
export default {
    name: 'MotifTitleSection',
    props: {
        text: {
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
    <div v-if="color == 'yellow'" class="w-full mx-auto flex items-center justify-center gap-2 md:gap-4 py-10
    ">
        <img src="/favicon.svg" alt="motif Asya Food jaune" class="h-8 md:h-12 lg:h-16">
        <h2 class="text-red font-second text-xl font-medium md:text-2xl lg:text-3xl">{{text}}</h2>
    </div>
    <div v-else-if="color ==='red'" class="w-full mx-auto flex items-center justify-center gap-4 my-10
    ">
        <img src="/favicon-rouge.svg" alt="motif Asya Food rouge" class="h-8 md:h-12 lg:h-16">
        <h2 class="text-yellow font-second text-xl font-medium md:text-2xl lg:text-3xl">{{text}}</h2>
    </div>
</template>