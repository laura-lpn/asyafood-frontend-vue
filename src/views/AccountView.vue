<template>
  <section class="bg-account h-category-img-mobile w-full lg:h-category-img bg-center bg-cover">
    <div class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48">
    </div>
  </section>
  <section class="flex flex-col items-center relative w-4/5 mx-auto">
    <MotifTitle text="Mon compte" />
    <button @click="logout()"
      class="absolute text-yellow right-0 top-5 text-xl md:text-2xl lg:top-8 lg:right-[15%] hover:text-red">
      <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
    </button>
    <RouterLink :to="{ name: 'list' }" class="bg-yellow text-white rounded-main mb-8 px-8 py-2 hover:bg-red">Voir la liste
      de course</RouterLink>
  </section>
  <div class="grid grid-cols-5 w-11/12 md:grid-cols-2 md:w-4/5 gap-4 mx-auto justify-center">
    <span class="font-second col-span-2 md:col-span-1 font-bold text-red flex justify-end">Adresse email :</span>
    <p class="col-span-3 md:col-span-1">{{ user.email }}</p>
  </div>
  <div class="grid grid-cols-5 w-11/12 md:grid-cols-2 md:w-3/5 gap-4 mx-auto justify-center">
    <span class="font-second col-span-2 md:col-span-1 font-bold text-red flex justify-end">Pseudo :</span>
    <p class="col-span-3 md:col-span-1">{{ user.username }}</p>
  </div>
  <!-- <section>
    <MotifTitleSection text="Mes recettes favorites" color="yellow" />
    <div>
      <div></div>
    </div>
  </section> -->
  <section>
    <MotifTitleSection text="Modifier mes infos" color="yellow" />
    <section
      class="flex items-center flex-col gap-6 justify-center md:gap-8 text-center mb-12 m-auto w-11/12 shadow-main rounded-mobile py-6 px-8 md:w-3/4 lg:2/5 lg:py-10 xl:w-1/2 md:px-8">
      <form @submit.prevent="updateEmail" class="grid justify-center items-center gap-4 w-full lg:flex">
        <div class="col-span-2 flex flex-col gap-4 items-center md:flex-row">
          <label class="font-medium text-base text-center" for="email">Nouvelle adresse email :</label>
          <input type="email" v-model="newEmail" id="email" placeholder="Email" autocomplete="email" required
            class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit"
          class="bg-red col-span-2 w-fit m-auto rounded-main py-2 px-4 text-white hover:bg-yellow lg:mx-0">Enregistrer</button>
      </form>
      <p v-if="errorEmail" class="text-red">{{ errorEmail }}</p>
      <hr class="h-2 w-4/5 text-yellow md:w-3/5">
      <form @submit.prevent="updateUsername" class="grid justify-center items-center gap-4 w-full lg:flex">
        <div class="col-span-2 flex flex-col gap-4 items-center md:flex-row">
          <label class="font-medium text-base text-center" for="username">Nouveau pseudo :</label>
          <input type="text" v-model="newUsername" id="username" placeholder="Pseudo" autocomplete="name" required
            class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit"
          class="bg-red col-span-2 w-fit m-auto rounded-main py-2 px-4 text-white hover:bg-yellow lg:mx-0">Enregistrer</button>
      </form>
      <p v-if="errorUsername" class="text-red">{{ errorUsername }}</p>
      <hr class="h-2 w-4/5 text-yellow md:w-3/5">
      <form @submit.prevent="updatePassword" class="grid justify-center items-center gap-4 w-full lg:flex lg:flex-wrap">
        <div class="col-span-2 flex flex-col gap-4 items-center md:flex-row md:justify-center lg:w-full">
          <label class="font-medium text-base text-center" for="password">Nouveau mot de passe :</label>
          <input type="password" v-model="newPassword" placeholder="Nouveau mot de passe" required
            @input="checkPasswordMatch"
            class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
        </div>
        <div class="col-span-2 gap-4 items-center flex flex-col md:flex-row md:justify-center lg:w-full">
          <label class="font-medium text-base text-center" for="confirmPassword">Confirmez le mot de passe :</label>
          <input type="password" v-model="confirmPassword" placeholder="Confirmez le mot de passe" required
            @input="checkPasswordMatch"
            class="rounded-input py-2 px-3 bg-white border-black border-2 placeholder:text-yellow focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
        </div>
        <p v-if="!passwordConfirmed" class="text-red font-medium text-left text-xs mb-4">
          Les mots de passe ne correspondent pas
        </p>
        <div class="col-span-3 lg:w-full">
          <button type="submit"
            class="bg-red w-fit m-auto rounded-main py-2 px-4 text-white hover:bg-yellow">Enregistrer</button>
        </div>
      </form>
    </section>
  </section>
  <section class="w-11/12 flex flex-col justify-center mx-auto">
    <MotifTitleSection text="Supprimer mon compte" color="red" />
    <div class="flex flex-col items-center gap-6 text-center">
      <p class="text-red font-medium text-base">
        Êtes-vous sûr de vouloir supprimer votre compte ?
      </p>
      <button @click="showDeleteConfirmation = true"
        class="bg-red w-fit m-auto rounded-main py-2 px-4 text-white hover:bg-yellow">
        Supprimer mon compte
      </button>
      <p v-if="showDeleteConfirmation" class="text-red mt-4">
        Cette action est irréversible. Veuillez confirmer en saisissant votre mot de passe :
      </p>
      <input v-if="showDeleteConfirmation" type="password" v-model="deletePassword" placeholder="Mot de passe" required
        class="rounded-input py-2 px-3 mt-2 bg-white border-black border-2 placeholder:text-yellow focus-visible:border-yellow focus:outline-none focus:shadow-outline" />
      <button v-if="showDeleteConfirmation" @click="confirmAccountDeletion"
        class="bg-red w-fit m-auto rounded-main py-2 px-4 text-white mt-2 hover:bg-yellow">
        Confirmer la suppression
      </button>
      <p v-if="errorDelete" class="text-red mt-2">{{ errorDelete }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AccountView',
  data() {
    return {
      user: {},
      newEmail: '',
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      passwordConfirmed: true,
      errorEmail: '',
      errorUsername: '',
      showDeleteConfirmation: false,
      deletePassword: '',
      errorDelete: ''
    }
  },
  methods: {
    checkPasswordMatch() {
      this.passwordConfirmed = this.newPassword === this.confirmPassword
    },
    async updateEmail() {
      try {
        const response = await fetch('https://backend.asyafood.fr/api/profil/edit-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.newEmail }),
        });

        if (response.ok) {
          this.user.email = this.newEmail;
          this.newEmail = '';
          this.logout();
        }
        if (response.status === 409) {
          this.errorEmail = 'Cet e-mail est déjà utilisé';
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'e-mail :', error);
      }
    },
    async updateUsername() {
      try {
        const response = await fetch('https://backend.asyafood.fr/api/profil/edit-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.newUsername }),
        });

        if (response.ok) {
          this.user.username = this.newUsername;
          this.newUsername = '';
          this.logout();
        }
        if (response.status === 409) {
          this.errorUsername = 'Ce pseudo est déjà utilisé';
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du pseudo :', error);
      }
    },
    async updatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        console.error('Les mots de passe ne correspondent pas.');
        return;
      }

      try {
        const response = await fetch('https://backend.asyafood.fr/api/profil/edit-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: this.newPassword }),
        });

        if (response.ok) {
          console.log('Mot de passe mis à jour avec succès');
          this.newPassword = '';
          this.confirmPassword = '';
          this.logout();
        } else {
          console.error('Erreur lors de la mise à jour du mot de passe');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe :', error);
      }
    },
    async logout() {
      const response = await fetch('https://backend.asyafood.fr/api/logout')
      if (response.ok) {
        this.$router.push({ name: 'login' })
      }
    },
    async confirmAccountDeletion() {
      try {
        const response = await fetch('https://backend.asyafood.fr/api/profil/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: this.deletePassword }),
        });

        if (response.ok) {          
          this.$router.push({ name: 'login' })
        } else if (response.status === 401) {
          this.errorDelete = 'Mot de passe incorrect. Veuillez réessayer.';
        } else {
          this.errorDelete = 'Une erreur est survenue lors de la suppression du compte.';
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du compte :', error);
      }
    }
  },
  async beforeMount() {
    const token = fetch('https://backend.asyafood.fr/api/check-token', {
      method: 'GET',
      credentials: 'include'
    });
    if (!token.ok) {
      this.$router.push({ name: 'login' })
    }
    const response = await fetch('https://backend.asyafood.fr/api/profil', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      const user = await response.json()
      this.user = user
    } else {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
