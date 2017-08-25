<template>
  <div id="app">
    <modal></modal>

    <tab-master></tab-master>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
