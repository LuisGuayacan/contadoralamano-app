<template>
  <div id="general">
  <div id="encabezado">
    <h2>Hola PEDRO</h2>
    <h2>Tu presupuesto de
      <select v-model= "etiqueta">
        <option>casa</option>
        <option>comida</option>
        <option>transporte</option>
        <option>entretenimiento</option>
      </select>
       es de: </h2>
       <button v-on:click="Ver" > Ver la información </button>
  </div>

  <div id="información" v-if= "existe">
    <h3><span>{{valorPto}} COP</span>, has gastado <span>{{egresos}} cop </span>, te queda <span> {{cupo}} cop </span></h3>
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
          mes: 12
        }
      },
      methods:{
        Ver: function(){
        this.username = this.$route.params.username
        this.existe= true
        let self = this
        axios.get("http://127.0.0.1:8000/presupuesto/balance/" + this.username + "?etiqueta=" + this.etiqueta + "&mes=" + this.mes)
        .then((result) => {
          self.valorPto = result.data.presupuesto[0].valor
          self.data = result.data.registros
          self.egresos=result.data.gastos_totales
          self.cupo=result.data.estado
        })
        .catch((error) => {
          this.nada=true
          alert("ERROR Servidor");
        });
        }
      },
    created: function(){
           alert("Selecciona una etiqueta");
    }
  }
</script>

<style>
#general{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#general h2{
  font-size: 30px;
  color: #283747;
}
#general span{
  color: #f59f7d;
  font-weight: bold;
}
#información{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
}
#información span{
  color: #984cf5;
  font-weight: bold;
}

table {
  table-layout: fixed;
  width: 60%;
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
