import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'

import MotifTitleSection from './components/section/MotifTitleSection.vue'
import MotifTitle from './components/section/MotifTitle.vue'
import MotifTitleRecipe from './components/section/MotifTitleRecipe.vue'
import MotifTitleCategory from './components/section/MotifTitleCategory.vue'
import Pagination from './components/Pagination.vue'
import RecipeCard from './components/RecipeCard.vue'
import CategoryCard from './components/CategoryCard.vue'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faListCheck,
  faBarsStaggered,
  faXmark,
  faRightFromBracket,
  faFilter,
  faChevronDown,
  faPrint,
  faHourglassHalf,
  faPepperHot,
  faPlus,
  faMinus,
  faUtensils,
  faInfo
} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(
  faUser,
  faListCheck,
  faInstagram,
  faFacebookF,
  faBarsStaggered,
  faXmark,
  faRightFromBracket,
  faFilter,
  faChevronDown,
  faPrint,
  faHourglassHalf,
  faPepperHot,
  faPlus,
  faMinus,
  faUtensils,
  faInfo
)

const pinia = createPinia()
const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)

  .component('MotifTitleSection', MotifTitleSection)
  .component('MotifTitleCategory', MotifTitleCategory)
  .component('MotifTitleRecipe', MotifTitleRecipe)
  .component('MotifTitle', MotifTitle)
  .component('Pagination', Pagination)
  .component('RecipeCard', RecipeCard)
  .component('CategoryCard', CategoryCard)

app.use(router)
app.use(pinia)
app.use(Vue3Lottie)
app.use(VueDOMPurifyHTML, {
  namedConfigurations: {
    svg: {
      USE_PROFILES: { svg: true }
    },
    mathml: {
      USE_PROFILES: { mathMl: true }
    }
  }
})
app.mount('#app')
