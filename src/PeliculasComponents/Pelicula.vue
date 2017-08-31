<template>
<form v-if="pelicula != null">
  <h3 v-if="pelicula.Id">Editando Pelicula Nº{{ pelicula.Id }}:</h3>
  <h3 v-else>Creando Nueva Pelicula: </h3>

  <div class="form-group">
    <label for="nombre-pelicula">Nombre:</label>
    <input type="text" class="form-control" id="nombre-pelicula" v-model="pelicula.Nombre" />
    <span v-show="this.errors.nombre" class="help-error">{{ this.errors.email }}</span>
  </div>
  <div class="form-group">
    <label for="ano-pelicula">Año:</label>
    <input type="text" class="form-control" id="ano-pelicula" v-model="pelicula.Ano" />
    <span v-show="this.errors.ano" class="help-error">{{ this.errors.ano }}</span>
  </div>
  <div class="form-group">
    <label for="pais-pelicula">Pais:</label>
    <input type="text" class="form-control" id="pais-pelicula" v-model="pelicula.Pais" />
    <span v-show="this.errors.pais" class="help-error">{{ this.errors.pais }}</span>
  </div>
  <div class="form-group">
    <label for="director-pelicula">Director:</label>
    <input type="text" class="form-control" id="director-pelicula" v-model="pelicula.Director" />
    <span v-show="this.errors.director" class="help-error">{{ this.errors.director }}</span>
  </div>

  <button v-if="pelicula.Id" class="btn btn-success" @click="handleUpdatePelicula">Guardar</button>
  <button v-else class="btn btn-success" @click="handleCreatePelicula">Guardar</button>
  <button class="btn btn-secondary" @click="handleCancel">Cancelar</button>
</form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'pelicula',
  props: ['host'],

  data() {
    return {
      pelicula: null,
      errors: {
        nombre: null,
        ano: null,
        pais: null,
        director: null
      }
    };
  },

  created() {
    let _this = this;

    Vue.$on('show-pelicula-form', (pelicula) => {
      if (pelicula) {
        _this.pelicula = JSON.parse(JSON.stringify(pelicula));
      } else {
        _this.pelicula = {
          Nombre: '',
          Ano: '',
          Pais: '',
          Director: ''
        };
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
        Vue.$emit('show-modal', error.message, error.stack);
      });
    },

    createPelicula(pelicula) {
      let _this = this;
      axios.post(this.host, pelicula).then((response) => {
        _this.$emit('added-pelicula', response.data);
        _this.pelicula = null;
      }).catch((error) => {
        Vue.$emit('show-modal', error.message, error.stack);
      });
    },

    /* HANDLE SELF EVENTS */
    handleCreatePelicula() {
      this.validateFields();
      if (!this.errors.nombre && !this.errors.ano &&
        !this.errors.pais && !this.errors.director) {
        this.createPelicula(this.pelicula);
      }
    },

    handleUpdatePelicula() {
      this.validateFields();
      if (!this.errors.nombre && !this.errors.ano &&
        !this.errors.pais && !this.errors.director) {
        this.updatePelicula(this.pelicula);
      }
    },

    handleCancel() {
      this.pelicula = null;
    },

    /* VALIDATIONS */
    validateNotEmpty(field) {
      return (field);
    }

    validateName(name) {
      return (/^[a-z ,.'-]+$/i.test(name));
    },

    validateNumber(number) {
      return (/^\d+$/.test(number));
    },

    validateYear(year) {
      return (/^[0-9]{4}/.test(year));
    },

    validateFields() {
      if (!this.validateNotEmpty(this.pelicula.Nombre)) {
        this.errors.nombre = "El nombre no puede estar vacio";
      }
      if (!this.validateYear(this.pelicula.Ano)) {
        this.errors.ano = "Formato de año no permitido";
      }
      if (!this.validateName(this.pelicula.Pais)) {
        this.errors.pais = "Formato de nombre de pais no permitido";
      }
      if (!this.validateName(this.pelicula.Director)) {
        this.errors.director = "Formato de nombre no permitido"
      }
    }

  }
}
</script>

<style>
form {
  margin: 30px;
}

.help-error {
  color: #ff3860;
  display: block;
  font-size: 11px;
  margin-top: 5px;
}
</style>
