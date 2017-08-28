<template>
  <ul class="nav nav-tabs">
    <li v-for="tab in tabs" :class="{'active': tab.activated}">
      <a data-toggle="tab" :href="tab.href()">{{ name }}</a>
    </li>
  </ul>

  <div class="tab-content">
    <tab name="Entradas" :selected="true">
      <entrada-master></entrada-master>
    </tab>

    <tab name="Peliculas" :selected="false">
        <pelicula-master></pelicula-master>
    </tab>
  </div>
</template>

<script>
  import Tab from './Tab.vue';
  import PeliculaMaster from  '../EntradasComponents/Pelicula-Master.vue'
  import EntradaMaster from  '../PeliculasComponents/Entrada-Master.vue'

  export default {
    name: 'tab-master',
    components: {
      Tab, EntradaComponents, PeliculaMaster
    },

    data() {
      return { tabs: [] };
    },

    created() {
      this.tabs = this.$children;
    },

    methods: {
      selectTab(selected_tab) {
        this.tabs.forEach((tab) => {
          tab.activated = (tab.href == selected_tab.href);
        });
      }
    }
  };
</script>
