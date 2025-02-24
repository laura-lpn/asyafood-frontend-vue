<template>
  <section class="bg-register h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
    <div
      class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48"
    ></div>
  </section>
  <MotifTitle text="S'inscrire" />
  <section
    class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2"
  >
    <form @submit.prevent="register()" class="w-4/5 flex flex-col my-5 md:w-3/5">
      <div v-if="error" class="text-red font-bold py-2 px-4">
        <p>{{ error }}</p>
      </div>
      <input
        type="text"
        v-model="username"
        placeholder="Pseudo"
        required
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline"
      />
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
        @input="checkPasswordMatch"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outlinefocus-visible:border-red"
      />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirmer le mot de passe"
        required
        @input="checkPasswordMatch"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outlinefocus-visible:border-red"
      />
      <p v-if="!passwordConfirmed" class="text-red font-medium text-left text-xs mb-4">
        Les mots de passe ne correspondent pas
      </p>
      <div class="flex items-center my-3 gap-6">
        <input
          type="checkbox"
          v-model="acceptedTerms"
          class="accent-red w-6 h-6 md:w-4 md:h-4"
        />
        <label for="acceptedTerms" class="text-left md:text-sm">
          J'accepte les
          <RouterLink :to="{ name: 'cgu' }" class="text-yellow font-medium hover:underline"
            >conditions générales d'utilisation.</RouterLink
          >
        </label>
      </div>
      <button
        type="submit"
        :disabled="!passwordConfirmed"
        class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3"
      >
        S'inscrire
      </button>
    </form>
    <div class="w-4/5 flex flex-col lg:flex-row items-center md:justify-between md:w-3/5">
      <h2 class="font-second text-base">Déjà inscrit ?</h2>
      <RouterLink :to="{ name: 'login' }"
        ><span class="text-base font-medium text-yellow mt-2">Se connecter</span></RouterLink
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      error: '',
      successMessage: '',
      passwordConfirmed: true,
      acceptedTerms: false
    }
  },
  methods: {
    checkPasswordMatch() {
      this.passwordConfirmed = this.password === this.confirmPassword
    },
    async register() {
      if (!this.acceptedTerms) {
        this.error = 'Veuillez accepter les conditions générales d\'utilisation.'
        return
      }
      if (!this.username || this.username.trim() === '') {
        this.error = 'Please enter a username.'
        return
      }
      const response = await fetch('https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      })

      if (response.ok) {
        this.successMessage = 'Registration successful! You can now log in.'
        this.$router.push({ name: 'login', query: { success: true } })
      }
      if (response.status === 400) {
        const data = await response.json()
        this.error = data.errors[0]
      }
      if (response.status === 500) {
        this.error = 'Erreur serveur'
      }
    }
  }
}
</script>
