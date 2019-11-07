<template>
	<div class="container form-container" style="margin-bottom: 50px;">
		<div class="desc-card">
			<h1 class="desc-title">Agregar Tipo</h1>
			<b-icon icon="earth" class="desc-icon"></b-icon>  
		</div>

		<form method="POST" class="needs-validation inner-form--wrapper" @submit.prevent="newType">
		
			<div class="column">
		        <b-field label="Nombre" label-position="on-border" expanded>
		            <b-input 
		            	required
		            	placeholder="p.Ej: ACME"
		            	type="text" 
		            	native.type="text"
		            	icon="pencil" 
		            	name="name" 
		            	v-model="name">		
		           	</b-input>
		        </b-field>
			</div>

		  <b-button native-type="submit" type="is-success" icon-right="pencil" class="save-button">Guardar</b-button>
		</form>
	</div>
</template>

<script>
	
	export default {
		name: 'addType',
		data() {

			return {
				userId: this.$store.getters.user_id,
				code: this.makeid(10),
				name: ''
			}
		},
		methods: {
			newType(){
				console.log('new type')

				this.$store.dispatch('newType',{
					userId: this.userId,
					code: this.code,
					name: this.name
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}`})
				})
				.catch(err=>{
					console.log('error, ',err);
				})
			},
			makeid(length) {
			   var result           = '';
			   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			   var charactersLength = characters.length;
			   for ( var i = 0; i < length; i++ ) {
			      result += characters.charAt(Math.floor(Math.random() * charactersLength));
			   }
			   return result;
			}


		}
	}
</script>