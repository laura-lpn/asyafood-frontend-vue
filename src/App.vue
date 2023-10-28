<script setup>
import MyHeader from './components/MyHeader.vue'
import MyFooter from './components/MyFooter.vue'
</script>

<template>
  <MyHeader />
  <main>
    <RouterView />
  </main>
  <MyFooter />
</template>
