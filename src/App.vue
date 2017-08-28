<template>
  <div id="app">
    <modal></modal>

    <tab-master></tab-master>
  </div>
</template>

<script>
import Modal from './SingleComponents/Modal.vue';
import Tab-Master from './TabsComponents/Tab-Master.vue';

export default {
  name: 'app',
  components: {
      Modal, Tab-Master
  },

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
