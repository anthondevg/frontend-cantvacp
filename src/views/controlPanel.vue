<template>
  <div class="container controlPanel">
  	<h1 style="font-size: 1.5rem;">Controles</h1>
    <transition name="slide">
    <b-button 
      v-if="!addingControl"
      type="is-link"
      @click="toggleInput"
      icon-right="plus">
      Nuevo Control
    </b-button>      
    </transition>
    <transition name="slide-fade">
      <div class="form-control" v-if="addingControl" >

        <h3 style="font-size: 1.2em;">¿Que nombre le ponemos?</h3>
        <div style="display: flex; justify-content: space-between; margin-top: 5px;">
            
          <form action="POST" @submit.prevent="addControl">
            
            <input 
              autofocus 
              class="add_Control_Input" 
              placeholder="ACME"
              type="text"  
              v-model="control_name" 
              name="control_name"/>   
            
            <b-button native-type="submit" type="is-link" icon-right="check">Listo</b-button>

          </form>
       
          <b-button type="is-danger" @click="cancelAdd" icon-right="cancel">Cancelar</b-button>
       
        </div>
        
      </div>  
    </transition>      
  	<hr>

    
        <div class="grid-container" >
          <b-button
          
            tag="router-link"
            v-for="control in controls"
            :to="{ name: 'control', params: {id: control.id}}" 
                class="grid-item control-box">
            
            <h1 style="font-size: 2rem;"> {{control.name}}</h1> 
          </b-button>
      </div>
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
        addingControl: false,
        userId: this.$store.getters.user_id,
        control_name: ''
      }
    },
    methods: {
      toggleInput(){
        this.addingControl = !this.addingControl
      },
      cancelAdd(){
         this.addingControl = false;
         this.control_name = '';
      },
      addControl(){
        this.$store.dispatch('newControl',{
          userId: this.userId,
          name: this.control_name
        })
        .then(response=>{
            this.addingControl = false;
            this.$buefy.toast.open({
                message: 'Control agregado!',
                type: 'is-link'
            });
            this.$store.dispatch('fetchControls');
        })
      },
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
    }
  }
</script>

<style>
  
    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto;
    }
    .grid-item {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 20px;
      text-align: center;
    }

  .controls-wrapper{
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .control-box{
    background: linear-gradient(left, rgb(33,33,133), rgb(33,33,199));
    border-radius: 10px;
    color: white;
    min-width: 33%;
    min-height: 200px;
    margin: 10px;
    transition: all ease .4s;
  }
  
  .control-box:hover{
    color: white;
    background: linear-gradient(right, rgb(33,33,255),rgb(33,33,133));
    transform: translateY(5px);
    box-shadow: 0px 2px 20px grey;
  }
  
  .add_Control_Input{
    border: none;
    font-size: 1.6em;
    border-bottom: 2px solid rgb(33,33,133);
    margin-right: 3px;
    transition: all ease .4s;
  }

  .add_Control_Input:active{
    outline: none;
     
  }
  .add_Control_Input:focus{
    outline: none;
    border-bottom: 2px solid rgb(33,33,255);
  }
  .add-div{
    padding: 5px;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
