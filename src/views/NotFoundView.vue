<template>
    <section class="bg-notFound h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
        <div
            class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48">
        </div>
    </section>
    <MotifTitle text="Page introuvable" />
    
    <section
        class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2">
        <p>
            La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <RouterLink :to="{name : 'home'}" class="bg-yellow text-white rounded-main mt-4 px-8 py-2 hover:bg-red">Retourner à l'accueil</RouterLink>
    </section>
</template>
  
<script>

</script>
  