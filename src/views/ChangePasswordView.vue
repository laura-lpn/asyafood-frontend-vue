<template>
  <section
    class="bg-resetPassword h-category-img-mobile w-full bg-center bg-cover lg:h-category-img"
  >
    <div
      class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48"
    ></div>
  </section>
  <MotifTitle text="Changer le mot de passe" />
  <div
    v-if="successMessage"
    class="text-yellow font-bold py-2 px-4, text-center w-4/5 m-auto md:w-3/5 lg:w-1/2"
  >
    <p>{{ successMessage }}</p>
    <RouterLink :to="{ name: 'login' }" class="text-red">Se connecter</RouterLink>
  </div>
  <section
    class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2"
  >
    <form v-on:submit.prevent="resetPassword()" class="w-4/5 flex flex-col my-5 md:w-3/5">
      <input
        type="password"
        id="password"
        v-model="newPassword"
        placeholder="Mot de passe"
        required
        @input="checkPasswordMatch"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline"
      />
      <input
        type="password"
        v-model="confirmNewPassword"
        placeholder="Confirmer le mot de passe"
        required
        @input="checkPasswordMatch"
        class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline"
      />
      <p v-if="!passwordsMatch" class="text-red font-medium text-left text-xs mb-4">
        Les mots de passe ne correspondent pas.
      </p>
      <button
        type="submit"
        :disabled="isLoading || !passwordsMatch"
        :class="{ 'bg-yellow': isLoading, 'hover:bg-yellow': isLoading }"
        class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3"
      >
        Changer le mot de passe
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'ChangePasswordView',
  data() {
    return {
      newPassword: '',
      confirmNewPassword: '',
      successMessage: '',
      isLoading: false,
      passwordsMatch: true
    }
  },
  async beforeMount() {
    const token = this.$route.params.token
    try {
      const response = await fetch(`https://backend.asyafood.fr/api/reset/${token}`)
      if (response.status === 404) {
        this.$router.push({ name: 'notFound', params: {catchAll: '404'} })
      }
    } catch (error) {
        this.$router.push({ name: 'notFound', params: {catchAll: '404'} })
    }
  },
  methods: {
    checkPasswordMatch() {
      this.passwordsMatch = this.newPassword === this.confirmNewPassword
    },
    async resetPassword() {
      const token = this.$route.params.token
      this.isLoading = true
      this.successMessage = ''
      try {
        const response = await fetch(`https://backend.asyafood.fr/api/change-password/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newPassword: this.newPassword
          })
        })

        this.isLoading = false
        this.newPassword = ''

        if (response.ok) {
          this.successMessage = 'Votre mot de passe a bien été changé.'
        }
      } catch (error) {
        console.error('Error resetting password:', error)
      }
    }
  }
}
</script>
