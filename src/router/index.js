import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import RecipeView from '../views/RecipeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountView from '../views/AccountView.vue'
import ListView from '../views/ListView.vue'
import LegalsView from '../views/LegalsView.vue'
import ConfidentialityView from '../views/ConfidentialityView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import CguView from '../views/CguView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil',
        description: "Découvrez notre site de recettes asiatiques. Cuisine japonaise, coréenne, vietnamienne, chinoise, thaïlandaise, laotienne. Bon appétit !"
      }
    },
    {
      path: '/categorie/:slug',
      component: CategoryView,
      name: 'category',
      meta: {}
    },
    {
      path: '/categorie/:category/:slug',
      component: RecipeView,
      name: 'recipe',
      meta: {}
    },
    {
      path: '/connexion',
      component: LoginView,
      name: 'login',
      meta: {
        title: 'Connexion',
        description: "Connectez-vous à votre compte utilisateur."
      }
    },
    {
      path: '/mot-de-passe-oublie',
      component: ForgotPasswordView,
      name: 'forgot-password',
      meta: {
        title: 'Mot de passe oublié'
      }
    },
    {
      path: '/modification-du-mot-de-passe/:token([A-Za-z0-9-_~+/=]+)',
      component: ChangePasswordView,
      name: 'changePassword',
      meta: {
        title: 'Changer le mot de passe'
      }
    },
    {
      path: '/inscription',
      component: RegisterView,
      name: 'register',
      meta: {
        title: 'Créer un compte',
        description: "Créez votre compte utilisateur."
      }
    },
    {
      path: '/profil',
      component: AccountView,
      name: 'account',
      meta: {
        title: 'Mon compte',
        description: "Gérez votre compte utilisateur."
      }
    },
    {
      path: '/profil/liste',
      component: ListView,
      name: 'list',
      meta: {
        title: 'Liste de course',
        description: "Gérez votre liste de course."
      }
    },
    {
      path: '/mentions-legales',
      component: LegalsView,
      name: 'legals',
      meta: {
        title: 'mentions légales'
      }
    },
    {
      path: '/politique-de-confidentialite',
      component: ConfidentialityView,
      name: 'confidentiality',
      meta: {
        title: 'Politique de confidentialité'
      }
    },
    {
      path: '/cgu',
      component: CguView,
      name: 'cgu',
      meta: {
        title: 'CGU'
      }
    },
    {
      path: '/:catchAll(.*)', // Cette route attrape toutes les URL qui ne correspondent à aucune route précédente
      component: NotFoundView,
      name: 'notFound',
      meta: {
        title: 'Page introuvable'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})
router.beforeEach(async (to, from) => {
  if (to.name === 'category' || to.name === 'recipe') {
    try {
      let response
      if (to.name === 'category') {
        response = await fetch(`/api/category/${to.params.slug}`)
      } else {
        response = await fetch(`/api/recipe/${to.params.slug}`)
      }

      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas OK")
      }

      const data = await response.json()
      const metaDescription = data.metaDescription
      const title = data.name

      let metaDescriptionTag = document.querySelector('meta[name="description"]')

      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription
      } else {
        metaDescriptionTag = document.createElement('meta')
        metaDescriptionTag.name = 'description'
        metaDescriptionTag.content = metaDescription
        document.head.appendChild(metaDescriptionTag)
      }
      let metaTitleTag = document.querySelector('meta[name="title"]')
      if (metaTitleTag) {
        metaTitleTag.content = title
      } else {
        metaTitleTag = document.createElement('meta')
        metaTitleTag.name = 'title'
        metaTitleTag.content = title
        document.head.appendChild(metaTitleTag)
      }
      document.title = title ? `${title} - Asya Food` : 'Asya Food'
    } catch (error) {
      if (error.response && error.response.status === 404) {
        router.push({ name: 'notFound' })
      } else {
        console.error('Erreur lors de la récupération des données:', error)
      }
    }
  } else {
    let metaDescriptionTag = document.querySelector('meta[name="description"]')
    if (metaDescriptionTag) {
      metaDescriptionTag.content = to.meta.description
    } else {
      metaDescriptionTag = document.createElement('meta')
      metaDescriptionTag.name = 'description'
      metaDescriptionTag.content = to.meta.description
      document.head.appendChild(metaDescriptionTag)
    }
    let metaTitleTag = document.querySelector('meta[name="title"]')
    if (metaTitleTag) {
      metaTitleTag.content = to.meta.title
    } else {
      metaTitleTag = document.createElement('meta')
      metaTitleTag.name = 'title'
      metaTitleTag.content = to.meta.title
      document.head.appendChild(metaTitleTag)
    }
    document.title = to.meta.title ? `${to.meta.title} - Asya Food` : 'Asya Food'
  }
})
export default router
