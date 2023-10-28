<template>
  <section class="bg-login h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
    <div class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48">
    </div>
  </section>
  <MotifTitle text="Se connecter" />
  <section
    class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2">
    <form v-on:submit.prevent="login()" class="w-4/5 flex flex-col my-5 md:w-3/5">
      <div v-if="error" class="text-red font-bold py-2 px-4">
        <p>{{ error }}</p>
      </div>
      <input type="email" id="email" v-model="email" placeholder="Email" required :class="{ 'border-red': error }"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
      <input type="password" id="password" v-model="password" placeholder="Mot de passe" required
        :class="{ 'border-red': error }"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow mt-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
      <RouterLink :to="{ name: 'forgot-password' }" class="text-left mb-2">
        <span class="text-xs font-medium text-red">Mot de passe oublié ?</span>
      </RouterLink>
      <button type="submit" :disabled="isLoading" :class="{ 'bg-yellow': isLoading, 'hover:bg-yellow': isLoading }"
        class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3">
        Se connecter
      </button>
    </form>
    <div class="w-4/5 flex flex-col lg:flex-row items-center md:justify-between md:w-3/5">
      <h2 class="font-second text-base">Nouvel utilisateur ?</h2>
      <RouterLink :to="{ name: 'register' }">
        <span class="text-base font-medium text-yellow mt-2">Créer un compte</span>
      </RouterLink>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  },
  setup() {
    const token = fetch('api/check-token')
    if (token.ok) {
      this.$router.push({ name: 'account' })
    }
  },
  created() {
    // Check for the query parameter when the component is created
    const params = new URLSearchParams(this.$route.query);
    if (params.get('success')) {
      this.successMessage = 'Inscription réussie ! Connectez-vous pour continuer.';
    }
  },

  methods: {
    async login() {
      this.isLoading = true
      this.error = ''

      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })

      this.isLoading = false

      if (response.ok) {
        const params = new URLSearchParams(this.$route.query);
        const nextRoute = params.get('next') || { name: 'account' };
        this.$router.push(nextRoute);
      } else {
        this.error = "Nom d'utilisateur ou mot de passe incorrect."
      }

      this.email = ''
      this.password = ''
    }
  }
}
</script>
