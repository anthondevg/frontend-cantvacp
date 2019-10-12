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
								>
							</b-input>
						</b-field>
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
				DOLAR: ''
			}
		},
		methods: {

			setConfig(){
				console.log('set config');

				axios.post('/config/set',{
		            id: this.$store.getters.user_id,
		            DRSE: this.DRSE,
		            DEPS: this.DEPS,
		            DOLAR: this.DOLAR
		          })
		          .then(res=>{


				    this.$store.dispatch('getConfig')
				    	.then(config=>{
				          	this.DRSE = config.DRSE;	
				          	this.DEPS = config.DEPS;	
				          	this.DOLAR = config.DOLAR;	
				          })
				          .catch(error=>{
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
			/*axios.post('/config/get',{
		            id: this.$store.getters.user_id,
		          })
		          .then(res=>{
		          	this.DRSE = res.data.DRSE;	
		          	this.DEPS = res.data.DEPS;	
		          	this.DOLAR = res.data.DOLAR;	
		            console.log(res);
		          })
		          .catch(error=>{
		            console.log(error)
		          })*/

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