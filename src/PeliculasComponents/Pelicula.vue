<template>
  <form v-if="pelicula">
    <h3 v-if="pelicula.Id">Editando Pelicula Nº{{ pelicula.Id }}:</h3>
    <h3 v-else>Creando Nueva Pelicula: </h3>

    <div class="form-group">
      <label for="nombre-pelicula"></label>
      <input type="text" class="form-control" id="nombre-pelicula" />
    </div>
    <div class="form-group">
      <label for="ano-pelicula"></label>
      <input type="text" class="form-control" id="ano-pelicula" />
    </div>
    <div class="form-group">
      <label for="pais-pelicula"></label>
      <input type="text" class="form-control" id="pais-pelicula" />
    </div>
    <div class="form-group">
      <label for="director-pelicula"></label>
      <input type="text" class="form-control" id="director-pelicula" />
    </div>

    <button v-if="pelicula.Id" class="btn btn-primary" @click="handleUpdatePelicula">Guardar</button>
    <button v-else class="btn btn-primary" @click="handleCreatePelicula">Guardar</button>
    <button class="btn btn-secondary">Cancelar</button>
  </form>
</template>

<script>
  export default {
    name: 'pelicula',
    props: ['host'],

    data() {
      return {
        pelicula: null,
        connection: new ConnectionManagment(this.host)
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
        let response = this.connetion.put(pelicula.id, pelicula);
        if(response.error) {
          Vue.$emit('show-modal', response.message, response.error);
        } else {
          this.$emit('modified-pelicula', pelicula);
          this.pelicula = null;
        }
      },

      createPelicula(pelicula) {
        let response = this.connetion.post(pelicula);
        if(response.error) {
          Vue.$emit('show-modal', response.message, response.error);
        } else {
          this.$emit('added-pelicula', pelicula);
          this.pelicula = null;
        }
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
