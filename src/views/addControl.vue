<template>
	<div class="container mb-5">
		
		<h1 style="font-size: 2.4rem;">Crear Control</h1>
			<hr>
			<template>
				<form method="POST" @submit.prevent="newControl">
					<div class="columns">

						<div class="column">
					        <b-field label="Nombre del Control"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="Control Presupuestario"
					            	type="text" 
					            	icon="pencil" 
					             	v-model="name">		
					           	</b-input>
					        </b-field>
						</div>

						
					<div class="block">
						<b-button native-type="submit" type="is-link" icon-right="earth">Agregar</b-button>
					</div>
				</div>
				</form>
			</template>
		
	</div>
</template>

<script>
	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'addControl',
		data() {
			return {
				userId: this.$store.getters.user_id,
				name: ''
			}
		},
		created: function(){
			
		},
		methods: {
			newControl(){
				console.log('new control')

				this.$store.dispatch('newControl',{
					userId: this.userId,
					name: this.name
				})
				.then(response=>{
					this.$router.push({name: 'home'})
				})
			}

		}
	}
</script>