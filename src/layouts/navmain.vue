<template>
	<div id="app">

	    <b-navbar>

	        <template slot="brand">
	            <b-navbar-item tag="router-link" :to="{ path: '/' }">
	                <img
	                    src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Cantv_logo.PNG"
	                    alt="Sistema de Cantv para llevar contabilidad de Presupuestos y demas hecho por Robwert Mota"
	                >
	            </b-navbar-item>

	        </template>

	        <template slot="start">

	            <b-navbar-item tag="router-link" :to="{ path: '/' }">
	            	<b-icon icon="home" style="margin-right: 5px;"></b-icon>
	                
	            	Inicio
	            </b-navbar-item>
	            <b-navbar-item v-if="loggedIn" icon="earth" tag="router-link" :to="{ path: '/controles' }">
	            	<b-icon icon="table" style="margin-right: 5px;"></b-icon>
	                Controles
	            </b-navbar-item>
	            
				<b-navbar-item tag="router-link" v-if="loggedIn" :to="{ path: '/config' }">
	                <b-icon icon="engine" style="margin-right: 5px;"></b-icon>
	               
	                Configuracion
	            </b-navbar-item>

	            <b-navbar-item tag="router-link" :to="{ path: '/about' }">
	                <b-icon icon="check" style="margin-right: 5px;"></b-icon>
	               
	                Acerca
	            </b-navbar-item>

	        </template>

	        <template slot="end">
	            <b-navbar-item tag="div">
	                <div class="buttons">
	                    <a v-if="!loggedIn" style="color: white;" class="button is-link">
	                        <router-link style="color: white;" to="/login">

	               		Iniciar Sesion</router-link>
	                    </a>
	                    <a v-if="!loggedIn" style="color: white;" class="button is-success">
	                        <router-link style="color: white;" to="/register">Registrarse</router-link>
	                    </a>
						<a v-if="loggedIn" class="button is-light">

							<router-link to="/logout"><b-icon icon="door" style="margin-right: 5px;"></b-icon>
	               Salir</router-link>
						</a>    
					</div>
				</b-navbar-item>
			</template>
		</b-navbar>

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