<template>
<div>
  <h2> Hola Pedro </h2>
  <h2>¿qué quieres hacer? {{nota}}</h2>
  <nav>
  <button v-on:click="postRegistro" > Agregar un Registro </button>
  <button v-on:click="postPto" > Agregar un presupuesto </button>
  </nav>
    <div id="AgregarRegistro" v-if = "voyA">
      <h2>Agregar Registro</h2>
      <label for="id">Id</label>
      <input v-model="id" id="id" />
      <label for="tipo">Tipo de Registro</label>
      <select v-model= "tipo">
        <option>egreso</option>
        <option>ingreso</option>
     </select>
      <label for="valor">Valor($)</label>
      <input v-model="valor" id="valor" />
      <label for="fecha">Fecha</label>
      <input v-model="fecha" id="fecha" type="date"/>
      <label for="etiqueta">Etiqueta</label>
      <select v-model= "etiqueta">
        <option>Casa</option>
        <option>Comida</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
        <option>Salario</option>
      </select>
      <label for="nota">Nota</label>
      <input v-model="nota" id="nota" /><br>
      <nav>
       <button v-on:click="Registrar" > Ingresar Registro </button>
      </nav>

  </div>
   <div id="AgregarPto" v-else >
    <h2>Agregar Presupuesto</h2>
    <label for="idP">Id</label>
    <input v-model="idPto" id="idpto" />
    <label for="etiqueta">Etiqueta</label>
    <select v-model= "etiqueta">
        <option>Casa</option>
        <option>Comida</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
      </select>
    <label for="valor">Valor($)</label>
    <input v-model="valor" id="valor" />
    <nav>
      <button v-on:click="RegistrarPto"> Ingresar Presupuesto </button>
    </nav>

  </div>
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
            voyA:false,
            idPto:""
           
    }
    },
      methods: {
        Registrar: function(){
            this.username = this.$route.params.username
            var datosJSON = {
            idPto : this.idPto,
            id_usuario: this.username,
            tipo:this.tipo,
            valor:this.valor,
            fecha:this.fecha, 
            etiqueta:this.etiqueta,
            nota:this.nota
      };
      axios
        .post("https://backend-contador-a-la-mano.herokuapp.com/registro/", datosJSON)
        .then(respuesta  => {
          alert(respuesta.data.mensaje);
        })
        .catch ( error  => {
          alert ( " error en el servidor " );
        });
    },
     postPto: function(){
       this.voyA= false
       
     },
     postRegistro: function(){
       this.voyA= true
       
     },
     RegistrarPto: function(){
            this.username = this.$route.params.username
            var datosJSON = {
            idPto : this.idPto,
            id_usuario: this.username,
            valor:this.valor,
            etiqueta:this.etiqueta,
            };
      axios
        .post("http://127.0.0.1:8000/registro/pto", datosJSON)
        .then(respuesta  => {
          alert(respuesta.data.mensaje);
          
        })
        .catch ( error  => {
          alert ( " error en el servidor " );
          this.nota="si se conectaría si existiera el enlace"
        });
    },
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
