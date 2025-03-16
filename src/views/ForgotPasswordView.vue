<template>
    <section class="bg-forgotPassword h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
    </section>
    <MotifTitle text="Mot de passe oublié" />
    <div v-if="successMessage" class="text-yellow font-bold py-2 px-4, text-center w-4/5 m-auto md:w-3/5 lg:w-1/2">
        <p>{{ successMessage }}</p>
        <RouterLink :to="{ name: 'login' }" class="text-red">Se connecter</RouterLink>
    </div>
    <section
        class="flex items-center flex-col justify-center text-center my-8 m-auto w-11/12 shadow-main rounded-mobile py-8 px-6 md:w-4/5 lg:w-3/5 xl:w-1/2">
        <form v-on:submit.prevent="handleSubmit" class="w-4/5 flex flex-col my-5 md:w-3/5">
            <p>Entrez votre adresse email et nous vous enverrons un lien pour rénitialiser votre mot de passe.</p>
            <input type="email" id="email" v-model="email" placeholder="Email" required autocomplete="email"
                class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow my-3 focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
            <button type="submit" :disabled="isLoading" :class="{ 'bg-yellow': isLoading, 'hover:bg-yellow': isLoading }"
                class="bg-red rounded-main py-2 text-white hover:bg-yellow mt-3">
                Envoyer le lien
            </button>
        </form>
    </section>
</template>
  
<script>
export default {
    name: 'ForgotPasswordView',

    data() {
    return {
      email: '',
      isLoading: false,
      successMessage: ''
    };
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault();
      this.isLoading = true;
      this.successMessage = '';

      const formData = new FormData();
      formData.append('email', this.email);

      try {
        const response = await fetch('https://backend.asyafood.fr/api/forgot-password', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        this.isLoading = false;

        if (response.status === 200 || response.status === 404 || response.status === 202) {
          this.successMessage = 'Si un compte avec cette adresse email existe, un email vient d\'être envoyé contenant un lien pour rénitialiser votre mot de passe.';
          this.email = '';
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    }
  }

}
</script>
  