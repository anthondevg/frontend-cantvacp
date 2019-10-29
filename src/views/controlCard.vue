<template>
	<div style="width: 100%;">
		<b-button
         	 v-bind:style="{backgroundColor: control.color}"
            tag="router-link"
            :to="{ name: 'control', params: {id: control.id}}" 
                class="grid-item control-box">
            
            <h1 style="font-size: 2rem;"> {{control.name}}</h1> 
            <div class="details">
              Presupuestos {{qtyBudgets}}
            </div>

          </b-button>
	</div>
</template>

<script>
	
	export default {
		name: 'controlCard',
		props: ['control'],
		data(){
			return {
				name: '',
				color: '',
        qtyBudgets: 0
			}
		},
    created: function(){
      this.$http.get(`/budget/sumb/${this.control.id}`)
        .then(res=>{
          this.qtyBudgets = res.data;
        })
    }
	}
</script>

<style>
	
  .control-box{
    border-radius: 10px;
    width: 95%;
    color: white;
    min-width: 33%;
    min-height: 200px;
    margin: 10px;
    transition: all ease .4s;
  }
  
  .control-box:hover{
    color: white;
    box-shadow: 0px 2px 10px rgba(33,33,33,0.5);
  }
  
</style>