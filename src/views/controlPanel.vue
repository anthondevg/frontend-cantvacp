<template>
  <div class="container controlPanel">
  	<h1 style="font-size: 1.5rem;">Controles</h1>
              
  	<hr>

  	<template>
    <div class="container">
      <div class="columns">
        <div class="column card">
          <h1 style="font-size: 2.4rem;"></h1>
          
          <div class="card add-div">
            
            <b-button 
                  tag="router-link"
                  :to="{ name: 'addControl'}" 
                  type="is-link"
                        icon-right="plus">
                Añadir Control
            </b-button>

            <b-button 
                  tag="router-link"
                  :to="{ name: 'addType'}" 
                  type="is-success"
                  icon-right="plus">
                Añadir Tipo
            </b-button>
          </div>
          <ul>
            <li v-for="control in controls" class="card control-card" >   
                <h1 style="font-size: 1.5rem;">{{control.id}} | {{control.name}}</h1>
                
                <div>
                  <b-button 
                  tag="router-link"
                  :to="{ name: 'control', params: {id: control.id}}" 
                  type="is-link"
                        icon-right="eye" />

                <b-button type="is-danger" icon-right="delete" v-on:click="deleteControl(control.id)" />
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    </template>
  </div>
</template>


</template>

<script>
  import axios from 'axios'

  // setting up the endpoint !!!!!!!
  axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

  export default {
    name: 'controlPanel',
    data(){
      return {
      }
    },
    methods: {
      deleteControl(id){

          if(window.confirm('Estas seguro?')){
            axios.post('/control/delete',{
              id: id
            })
            .then(res=>{
              let state = this.$store.state.controls.filter(control => control.id != id)
              this.$store.state.controls = state;
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
          }
        }
    },
    computed: {
      controls(){
          return this.$store.getters.controls
      }
    },
    created: function(){
        this.$store.dispatch('fetchControls')
    },
  }
</script>

<style>
  
  .control-card{
    width: 100%; 
    display: flex;
    justify-content: space-between;
    padding: 10px; 
    border-radius: 5px; 
    margin: 2px;
    margin-bottom: 5px;
    background-color: rgb(250,254,254);
    border: 2px solid rgb(45,105,100);
  }

  .control-card:hover{
    background-color: rgb(254,254,254); 
  }

  .add-div{
    padding: 5px;
  }
</style>
