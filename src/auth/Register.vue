<template>
	
	<div class="register--wrapper">
		
			<h1 style="font-size: 2.4rem; text-align: center;">Registrarse</h1>
			
			<div class="columns register--card">
				<div class="column">
						
					<form action="#" @submit.prevent="register">
					  	<b-field label="Nombre de Usuario">
				            <b-input 
				            	autofocus
				            	required
				            	placeholder="JohDoe1"
				                v-model="username"
				                type="text"
				                icon="earth">
				            </b-input>
				        </b-field>
					     <b-field label="Correo Electronico">
				            <b-input 
				            	required
				            	placeholder="cantvUser1@mail.com"
				                v-model="email"
				                type="email"
				                icon="email">
				            </b-input>
				        </b-field>

						 <b-field label="Contraseña">
				            <b-input 
				            	required
				            	type="password"
				                v-model="password"
				                icon="lock"
				                placeholder="***"
				                password-reveal>
				            </b-input>
				        </b-field>
						
					    
					    <br>
					    <hr>
					  <b-button native-type="submit" type="is-medium is-link" icon-right="account">Registrarse</b-button>

					</form>
				</div>

				<div class="column">
					
					<router-link :to="{ path: '/login' }">Ya tienes cuenta? Inicia Sesión.</router-link>
				</div>
			</div>
			
	</div>
</template>

<script>
	export default {
		data(){
			return {
				username: '',
				email: '',
				password: ''
			}
		},
		methods: {
			register() {
				this.$store.dispatch('register',{
					username: this.username,
					email: this.email,
					password: this.password
				})
				.then(response=>{
					this.$router.push({name:'login'})
				})
			}
		}
	}

</script>

<style>
	.register--wrapper{
		padding: 10px;
		background: linear-gradient(top,rgb(4,155,225),rgb(89,144,192));
		color: white;
	}
	.register--card{
		margin: 2% 15%;
		padding: 20px;
		background: white;
		color: grey;
		box-shadow: 0px 2px 10px rgba(33,33,33,0.6);
		border-radius: 3px;
	}
	.alert-message{
		color: red;
	}
</style>