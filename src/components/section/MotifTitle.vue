<script>
export default {
    name: 'MotifTitle',
    props: {
        text: {
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
    class="px-[10%] my-10 flex items-center justify-center gap-3 md:gap-4 lg:my-14
    ">
        <img src="/favicon.svg" alt="motif Asya Food jaune" class="h-16 bg-cover md:h-20 lg:h-30">
        <h1 class="text-red font-second text-2xl leading-xl font-bold md:text-3xl md:leading-4xl lg:text-5xl lg:leading-6xl">{{text}}</h1>
    </div>
</template>