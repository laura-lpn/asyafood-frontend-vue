<template>
    <footer
    class="shadow-main
    bg-white
    w-full py-6 px-5 mt-20 flex flex-col justify-between items-center
    ">
        <div class="flex flex-col items-center w-full lg:flex-row lg:px-20 lg:items-center lg:justify-between">
            <RouterLink :to="{name : 'home'}" class="hover:animate-pulse">
                <img src="/logo.svg" alt="logo Asya Food" 
                class="h-24">
            </RouterLink>
            <nav class="w-full flex-col flex gap-4 text-center my-4 lg:flex-row lg:gap-16 lg:justify-center">
                <RouterLink :to="{name : 'legals'}" class="hover:text-red">Mentions légales</RouterLink>
                <RouterLink :to="{name : 'confidentiality'}" class="hover:text-red">Politique de confidentialité</RouterLink>
                <RouterLink :to="{name : 'cgu'}" class="hover:text-red">CGU</RouterLink>
            </nav>
            <div
            class="flex gap-6 text-xl text-white
            ">
                <a href="https://www.instagram.com/asyafood_fr/" target="_blank"
                class="bg-yellow rounded-main aspect-square w-8 h-8 p-2 flex justify-center items-center
                hover:bg-red
                "><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                <a href="https://www.facebook.com/asyafoodFr/" target="_blank"
                class="bg-yellow rounded-main aspect-square w-8 h-8 p-2 flex justify-center items-center
                hover:bg-red
                "><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
            </div>
        </div>
        <p class="text-medium text-red mt-4 lg:mt-0
            ">© Copyright Asya Food 2023</p>
    </footer>
</template>