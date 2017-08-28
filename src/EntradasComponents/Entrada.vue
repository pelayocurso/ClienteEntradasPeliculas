<template>
  <form v-if="entrada">
    <h3 v-if="entrada.Id">Editando Entrada Nº{{ entrada.Id }}:</h3>
    <h3 v-else>Creando Nueva Entrada: </h3>

    <div class="form-group">
      <label for="pelicula-entrada"></label>
      <input type="text" class="form-control" id="pelicula-entrada" placeholder="Nombre de la pelicula" >
    </div>
    <div class="form-group">
      <label for="sesion-entrada"></label>
      <input type="date" class="form-control" id="sesion-entrada" data-provide="datepicker" >
      <!--
      <div class='input-group date' id='datetimepicker1'>
        <input type='text' class="form-control" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
      </div>
      -->
    </div>
    <div class="form-group">
      <label for="precio-entrada"></label>
      <input type="number" class="form-control" id="precio-entrada" placeholder="">
    </div>

    <button class="btn btn-primary">Guardar</button>
    <button class="btn btn-secondary">Cancelar</button>
  </form>
</template>

<script>
