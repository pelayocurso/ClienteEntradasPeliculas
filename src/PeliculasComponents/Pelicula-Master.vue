<template>
  <button @click="handleCreateNewPelicula"> Crear Nueva Pelicula </button>
  <div class="list-group">
    <a v-for="pelicula in peliculas" href="#" class="list-group-item" @click="handleUpdatePelicula(pelicula)">
      <button @click="handleDeletePelicula(pelicula)"> Delete </button>
    </a>
  </div>

  <pelicula :host="host"></pelicula>
</template>

<script>
  import ConnectionManagment from '../LogicClasses/ConnectionManagment.js';
  import Pelicula from './Pelicula.vue';

  export default {
    name: 'pelicula-master',
    components: {
      Pelicula
    },

    data() {
      return {
        peliculas: [],
        host: 'http:///localhost:50330/api/Peliculas',
        connection: null
      };
    },

    mounted() {
      this.connection = new ConnectionManagment(host);

      this.loadAllPeliculas();
      let _this = this;

      Vue.$on('added-pelicula', (pelicula) => {
        this.peliculas.push(pelicula);
      });

      Vue.$on('modified-pelicula', (modified_pelicula) => {
        _this.peliculas.forEach((pelicula) => {
          if(pelicula.Id == modified_pelicula.Id) {
            let index = _this.peliculas.indexOf(pelicula);
            _this.peliculas[index] = modified_pelicula;
            // break;
          }
        });
      });
    },

    methods: {
      /* CALLS TO SERVER */
      loadAllPeliculas() {
        let response = this.connetion.getAll();
        if (response.error) {
          Vue.$emit('show-modal', response.message, response.error);
        } else {
          this.peliculas = response;
        }
      },

      deletePelicula(pelicula) {
        let response = this.connetion.getAll();
        if (response.error) {
          Vue.$emit('show-modal', response.message, response.error);
        } else {
          let index = this.peliculas.indexOf(pelicula);
          this.peliculas.splice(index, 1);
        }
      },

      /* HANDLE SELF EVENTS */
      handleCreateNewPelicula() {
        this.$emit('show-pelicula-form', null);
      },

      handleUpdatePelicula(pelicula) {
        this.$emit('show-pelicula-form', pelicula)
      },

      handleDeletePelicula(pelicula) {
        this.deletePelicula(pelicula);
        this.$emit('close-pelicula-form');
      },
    }
  };
</script>
