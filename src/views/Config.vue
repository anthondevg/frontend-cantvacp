<template>
	<div class="container" style="margin-left: 10%; margin-right: 10%;">
		<div>
			
			<h1 style="font-size: 2em; margin-bottom: 10px;">Configuracion</h1>
			
			<div class="columns card">
				<div class="column">
					<form action="POST" @submit.prevent="setConfig">
						<b-field label="Descuento de Responsabilidad Empresa" expanded>
						    <b-slider v-model="DRSE" :tooltip-type="sliderType" :custom-formatter="DRSE => DRSE + '%'"></b-slider>
						</b-field>
					
						<b-field label="Descuento de Empresa Prestadora" expanded>
							<b-slider v-model="DEPS" :custom-formatter="DEPS => DEPS + '%'"></b-slider>
						</b-field>
						<b-field label="Precio del Dolar (offline)">
							<b-input
								type="decimal" 
								name="DOLAR" 
								v-model.number="DOLAR" 
								placeholder="$12.000.USD" 
								:disabled="DOLAR_OFFLINE == false"
								>
							</b-input>
							
						</b-field>
						<b-field>
					            <div class="control">
					                <b-switch 
								 v-model="DOLAR_OFFLINE">Usar valor del Dolar Offline</b-switch>
					            </div>
					        </b-field>

				<div>Valor del dolar: {{this.$store.getters.config_DOLAR}} BsS
				<span v-if="!DOLAR_OFFLINE"> | (DolarToday)</span>
				<span v-else>| (Offline)</span>
				</div>
						<b-button native-type="submit" type="is-link" icon-right="earth">Guardar</b-button>
					</form>
				</div>

			</div>
		</div>


	</div>
</template>

<script>
	import axios from 'axios'
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default{
		name: 'Config',
		data(){
			return {
				DRSE: 0,
				DEPS: 0,
				DOLAR: '',
				DOLAR_OFFLINE: this.$store.state.DOLAR_OFFLINE == 'true'
			}
		},
		methods: {
			
			setConfig(){
				console.log('set config');
				// setear configuracion en base de datos
				axios.post('/config/set',{
		            id: this.$store.getters.user_id,
		            DRSE: this.DRSE,
		            DEPS: this.DEPS,
		            DOLAR: this.DOLAR
		          })
		          .then(res=>{

		          	// usar valor del dolar offline o api en vuex
		          	 this.$store.dispatch('setDollar_Offline',{
				    	DOLAR_OFFLINE: this.DOLAR_OFFLINE
				    })
				    .then(res=>{
				    	console.log(res);
				    })

				    // ajustar nueva configuración en componente
				    this.$store.dispatch('getConfig')
				    	.then(config=>{
				          	this.DRSE = config.DRSE;	
				          	this.DEPS = config.DEPS;	
				          	this.DOLAR = config.DOLAR;	
				       			
				                this.$buefy.toast.open({
				                    message: 'Configuración Guardada!',
				                    type: 'is-link'
				                })
            
				          })
				          .catch(error=>{
				          	this.$buefy.toast.open({
				                    message: 'Algo salio mal. Intenta Nuevamente.',
				                    type: 'is-danger'
				                })
				            console.log(error)
				          })

		            console.log(res);
		          })
		          .catch(error=>{
		            console.log(error)
		          })
			}

		},
		computed:{
            sliderType(){
                if (this.DRSE > 25 && this.DRSE < 75){
                    return "is-warning";
                } else if (this.DRSE >= 75){
                    return "is-danger";
                }
                return "is-success";
            }
        },
		created: function(){
		
		    this.$store.dispatch('getConfig')
		    	.then(config=>{
		          	this.DRSE = config.DRSE;	
		          	this.DEPS = config.DEPS;	
		          	this.DOLAR = config.DOLAR;	
		          })
		          .catch(error=>{
		            console.log(error)
		          })
		}
	}
</script>