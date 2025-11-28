<template>
    <section class="bg-list h-category-img-mobile w-full bg-center bg-cover lg:h-category-img"></section>
    <MotifTitle text="Ma liste de course" />
    <section class="flex items-center flex-col justify-center text-center mt-8 mb-12 m-auto w-11/12 shadow-main rounded-mobile py-6 px-8 md:w-3/4 lg:w-3/5 xl:w-1/2 md:px-12 lg:px-20">
        <div class="w-full flex items-center justify-between mb-4">
            <span class="text-yellow font-second font-semibold text-base lg:text-xl">Ingrédients</span>
            <span class="text-yellow font-second font-semibold text-base lg:text-xl">Valider</span>
        </div>
        <div v-for="item in list" :key="item.id" class="flex items-center justify-between w-full mb-4 px-4">
            <p :class="{ 'line-through': item.validate }" class="lg:text-base text-left">
                {{ item.quantity || '' }} 
                {{ getUnit(item) }}
                {{ item.quantity > 1 ? item.ingredient.namePlurial : item.ingredient.name }}
            </p>
            <input type="checkbox" 
                :id="'validate-' + item.id" 
                :checked="item.validate" 
                @change="toggleValidation(item)" 
                class="w-5 h-5 accent-yellow cursor-pointer"
            >
        </div>
        <div v-if="list.length === 0" class="text-black my-4">Votre liste de courses est vide.</div>
        <button class="bg-red text-white rounded-main mt-4 px-8 py-2 hover:bg-yellow" @click="clearList">
            Vider la liste
        </button>
    </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "ListView",
    setup() {
        const list = ref([]);
        const router = useRouter();
        const route = useRoute();

        const getUnit = (item) => {
            if (!item.unit) return "";
            if (item.quantity > 1 && !["ml", "g"].includes(item.unit)) {
                return item.unit.replace(/^([^\s]+)(?=\s|$)/, (match) => match + 's');
            }
            return item.unit;
        };
        const toggleValidation = async (item) => {
            try {
                const response = await fetch(`https://backend-asyafood.lauralpn.fr/api/list/validate/${item.id}`, {
                    method: "POST",
                    credentials: "include",
                });
                if (response.ok) {
                    // Mise à jour réactive de la liste
                    list.value = list.value.map((i) =>
                        i.id === item.id ? { ...i, validate: !i.validate } : i
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la validation :", error);
            }
        };
        const clearList = async () => {
            try {
                const response = await fetch(`https://backend-asyafood.lauralpn.fr/api/list/clear`, {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    list.value = [];
                } else {
                    console.error("Erreur lors de la suppression de la liste");
                }
            } catch (error) {
                console.error("Erreur lors de la suppression de la liste :", error);
            }
        };
        onMounted(async () => {
            try {
                const response = await fetch("https://backend-asyafood.lauralpn.fr/api/list", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    list.value = await response.json();
                } else if (response.status === 401) {
                    router.push({ name: "login", query: { next: route.fullPath } });
                }
            } catch (error) {
                console.error("Erreur lors du chargement de la liste :", error);
            }
        });

        return {
            list,
            getUnit,
            toggleValidation,
            clearList,
        };
    },
};
</script>