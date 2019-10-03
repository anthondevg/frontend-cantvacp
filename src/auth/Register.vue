<template>
	
	<div class="container">
		
			<h1 style="font-size: 2.4rem;">Se parte de CANTVACP! :)</h1>
			<hr>	
			<div class="columns">
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
					  <b-button native-type="submit" type="is-success" icon-right="earth">Registrarse</b-button>

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