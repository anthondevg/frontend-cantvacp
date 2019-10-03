<template>
	<div class="container">
		
			<h1 style="font-size: 2.4rem;">Ingresa tus datos para que comencemos...</h1>
			<hr>	
			<div class="columns">
				<div class="column">
						
					<form action="#" @submit.prevent="login">
					  
					     <b-field label="Correo Electronico" label-position="on-border">
				            <b-input 
				            	autofocus
				            	required
				            	placeholder="cantvUser1@mail.com"
				                v-model="username"
				                type="email"
				                icon="email">
				            </b-input>
				        </b-field>

						<br>
						 <b-field label="Contraseña" label-position="on-border">
				            <b-input 
				            	required
				            	type="password"
				                v-model="password"
				                icon="lock"
				                placeholder="***"
				                password-reveal>
				            </b-input>
				        </b-field>
				        
						
					    <small id="emailHelp" class="form-text text-muted">Recuerda no compartir tu información con nadie.</small>
					    <br>
					    <hr>
					  <b-button native-type="submit" type="is-success" icon-right="earth">Iniciar Sesion</b-button>

					</form>
				</div>

				<div class="column">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi porro quidem nihil eum, tempora consequatur quas dolorem blanditiis. Ab quaerat expedita eius magnam cumque incidunt esse, voluptates laborum accusantium maiores.
				</div>
			</div>
		
	</div>
</template>

<script>
	
	export default {

		name: 'Login',
		data() {
			return {
				username: '',
				password: '',
			}
		},
		methods: {
			login(){

				this.$store.dispatch('retrieveToken',{
					username: this.username,
					password: this.password
				})
				.then(response=>{
					this.$router.push({name: 'controlPanel'})
				})
			}
		}
	}
</script>