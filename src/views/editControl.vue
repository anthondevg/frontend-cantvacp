<template>
	<div class="container form-container">

		<div class="desc-card">
			<h1 class="desc-title">Editar Control</h1>      
		</div>
		
		<div class="card" style="padding: 20px;">
			<b-field label="Nombre"  label-position="on-border" expanded>
            <b-input 
            	style="width: 50%;"
            	placeholder="nombre"
            	type="text" 
            	icon="pencil" 
            	v-model="name" 
            	>		
           	</b-input>
        </b-field>

        <b-input 
            	style="width: 30%;"
            	type="color"  
            	v-model="color" 
            	>		
        </b-input>
        
		<hr>
		       
		<div class="edit--canvas">
			<div class="grid-container" >
				<b-button class="grid-item edited-box" v-bind:style="{backgroundColor: color}">

	            <h1 style="font-size: 2rem;">{{name}}</h1> 
	          </b-button>
	      	</div>
		</div>
		</div>
		<hr>
		

		<div class="card" style="padding: 10px; display: flex; flex-direction: row-reverse;">

			<b-button icon-left="earth" @click="saveControl" type="is-link is-medium">Guardar</b-button>
		</div>


		<div class="danger-zone">
			<b-icon 
				icon="alert-outline" 
				type="is-danger" 
				size="is-large">
				</b-icon>
				<h1>Zona de Precaución</h1>
			<p>
				Si presionas se borrara El control y todos sus presupuestos asociados
			</p>
			<b-button icon-left="earth" @click="deleteControl" type="is-danger is-medium">Eliminar Control</b-button>
		
		</div>
	</div>

</template>

<script>
	export default {
		name: 'editControl',
		data(){
			return {
				id: this.$route.params.id,
				name: '',
				color: '#3a5adc'
			}
		},
		methods: {
			saveControl(){
				this.$http.post('/control/update',{
					id: this.id,
					name: this.name,
					color: this.color
				})
				.then(res=>{
					 this.$buefy.toast.open({
		                    message: 'Control Guardado!',
		                    type: 'is-success'
		                });
					 console.log(res);
				});
			},
			deleteControl(){
				
				this.$http.post('/control/delete',{
					id: this.id
				})
				.then(res=>{
					this.$buefy.toast.open({
		                    message: 'Control Eliminado!',
		                    type: 'is-danger'
		                });

					this.$router.push({name: 'controlPanel'})
				})
			
			}
		},
		created: function(){
			this.$http.get(`/control/id/${this.$route.params.id}`)
				.then(res=>{
					console.log(res.data[0].name)
					this.name = res.data[0].name;
					this.color = res.data[0].color;
				})
		}
	}
</script>

<style>

	.edit--canvas{
		margin: 0 auto;
		width: 100%;
		background-color: #DFDBE5;
		background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		border-radius: 5px;
	}
    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto;
    }

	.edited-box{
		border-radius: 10px;
		color: white;
		min-width: 50%;
		min-height: 200px;
		margin: 10px;
		transition: all ease .4s;
	}
	  
	.edited-box:hover{
		color: whitesmoke;
		box-shadow: 0px 1px 10px grey;
	}

	.danger-zone{
		margin-top: 15px;
		border-radius: 5px;
		border: 2px solid red;
		padding: 20px;
		margin-bottom: 15px;
	}
  
</style>