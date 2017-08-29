<template>
  <div id="app">
    <modal></modal>

    <tab-master></tab-master>
  </div>
</template>

<script>
import Modal from './SingleComponents/Modal.vue';
import TabMaster from './TabsComponents/TabMaster.vue';

export default {
  name: 'app',
  components: {
      Modal, TabMaster
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
