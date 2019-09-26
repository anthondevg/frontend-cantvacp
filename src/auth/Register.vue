<template>
	<div class="container">
		<div class="row ">

			<div class="col-md-12 d-flex justify-content-center align-items-center flex-column">	

				<h1>Registro</h1>	
				<div class="jumbotron" style="width: 500px">

					<form method="#" @submit.prevent='register'>
					  
					  <div class="form-group">
					  	
					  	<label for="exampleInputEmail1">Nombre</label>

					    <input type="text" class="form-control" v-model="username"  placeholder="maria">
					    
					    <label for="exampleInputEmail1">Correo Electronico</label>

					    <input type="email" class="form-control" v-model="email" placeholder="cantv@email.com">
					  
					  </div>

					  <div class="form-group">

					    <label for="exampleInputPassword1">Contraseña</label>
					    
					    <input type="password" class="form-control" v-model="password" placeholder="**********">
					  
					  </div>

					  <button type="submit" class="btn btn-primary">Registrarse</button>
					
					</form>
				</div>
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