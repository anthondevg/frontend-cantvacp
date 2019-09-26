<template>
	<div id="app">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		  <a class="navbar-brand" href="#">CANTVACP</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li class="nav-item active">
		        <router-link class="nav-link" to="/">Inicio</router-link>
		      </li>

		      <li class="nav-item">
		        <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
		      </li>

		      <li class="nav-item">
		        	<router-link class="nav-link" to="/about">Acerca de</router-link>
		      </li>

		      <li v-if="!loggedIn" class="nav-item">
		        	<router-link class="nav-link" to="/login">Iniciar Sesion</router-link>
		      </li>

		      <li v-if="!loggedIn" class="nav-item">
		        	<router-link class="nav-link" to="/register">Registrarse</router-link>
		      </li>

		      <li v-if="loggedIn" class="nav-item">
		        	<router-link class="nav-link" to="/logout">Salir</router-link>
		      </li>
		    </ul>
		    
		    </div>
		</nav>

		<div>
			<vue-page-transition name="fade-in-right">
			  <router-view/>
			</vue-page-transition>	
		</div>

	</div>
</template>

<script>
	
	export default {

		computed: {
			loggedIn(){
				return this.$store.getters.loggedIn
			}
		}
	}
</script>

<style>
	
	html,body{
		overflow-x: hidden;
	}
</style>