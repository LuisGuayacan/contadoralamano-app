<template>
  <div id="AgregarRegistro">
    <h2>Agregar Registro</h2>
    <label for="id">Id</label>
    <input v-model="id" id="id" />
    <label for="tipo">Tipo de Registro</label>
    <input v-model="tipo" id="tipo" />
    <label for="valor">Valor($)</label>
    <input v-model="valor" id="valor" />
    <label for="fecha">Fecha</label>
    <input v-model="fecha" id="fecha" type="date"/>
    <label for="etiqueta">Etiqueta</label>
    <input v-model="etiqueta" id="etiqueta" />
    <label for="nota">Nota</label>
    <input v-model="nota" id="nota" /><br>
        <nav>
            <button v-on:click="Registrar" v-if= "true" > Ingresar Registro </button>
        </nav>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
      name: 'AgregarRegistro',
      data: function(){
        return {
            id:"",
            id_usuario: this.username,
            tipo:"",
            valor:"",
            fecha:"", 
            etiqueta:"",
            nota:"",
    }
    },
      methods: {
        Registrar: function(){
            this.username = this.$route.params.username
            var datosJSON = {
            id : this.id,
            id_usuario: this.username,
            tipo:this.tipo,
            valor:this.valor,
            fecha:this.fecha, 
            etiqueta:this.etiqueta,
            nota:this.nota
      };
      axios
        .post("https://localhost:8000/registro/", datosJSON)
        .then(respuesta  => {
          alert(respuesta.data.mensaje);
        })
        .catch ( error  => {
          alert ( " error en el servidor " );
        });
    }
  },
    created: function(){
        this.id_usuario = this.$route.params.username;
  }
}
</script>

<style>
#AgregarRegistro{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#AgregarRegistro h2{
  font-size: 30px;
  color: #283747;
}
#AgregarRegistro span{
  color: #f59f7d;
  font-weight: bold;
}
</style>
