<template>
<div id=general>
  <h2> Hola Pedro 
  ¿Qué quieres hacer? {{nota}}</h2>
  <nav>
  <button v-on:click="postRegistro" > Agregar Registro </button>
  <button v-on:click="postPto" > Agregar un presupuesto </button>
  </nav>
    <div id="AgregarRegistro" v-if = "voyA">
      <h2>Agregar Registro</h2>
      <label for="id">Id</label>
      <input v-model="id" id="id" /> <br>
      <label for="tipo">Tipo de Registro</label>
      <select v-model= "tipo">
        <option>egreso</option>
        <option>ingreso</option>
     </select><br>
      <label for="valor">Valor($)</label>
      <input v-model="valor" id="valor" /><br>
      <label for="fecha">Fecha</label>
      <input v-model="fecha" id="fecha" type="date"/><br>
      <label for="etiqueta">Etiqueta</label>
      <select v-model= "etiqueta">
        <option>Casa</option>
        <option>Comida</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
        <option>Salario</option>
      </select><br>
      <label for="nota">Nota</label>
      <input v-model="nota" id="nota" /><br>
      <nav>
       <button v-on:click="Registrar" > Ingresar Registro </button>
      </nav>

  </div>
   <div id="AgregarPto" v-else >
    <h2>Agregar Presupuesto</h2>
    <label for="idP">Id</label>
    <input v-model="idPto" id="idpto" /><br>
    <label for="etiqueta">Etiqueta</label>
    <select v-model= "etiqueta">
        <option>Casa</option>
        <option>Comida</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
      </select><br>
    <label for="valor">Valor($)</label>
    <input v-model="valor" id="valor" /><br>
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
#general{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: Top;
  align-items: center;
}

#AgregarRegistro{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
}

#AgregarPto{
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

#general nav {
  height: 10%;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

#general nav button{
  color: #E5E7E9;
  background: #8486F5;
  border: 1px solid #45F5DA;
  border-radius: 10px;
  padding: 3px 50px;
  font-size: 11px;
}

#general nav button:hover{
  color: #8486F5;
  background: #E5E7E9;
  border: 1px solid #E5E7E9;
}
</style>
