<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" class="nav-item">
        <a class="nav-link" :class="{'active' : tab.activated}" data-toggle="tab" :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
      </li>
    </ul>

    <div class="tab-content">
      <tab name="Entradas" :selected="true">
        <!--<entrada-master></entrada-master>-->
      </tab>

      <tab name="Peliculas" :selected="false">
          <pelicula-master></pelicula-master>
      </tab>
    </div>
  </div>
</template>

<script>
  import Tab from './Tab.vue';
  import PeliculaMaster from  '../PeliculasComponents/PeliculaMaster.vue'
  import Alert from '../SingleComponents/Alert.vue';
  //import EntradaMaster from  '../EntradasComponents/EntradaMaster.vue'

  export default {
    name: 'tab-master',
    components: {
      Tab, Alert, PeliculaMaster//, EntradaMaster
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
