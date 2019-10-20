<template>
	<div class="container mb-5">
		
		<h1 style="font-size: 2.4rem;"><b-icon icon="pencil" style="margin-right: 5px;"></b-icon>Nuevo Anticipo</h1>
			<template>
				<form method="POST" @submit.prevent="newAdvance">
					<div class="columns">

						<div class="column">
							 <b-field label="Tipo"  label-position="on-border">
				            	<b-select 
				            	required
				            	expanded
				            	icon="earth" 
				            	name="type" 
				            	v-model="type">
				            
									<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
					
					            </b-select>
					        </b-field>
						</div>

						<div class="column">
					        <b-field label="Numero de Pedido"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="911"
					            	type="number" 
					            	native.type="number"
					            	icon="earth" 
					            	name="nroOrder" 
					            	v-model="nroOrder">		
					           	</b-input>
					        </b-field>
						</div>

						<div class="column">	
					        <b-field label="Numero de Factura"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="555"
					            	type="number" 
					            	native.type="number"
					            	icon="earth" 
					            	name="nroInvoice" 
					            	v-model="nroInvoice">		
					           	</b-input>
					        </b-field>
						</div>

						<div class="column">
					        <b-field label="Fecha"  label-position="on-border">
						        <b-datepicker
						        	v-model="date"
						        	@input="parseDate"
						            placeholder="Type or select a date..."
						            icon="calendar-today"
						            >
						        </b-datepicker>
						    </b-field>
						</div>
					</div>

					<div class="columns">
						<div class="column">	
					        <b-field label="Descripción"  label-position="on-border" expanded>
					            <b-input 
					            	placeholder="Anticipo 1"
					            	type="text" 
					            	icon="pencil" 
					            	v-model="description" 
					            	name="description">		
					           	</b-input>
					        </b-field>
						</div>
						<div class="column">	
					        <b-field label="Status" label-position="on-border">
					            <b-select icon="check" name="status" v-model="status">
									<option selected value="0">En proceso</option>
									<option value="1">Completado</option>
									<option value="2">Cancelado</option>
							      </b-select>
					        </b-field>
						</div>

					</div>

					<hr>
					<div class="columns">

						<div class="column">
							<b-field label="Monto"  label-position="on-border" expanded>
								<div class="control">
									
									<money 
										class="input"
										v-model="totalAmount" 
										@change="calculateData" 
						    			@input="calculateData" 
						    			placeholder="523.231 BS"
						    			v-bind="money">
						    				
						    			</money>
								</div>
								           	
					        </b-field>		
					  		
						</div>
					</div>

					<div class="block">
						<b-button native-type="submit" type="is-link" icon-right="earth">Agregar</b-button>
					</div>
				</form>
			</template>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import {Money} from 'v-money'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'newAdvance',
		data() {
			return {
				userId: this.$store.getters.user_id,
				nroOrder: '',
				nroInvoice: '',
				totalAmount: 0,
				description: '',
				date: [], 
				status: '1',
				control_Id: this.$store.getters.current_control_id,
				type: '',
				descRPS: 0,
				descEPS: 0,
				totalIncome: '',
				types: [],
				 money: {
		          decimal: ',',
		          thousands: '.',
		          prefix: '',
		          suffix: ' Bs.S',
		          precision: 2,
		          masked: false /* doesn't work with directive */
		        }
			}
		},
		components: {
			Money
		},
		created: function(){
			axios.get(`/type/id/${this.$store.getters.user_id}`)
			  .then(res=> {
			    // handle success
				this.type = res.data[0].code
			    this.types = res.data;
			    console.log(res.data);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })

		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
		methods: {
			parseDate(){
				this.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
			},
			newAdvance(){
				console.log('new advance in ')

				axios.post('/advance',{
					user_Id: this.userId,
					control_Id: this.control_Id,
					type: this.type,
					nroOrder: new Number(this.nroOrder),
					nroInvoice: new Number(this.nroInvoice),
					date: this.date,
					description: this.description,
					status: this.status,
					totalAmount: new Number(this.totalAmount),
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}`})
				})
			}

		}
	}
</script>
