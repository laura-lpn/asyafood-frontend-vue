<template>
  <section class="bg-legals h-category-img-mobile w-full bg-center bg-cover lg:h-category-img">
    <div
      class="w-full h-full bg-filter-white flex flex-col items-center justify-end text-center px-5 md:px-16 lg:px-48"
    ></div>
  </section>
  <MotifTitle text="Mentions légales" />
  <section class="w-11/12 mx-auto md:w-3/4">
    <h2 class="text-lg font-semibold my-4">Editeur du Site</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">
      Nom : Lepannetier<br />
      Prénom : Laura<br />
      Toulouse<br />
      Email : laura@asyafood.fr<br />
      Site Web : asyafood.fr<br />
    </p>
    <h2 class="text-lg font-semibold my-4">Hébergement</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">
      Le Site est hébergé par la société PlanetHoster, situé 4416 Louis-B.-Mayer Laval, Québec
      Canada H7P 0G1, (contact téléphonique ou email : (+1) 855 774 4678).
    </p>
    <h2 class="text-lg font-semibold my-4">Développement</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">
      Laura Lepannetier<br />
      Adresse : Toulouse<br />
      Site Web : asyafood.fr<br />
    </p>
    <h2 class="text-lg font-semibold my-4">Directeur de publication</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">Le Directeur de la publication du Site est Laura Lepannetier.</p>
    <h2 class="text-lg font-semibold my-4">Nous contacter</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">
      Par email : contact@asyafood.fr<br />
    </p>
    <h2 class="text-lg font-semibold my-4">Données personnelles</h2>
    <p class="md:text-base mx-4 md:mx-8 my-2">
      Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la
      vie privée, disponible depuis la section "Charte de Protection des Données Personnelles",
      conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016
      («RGPD»).
    </p>
    <h2 class="text-lg font-semibold my-4">Crédits photos</h2>
    <p id="credit" class="md:text-base mx-4 md:mx-8 my-2">
      Photo de
      <a
        href="https://unsplash.com/fr/@yokeboy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Y K</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/-e6Xu27_T50?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (accueil)<br />
      <template v-for="category in categories" :key="category.id">
        <p v-html="category.copyright"></p>
      </template>
      <a
        href="https://fr.freepik.com/photos-gratuite/arashiyama-automne-long-riviere-kyoto-au-japon_10695405.htm"
        target="_blank"
        >Image de tawatchai07</a
      >
      sur Freepik (mon compte)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@v2306?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Valery Rabchenyuk</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/5I_oFqB0n6g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (liste de course)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@blinkedandpassed_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Pui-yi Leung</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/Cj0y3dsjQtQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (inscription)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@cadop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Mathew Schwartz</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/dwd10kdmM2c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (connexion)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@axpphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >AXP Photography</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/TduoWTN0at8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (404)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@raimondklavins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Raimond Klavins</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/RIv4CLslgx0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (mot de passe oublié)<br />
      Photo de
      <a
        href="https://unsplash.com/fr/@cattdio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >catherine dionne</a
      >
      sur
      <a
        href="https://unsplash.com/fr/photos/eqWw7Ee85mg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        target="_blank"
        >Unsplash</a
      >
      (réinitialisation mot de passe)<br />
    </p>
  </section>
</template>

<script>
export default {
  name: 'LegalsView',

  data() {
    return {
      categories: []
    }
  },
  methods: {
    async getCategories() {
      const response = await fetch('https://master-7rqtwti-isda55xcmtcww.fr-4.platformsh.site/api/categories')
      const categories = await response.json()
      this.categories = categories
    }
  },
  async beforeMount() {
    await this.getCategories()
  }
}
</script>

<style>
#credit a {
  color: #bd1000 !important;
}
</style>
