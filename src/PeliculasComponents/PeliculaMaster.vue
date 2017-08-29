<template>
<div class="row">
  <div class="list-group col-xs-4">
    <button @click="handleCreateNewPelicula"> Crear Nueva Pelicula </button>
    <a v-for="pelicula in peliculas" href="#" class="list-group-item" @click="handleUpdatePelicula(pelicula)">
        <span>{{ pelicula.Nombre }}</span>
        <button @click="handleDeletePelicula(pelicula)"> Delete </button>
      </a>
  </div>
  <div class="col-xs-4">
    <pelicula :host="host" @added-pelicula="onAddedPelicula" @modified-pelicula="onModifiedPelicula"></pelicula>
  </div>
</div>
</template>

<script>
import Pelicula from './Pelicula.vue';
import axios from 'axios';

export default {
  name: 'pelicula-master',
  components: {
    Pelicula
  },

  data() {
    return {
      peliculas: [],
      host: 'http:///localhost:50330/api/Peliculas',
    };
  },

  mounted() {
    this.loadAllPeliculas();
    let _this = this;

    // this.$on('added-pelicula', (pelicula) => {
    //   _this.peliculas.push(pelicula);
    // });
    //
    // this.$on('modified-pelicula', (modified_pelicula) => {
    //   _this.peliculas.forEach((pelicula) => {
    //     if (pelicula.Id == modified_pelicula.Id) {
    //       let index = _this.peliculas.indexOf(pelicula);
    //       _this.peliculas[index] = modified_pelicula;
    //       // break;
    //     }
    //   });
    // });
  },

  methods: {
    /* CALLS TO SERVER */
    loadAllPeliculas() {
      let _this = this;
      axios.get(this.host).then((response) => {
        _this.peliculas = response.data;
      }).catch((error) => {
        Vue.$emit('show-modal', 'Error al conectar al servidor', error);
      });
    },

    deletePelicula(pelicula) {
      let _this = this;
      axios.get(this.host + '/' + pelicula.Id).then((response) => {
        let index = _this.peliculas.indexOf(pelicula);
        _this.peliculas.splice(index, 1);
      }).catch((error) => {
        Vue.$emit('show-modal', 'Error al conectar al servidor', error);
      });
    },

    /* HANDLE CHILDREN EVENTS */
    onAddedPelicula(pelicula) {
      this.peliculas.push(pelicula);
    },

    onModifiedPelicula(modified_pelicula) {
      _this.peliculas.forEach((pelicula) => {
         if (pelicula.Id == modified_pelicula.Id) {
           let index = _this.peliculas.indexOf(pelicula);
           _this.peliculas[index] = modified_pelicula;
           // break;
         }
       });
    },

    /* HANDLE SELF EVENTS */
    handleCreateNewPelicula() {
      Vue.$emit('show-pelicula-form', null);
    },

    handleUpdatePelicula(pelicula) {
      Vue.$emit('show-pelicula-form', pelicula)
    },

    handleDeletePelicula(pelicula) {
      this.deletePelicula(pelicula);
      Vue.$emit('close-pelicula-form');
    },
  }
};
</script>

<style>
  .list-group {
    margin: 30px
  }
  .list-group-item button {
    float: right;
  }
</style>
