<template>
    <div id="RegistroTipo">
            <nav>
            <button v-on:click="getIngreso" v-if= "true" > Ingresos </button>
            <button v-on:click="getEgreso" v-if= "true" > Egresos </button>
            </nav>

            <h2> Hola (^.^) </h2>
            <h2>Aqui tienes tus registros de <span> {{registro_tipo}} </span></h2>
            <table>
                <tr>
                    <th>id</th>
                    <th>valor</th>
                    <th>fecha</th>
                    <th>etiqueta</th>
                    <th>nota</th>

                </tr>
                <tr v-for="registro in nota" v-bind:key="registro.id">
                    <td>{{registro.id}}</td>
                    <td>{{registro.valor}}</td>
                    <td>{{registro.fecha}}</td>
                    <td>{{registro.etiqueta}}</td>
                    <td>{{registro.nota}}</td>
                </tr>
            </table>

        </div>
</template>

<script>
    import axios from'axios';
    export default {
        name: 'RegistroTipo',
        data: function(){
            return {
                username:"",
                Balance:"",
                nota:"",
                registro_tipo:"",
                tipo:"",
                registro: [
                    {
                        id:"1",
                        //id_usuario:"6",
                        tipo:"",
                        valor: 2600,
                        fecha:"10-12-2020",
                        etiqueta:"comida",
                        nota:"pina"
                    }
                ]

        }
        },
        methods: {
            getIngreso: function(){
            this.username = this.$route.params.username
            this.registro_tipo="ingreso"
            let self = this
            axios.get("https://backend-contador-a-la-mano.herokuapp.com/registro/tipo/" + this.username + "?Tipo=" + this.registro_tipo) // + this.username
                .then((result) => {
                    this.nota = result.data.ingreso
                    //this.nota="Excelente!"
                })
                .catch((error) => {
                    alert("ERRORServidor");
                });
        },

            getEgreso: function(){
                this.username = this.$route.params.username
                this.registro_tipo="egreso"
                let self = this
                axios.get("https://backend-contador-a-la-mano.herokuapp.com/registro/tipo/" + this.username + "?Tipo=" + this.registro_tipo) // + this.username
                    .then((result) => {
                        this.nota = result.data.egreso
                        //this.nota="Ahi vamos"
                    })
                    .catch((error) => {
                        alert("ERRORServidor");
                    });
        },
        },



        created: function(){
            this.username = this.$route.params.username

            let self = this
            axios.get("https://backend-contador-a-la-mano.herokuapp.com/registro/tipo/" + this.username + "?Tipo=" + this.registro_tipo) // + this.username
                .then((result) => {
                    //self.Balance = result.data.Balance
                    this.nota="vamos bien"
                })
                .catch((error) => {
                    alert("ERRORServidor");
                });

        }
    }
</script>

<style>
#RegistroTipo{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
}
#RegistroTipo h2{
    font-size:30px;
    columns: #1d1d36;;
}

#RegistroTipo span{
    color: #f59f7d;
    font-weight:bold;
}

#RegistroTipo nav {
  height: 10%;
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}

#RegistroTipo nav button{
  color: #E5E7E9;
  background: #8486F5;
  border: 1px solid #45F5DA;
  border-radius: 5px;
  padding: 10px 20px;
}

#RegistroTipo nav button:hover{
  color: #8486F5;
  background: #E5E7E9;
  border: 1px solid #E5E7E9;
}

#RegistroTipo table{
    width: 80%;
    border: 1px solid #f5f24c;
}

#RegistroTipo th, td{
    width: 10%;
    text-align: center;
    vertical-align: center;
    border: 1px solid #f5f24c;
    padding: 0.3em;
}

#RegistroTipo th{
    background: #f59f7d;
}
</style>
