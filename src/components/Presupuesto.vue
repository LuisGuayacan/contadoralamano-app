<template>
  <div>
  <div id="encabezado">
    <h2>Hola PEDRO</h2>
    <h2>Tu presupuesto de 
      <select v-model= "etiqueta">
        <option>Casa</option>
        <option>Comida</option>
        <option>Transporte</option>
        <option>Entretenimiento</option>
      </select>
       es de: </h2>
       <button v-on:click="Ver" > Ver la información </button>
  </div>

  <div id="información" v-if= "existe">
    <h3>{{valorPto}} COP, has gastado {{egresos}} cop, te queda {{cupo}} cop </h3>
    <h3> Aquí tienes tus registros relacionados: </h3>
    <table>
    <tr>
        <th> Id </th>
        <th> Nota </th>
        <th> Valor </th>
        <th> Fecha </th>
                
    </tr>
    <tr v-for="registro in data" v-bind:key="registro.id">
      <td>{{registro.id}}</td>                         
      <td>{{registro.nota}}</td>
      <td>${{registro.valor}}</td>              
      <td>{{registro.fecha}}</td>
    </tr>
    </table>
  </div>

  <div id="información" v-else>
    <h3>primero debes dar clic en <span>"Ver la información"</span>, </h3>
    
  </div>
  <div v-if= "nada">
    <h3> En este momento no tienes un presupuesto para <span> {{etiqueta}} . </span> </h3>
  </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
      name: 'Pto',
      data: function (){
        return {
          data: [],
          valorPto: 0,
          existe: false,
          egresos:0,
          cupo:0,
          etiqueta:"",
          nada: false,
        }
      },
      methods:{
        Ver: function(){
        this.username = this.$route.params.username
        this.existe= true
        let self = this
        axios.get("http://127.0.0.1:8000/registro/pto/" + this.username + "?categoria=" + this.etiqueta)
        .then((result) => {
          self.valorPto = result.data.valorPto
          self.data = result.data.data
          self.egresos=result.data.egresos
          self.cupo=result.data.cupo
        })
        .catch((error) => {
          this.nada=true
          alert("ERROR Servidor");
        });
        }    
      },
    created: function(){
        this.username = this.$route.params.username
        let self = this
        axios.get("http://127.0.0.1:8000/registro/pto/" + this.username + "?categoria=" + this.etiqueta)
        .then((result) => {
          self.balance = result.data.balance
          self.data = result.data.data
        })
        .catch((error) => {
          alert("Selecciona una etiqueta");
        });
    }
  }
</script>

<style>
#UserBalance{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#UserBalance h2{
  font-size: 30px;
  color: #283747;
}
#UserBalance span{
  color: #f59f7d;
  font-weight: bold;
}
table {
  table-layout: fixed;
  width: 70%;
  border: 1px solid #000;
}
th, td {
   width: 25%;
   text-align: center;
   vertical-align: top;
   border: 1px solid #000;
   border-collapse: collapse;
   padding: 0.3em;
   caption-side: bottom;
   font-family: 'Rock Salt', cursive;
}
caption {
  padding: 0.3em;
  color: #fff;
  background: #000;
}
th {
  background: #f59f7d;
}
</style>
