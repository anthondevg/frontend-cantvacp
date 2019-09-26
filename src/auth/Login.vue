<template>
	<div class="container">
		<div class="row ">

			<div class="col-md-12 d-flex justify-content-center align-items-center flex-column">	

				<h1>CANTVACP</h1>	
				<div class="jumbotron" style="width: 500px">

					<form action="#" @submit.prevent="login">
					  <div class="form-group">
					    <label for="emailInput">Correo Electronico</label>
					    <input type="text" class="form-control" v-model="username" placeholder="cantv@email.com">

					    <small id="emailHelp" class="form-text text-muted">Recuerda no compartir tu información con nadie.</small>
					  </div>

					  <div class="form-group">
					  
					    <label for="exampleInputPassword1">Contraseña</label>
					  
					    <input type="password" class="form-control" v-model="password" placeholder="**************">
					  
					  </div>

					  <button type="submit" class="btn btn-primary">Iniciar Sesion</button>
					</form>
				</div>
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
					this.$router.push({name: 'dashboard'})
				})
			}
		}
	}
</script>