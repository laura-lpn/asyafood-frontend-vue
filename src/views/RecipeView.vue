<template>
    <section class="w-full h-category-img-mobile lg:h-category-img relative">
        <img :src="recipeStore.recipe.image" :alt="recipeStore.recipe.altImage"
            class="w-full h-full bg-center bg-cover z-[0] object-cover">
    </section>
    <MotifTitleRecipe :text="recipeStore.recipe.name" :motif="categoryStore.category.motif" :alt="categoryStore.category.altMotif"
        :color="categoryStore.category.color" />
    <div class="w-11/12 flex justify-end my-4 md:w-3/4 mx-auto">
        <a :href="recipeStore.recipe.print" class="text-white rounded-main text-xs px-8 py-2 flex gap-2 items-center lg:text-sm"
            :style="[`background-color: ${categoryStore.category.color}`]" target="_blank"><font-awesome-icon
                :icon="['fas', 'print']" />Imprimer la recette</a>
    </div>
    <section v-if="recipeStore.recipe.times?.length > 0"
        class="flex items-center flex-col justify-center text-center mt-8 mb-12 m-auto w-11/12 shadow-main rounded-mobile py-4 px-2 md:w-3/4 md:px-8 xl:w-3/4">
        <h2 class="text-lg font-medium font-second gap-4 flex items-center md:text-xl lg:text-2xl"
            :style="[`color: ${categoryStore.category.color}`]">
            <font-awesome-icon :icon="['fas', 'hourglass-half']" />Temps
        </h2>
        <div class="flex flex-col w-full lg:flex-row mt-4 justify-center gap-2 lg:gap-10">
            <div class="flex gap-4 justify-center items-end" v-for="time in recipeStore.recipe.times" :key="time.id">
                <span class="font-medium text-base">{{ time.timeType.name }} :</span>
                <p class="text-base">{{ time.value }}</p>
            </div>
        </div>
    </section>
    <section class="w-11/12 md:w-3/4 flex items-center flex-col mx-auto mb-12 relative">
        <h2 class="text-lg font-medium font-second gap-4 flex items-center md:text-xl lg:text-2xl"
            :style="[`color: ${categoryStore.category.color}`]">
            <font-awesome-icon :icon="['fas', 'pepper-hot']" />Ingrédients
        </h2>
        <div class="gap-4 flex mt-6 h-min items-center lg:absolute lg:right-0 lg:mt-2">
            <button @click="decrementModulo"
                class="border-2 flex items-center justify-center border-black w-6 h-6 aspect-square rounded-[8px] hover:bg-yellow hover:text-white hover:border-yellow">
                <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <span class="font-medium text-base md:text-lg xl:text-xl">Pour {{ modulo * multiple }} {{ recipeStore.recipe.unitModulo
            }}</span>
            <button @click="incrementModulo"
                class="border-2 flex items-center justify-center border-black w-6 h-6 aspect-square rounded-[8px] hover:bg-yellow hover:text-white hover:border-yellow">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>
        <div class="flex flex-col mt-8 gap-4 h-min md:grid md:grid-cols-2 lg:gap-x-10">
            <div v-for="ingredient in formattedIngredients" :key="ingredient.id">
                <p>{{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}</p>
            </div>
        </div>
        <button @click="addToShoppingList"
            class="text-white rounded-main mt-10 px-8 py-2 flex gap-2 items-center lg:text-sm"
            :style="[`background-color: ${categoryStore.category.color}`]">Ajouter à la liste de course</button>
        <p class="mt-3 text-center" v-if="showSuccessMessage">{{ showSuccessMessage }}</p>
        <div v-if="showMessageLogin"
            class="text-yellow font-bold py-2 px-4 mt-3 text-center w-4/5 m-auto md:w-3/5 lg:w-1/2">
            <p>{{ showMessageLogin }}</p>
            <button @click="redirectToLogin" class="text-red">Se connecter</button>
        </div>
    </section>
    <section v-if="recipeStore.recipe.steps?.length > 0" :style="[`background-color: ${categoryStore.category.color}`]"
        class="mb-12 flex flex-col items-center py-8 text-white">
        <h2 class="text-lg font-medium font-second gap-4 flex items-center md:text-xl lg:text-2xl">
            <font-awesome-icon :icon="['fas', 'utensils']" />Préparation
        </h2>
        <div class="w-11/12 md:w-3/4 mx-auto my-8 flex flex-col gap-8 justify-center text-center">
            <div v-for="etape in sortedSteps" :key="etape.id">
                <span class="font-medium text-base md:text-lg">Étape {{ etape.sequence }}</span>
                <div class="mt-3 md:text-base" v-html="etape.description"></div>
            </div>
        </div>
    </section>
    <section v-if="recipeStore.recipe.info" class="w-11/12 md:w-3/4 flex items-center flex-col mx-auto">
        <h2 class="text-lg font-medium font-second gap-4 flex items-center md:text-xl lg:text-2xl"
            :style="[`color: ${categoryStore.category.color}`]">
            <font-awesome-icon :icon="['fas', 'info']" />Information
        </h2>
        <div class="py-8 text-center md:text-base" v-html="recipeStore.recipe.info"></div>
    </section>
</template>

<script>
import { ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '../store/CategoryStore.js';
import { useRecipeStore } from '../store/RecipeStore.js';

export default {
    name: 'RecipeView',
    setup() {
        const recipeStore = useRecipeStore();
        const categoryStore = useCategoryStore();
        const showSuccessMessage = ref('');
        const showMessageLogin = ref('');
        const router = useRouter();

        const getRecipe = async (recipeSlug) => {
            await recipeStore.getRecipe(recipeSlug);
        };
        const getCategory = async (categorySlug) => {
            await categoryStore.getCategory(categorySlug);
        };
        const modulo = ref(recipeStore.recipe.modulo || 1);

        const multiple = ref(1);

        const incrementModulo = () => {
            multiple.value++;
            modulo.value = recipeStore.recipe.modulo * multiple.value;
        };

        const decrementModulo = () => {
            if (multiple.value > 1) {
                multiple.value--;
                modulo.value = recipeStore.recipe.modulo * multiple.value;
            }
        };

        watch(() => recipeStore.recipe.modulo, (newVal) => {
            modulo.value = newVal;
        });

        watch(() => recipeStore.recipe, (newRecipe) => {
            if (newRecipe?.unitModulo === "personnes") {
                multiple.value = 4;
            } else {
                multiple.value = 1;
            }
        }, { deep: true });
        
        watch(() => router.currentRoute.value.params.slug,
            async (newSlug) => {
                const categorySlug = router.currentRoute.value.params.category;
                
                await getCategory(categorySlug);
                await getRecipe(newSlug);
            }
        );

        return {
            recipeStore,
            getRecipe,
            categoryStore,
            getCategory,
            modulo,
            multiple,
            incrementModulo,
            decrementModulo,
            showSuccessMessage,
            showMessageLogin,
        };
    },
    methods: {
        redirectToLogin() {
            const currentRoute = this.$route.fullPath;
            this.$router.push({ name: 'login', query: { next: currentRoute } });
        },
        async addToShoppingList() {
            const ingredients = this.recipeStore.recipe.ingredients;
            const shoppingListData = ingredients.map(ingredient => ({
                name: ingredient.ingredient.name,
                quantity: ingredient.quantity ? ingredient.quantity * this.multiple : null,
                unit: ingredient.unit ? ingredient.unit.name : null,
            }));

            try {
                const response = await fetch('https://backend.asyafood.fr/api/list/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ ingredients: shoppingListData })
                });

                if (response.status === 401) {
                    this.showMessageLogin = 'Vous devez être connecté pour ajouter des ingrédients à votre liste de course.';
                }
                if (response.ok) {
                    this.showSuccessMessage = 'Les ingrédients ont été ajoutés à votre liste de course.';
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    computed: {
        sortedSteps() {
            if (this.recipeStore.recipe && this.recipeStore.recipe.steps) {
                return [...this.recipeStore.recipe.steps].sort((a, b) => a.sequence - b.sequence);
            }
            return [];
        },
        formattedIngredients() {
            if (this.recipeStore.recipe.ingredients && Array.isArray(this.recipeStore.recipe.ingredients)) {
                return this.recipeStore.recipe.ingredients.map(ingredient => ({
                    name: ingredient.quantity * this.multiple > 1 ? ingredient.ingredient.namePlurial : ingredient.ingredient.name,
                    quantity: ingredient.quantity ? ingredient.quantity * this.multiple : null,
                    unit: ingredient.quantity * this.multiple > 1 ? ingredient.unit ? ingredient.unit.namePlurial : null : ingredient.unit ? ingredient.unit.name : null
                }));
            }
            return [];
        },
    },
};
</script>