<template>
    <section
    class="bg-list h-category-img-mobile w-full bg-center bg-cover lg:h-category-img
    ">
        <div
        class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48
        ">
        </div>
    </section>
    <MotifTitle text="Ma liste de course"/>
    <section class="flex items-center flex-col justify-center text-center mt-8 mb-12 m-auto w-11/12 shadow-main rounded-mobile py-6 px-8 md:w-3/4 lg:w-3/5 xl:w-1/2 md:px-12 lg:px-20">
        <div class="w-full flex items-center justify-between mb-4">
            <span class="text-yellow font-second font-semibold text-base lg:text-xl">
                Ingrédients
            </span>
            <span class="text-yellow font-second font-semibold text-base lg:text-xl">Valider
            </span>
        </div>
        <div v-for="item in list" class="flex items-center justify-between w-full mb-4 px-4" :key="item.id">
            <p :class="item.validate ? 'line-through' : null" class="lg:text-base text-left">{{ item.quantity ? item.quantity : null }} {{ item.unit ? item.unit : null }} {{ item.ingredient.name }}</p>
            <input type="checkbox" name="validate" @change="toggleValidation(item)" id="validate" :checked="item.validate" class="w-5 h-5 accent-yellow cursor-pointer">
        </div>
        <div v-if="list.length == 0" class="text-black my-4">
            Votre liste de courses est vide.
        </div>
        <button
        class="bg-red text-white rounded-main mt-4 px-8 py-2 hover:bg-yellow"
        @click="clearList"
        >Vider la liste</button
        >
    </section>
</template>

<script>

export default {
    name: "ListView",

    data() {
        return {
            list: {}
        }
    },
    methods: {
        async toggleValidation(item) {
            try {
                const response = await fetch(`https://backend.asyafood.fr/api/list/validate/${item.id}`, {
                    method: 'POST'
                });
                if (response.ok) {
                    // Mettre à jour l'élément local avec la nouvelle valeur "validate"
                    item.validate = !item.validate;
                }
            } catch (error) {
                console.error('Erreur lors de la mise à jour de la validation :', error);
            }
        },
        async clearList() {
            try {
                const response = await fetch(`https://backend.asyafood.fr/api/list/clear`, {
                    method: 'POST'
                });

                if (response.ok) {
                    // Vider la liste localement
                    this.list = {};
                } else {
                    console.error('Erreur lors de la suppression de la liste');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de la liste :', error);
            }
        }
    },
    async mounted() {
        const token = fetch('https://backend.asyafood.fr/api/check-token', {
            method: 'GET',
            credentials: 'include'
        });
        console.log(token.json())
        console.log(!token.ok)
        if (!token.ok) {
            this.$router.push({ name: 'login' })
        }
        const response = await fetch('https://backend.asyafood.fr//api/list', {
            method: 'GET',
            credentials: 'include'
        });
        if(response.ok) {
            this.list = await response.json();
        }
        if(! response.ok) {
            const currentRoute = this.$route.fullPath;
            this.$router.push({ name: 'login', query: { next: currentRoute } });
        }
    },
}
</script>