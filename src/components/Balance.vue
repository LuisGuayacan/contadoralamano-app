<template>
  <div id="UserBalance">
    <h2>PEDRO PEREZ</h2>
    <h2>Tu saldo es: <span> {{balance}} COP </span> </h2>
    <h3>Tus registros a la fecha son: </h3>
    <table>
    <tr>
        <th> Tipo de Registro </th>
        <th> Valor </th>
        <th> Fecha </th>
        <th> Etiqueta </th>
        <th> Nota </th>
    </tr>
    <tr v-for="registro in data" v-bind:key="registro.id">
                    <td>{{registro.tipo}}</td>
                    <td>${{registro.valor}}</td>
                    <td>{{registro.fecha}}</td>
                    <td>{{registro.etiqueta}}</td>
                    <td>{{registro.nota}}</td>
    </tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
      name: 'MiBalance',
      data: function (){
        return {
          data: [],
          balance: 0
        }
      },
    created: function(){
        this.username = this.$route.params.username

        let self = this
        axios.get("https://backend-contador-a-la-mano.herokuapp.com/registro/balance/" + this.username)
        .then((result) => {
          self.balance = result.data.balance
          self.data = result.data.data
        })
        .catch((error) => {
          alert("ERROR Servidor");
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
