<template>
  <form v-if="pelicula != null">
    <h3 v-if="pelicula.Id">Editando Pelicula Nº{{ pelicula.Id }}:</h3>
    <h3 v-else>Creando Nueva Pelicula: </h3>

    <div class="form-group">
      <label for="nombre-pelicula">Nombre:</label>
      <input type="text" class="form-control" id="nombre-pelicula" v-model="pelicula.Nombre"/>
    </div>
    <div class="form-group">
      <label for="ano-pelicula">Año:</label>
      <input type="text" class="form-control" id="ano-pelicula" v-model="pelicula.Ano"/>
    </div>
    <div class="form-group">
      <label for="pais-pelicula">Pais:</label>
      <input type="text" class="form-control" id="pais-pelicula" v-model="pelicula.Pais"/>
    </div>
    <div class="form-group">
      <label for="director-pelicula">Director:</label>
      <input type="text" class="form-control" id="director-pelicula" v-model="pelicula.Director"/>
    </div>

    <button v-if="pelicula.Id" class="btn btn-primary" @click="handleUpdatePelicula">Guardar</button>
    <button v-else class="btn btn-primary" @click="handleCreatePelicula">Guardar</button>
    <button class="btn btn-secondary">Cancelar</button>
  </form>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'pelicula',
    props: ['host'],

    data() {
      return {
        pelicula: null
      };
    },

    created() {
      let _this = this;

      Vue.$on('show-pelicula-form', (pelicula) => {
        if(pelicula) {
          _this.pelicula = pelicula;
        } else {
          _this.pelicula = { Nombre: '', Ano: '', Pais: '', Director: '' };
        }
      });

      Vue.$on('close-pelicula-form', () => {
        _this.pelicula = null;
      });
    },

    methods: {
      /* CALLS TO SERVER */
      updatePelicula(pelicula) {
        let _this = this;
        axios.put((this.host + '/' + pelicula.Id), pelicula).then((response) => {
          _this.$emit('modified-pelicula', pelicula);
          _this.pelicula = null;
        }).catch((error) => {
          Vue.$emit('show-modal', 'Error al conectar al servidor', error);
        });
      },

      createPelicula(pelicula) {
        let _this = this;
        axios.post(this.host, pelicula).then((response) => {
          _this.$emit('added-pelicula', pelicula);
          _this.pelicula = null;
        }).catch((error) => {
          Vue.$emit('show-modal', 'Error al conectar al servidor', error);
        });
      },

      /* HANDLE SELF EVENTS */
      handleCreatePelicula() {
        this.createPelicula(this.pelicula);
      },

      handleUpdatePelicula() {
        this.updatePelicula(this.pelicula);
      },
    }
  }
</script>

<style>
  form {
    margin: 30px;
  }
</style>
