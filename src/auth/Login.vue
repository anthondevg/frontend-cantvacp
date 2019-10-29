<template>
	<div class="login--wrapper">
		<h1 style="font-size: 2.4rem; text-align: center;">Iniciar Sesión</h1>
				
			<div class="columns login--card">
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
				        
						<div class="alert-message">
							{{alertMessage}}
						</div>
					    
					    <br>
					    <hr>
					  <b-button outlined expanded :loading="loading" style="display: block;" native-type="submit" type="is-success is-medium" icon-right="earth">Iniciar Sesion</b-button>

					</form>

					
				</div>

				<div class="column">
					<ul>
						<li>CANTVACP te permite mantener un control presupuestario.</li>
					</ul>
					<router-link :to="{ path: '/register' }">¿No tienes cuenta?</router-link>
					<img src="" alt="">
				</div>
			</div>

			<div>
				<p style="margin: 5%; text-align: center;">
					Bienvenido! Recuerda no compartir tus credenciales con cualquiera.
				</p>
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
				alertMessage: '',
				loading: false
			}
		},
		methods: {
			login(){

				this.alertMessage = "";
				this.loading = true;
				this.$store.dispatch('retrieveToken',{
					username: this.username,
					password: this.password
				})
				.then(response=>{
					this.loading = false;
					this.$router.push({name: 'controlPanel'})
				})
				.catch(err=>{
					this.loading = false;
					this.alertMessage = "Tus credenciales son incorrectas."
				});
			}
		}
	}
</script>

<style>
	
	.login--wrapper{
		padding: 10px;
		background: rgb(89,144,122);
		color: white;
	}

	.login--card{
		margin: 2% 15%;
		padding: 20px;
		background: white;
		color: grey;
		box-shadow: 0px 2px 10px rgba(33,33,33,0.3);
		border-radius: 0px;

	}
	.alert-message{
		color: red;
	}

</style>