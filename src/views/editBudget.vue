
<template>
	<div class="container">
		
		<h1 style="font-size: 2.4rem;">Editar Presupuesto</h1>

			<hr>
			<template>
				<form method="POST" @submit.prevent="updateBudget">
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
					            	placeholder="889911"
					            	type="number" 
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
					            	placeholder="APURE VENTA"
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
							<b-field label="Monto Global"  label-position="on-border" expanded>
					            <b-input 
					            	placeholder="523.231 BS"
					            	type="number" 
					            	icon="earth"
						    		name="totalAmount"
						    		@change="calculateData" 
						    		@input="calculateData"  
						    		@keyup.ctrl.32="multiplyByTwo" 
						    		@keyup.ctrl.88="addThousand" 
						    		@keyup.ctrl.77="addMillion"
						    		v-model="totalAmount" 
						    		required/>		
					        </b-field>
							<b-input
								type="number" 
								name="descRPS" 
								v-model="descRPS" 
								disabled 
								placeholder="0. BsS" required
							>	
							</b-input>
							<br>
							<b-input
								type="number" 
								name="descEPS" 
								v-model="descEPS" 
								disabled 
								placeholder="0. BsS" 
								required>
							</b-input>	
							<br>

							<b-input type="number" name="totalIncome" v-model="totalIncome" disabled placeholder="0. BsS" value="0" required/>
						
					  		
						</div>
						<div class="column">
							<div class="columns">
								
								
								<div class="column ">
									<div style="font-size: 2rem; text-align: center; color: rgb(33,22,111);">
										RPS
										<br>
										<p>{{parseInt(descRPS) | formattedNumber }}</p>
									</div>
									
								</div>
								
								<div class="column">
									<div style="font-size: 2rem; text-align: center; color: rgb(222,222,111);">
										EPS
										<br>
										<p>{{parseInt(descEPS) | formattedNumber}}</p>
									</div>
									
								</div>
								
								<div class="column">
									<div style="font-size: 2rem; text-align: center; color: rgb(22,222,111);">
										Ganancia
										<br>
										<p>{{parseInt(totalIncome) | formattedNumber}}</p>
									</div>
									
								</div>
							
							</div>
						</div>

					</div>

					<div class="block">
						<b-button native-type="submit" type="is-link" icon-right="save">Guardar</b-button>
					</div>
				</form>
			</template>
	</div>
</template>

<script>
	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'editBudget',
		data() {
			return {
				userId: '2',
				nroOrder: '',
				nroInvoice: '',
				totalAmount: 0,
				description: '',
				date: '',
				status: '1',
				type: '',
				descRPS: '',
				descEPS: '',
				totalIncome: '',
				types: [],
				id: ''
			}
		},
		created: function(){
			axios.post('/budget/getById',{
				id: this.$route.params.id
			})
			.then(res=>{

				let d = res.data;
				this.nroOrder = d.nroOrder;
				this.nroInvoice = d.nroInvoice;
				this.totalAmount = d.totalAmount;
				this.description = d.description;
				this.date = d.date;
				this.status = d.status;
				this.type = d.type;
				this.descRPS = d.DRSE;
				this.descEPS = d.DEPS;
				this.totalIncome = d.totalIncome;

				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})

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
			}
			,
			calculateData(){
				this.descRPS = this.totalAmount * 0.180;
				this.descEPS = this.totalAmount * 0.03;

				this.totalIncome = this.totalAmount - (this.descRPS + this.descEPS); 
			},
			addMillion(){
				console.log('ok')

				this.totalAmount += '000000'

				this.totalAmount = parseInt(this.totalAmount)

				this.calculateData()
			},
			addThousand(){

				console.log('ok')

				this.totalAmount += '000'

				this.totalAmount = parseInt(this.totalAmount)

				this.calculateData()	
			},
			multiplyByTwo(){
				console.log('ok')
				
				this.totalAmount *= 2;
				this.calculateData()	
			}, 
			updateBudget(){
				console.log('update budget')

				this.$store.dispatch('updateBudget',{
					id: this.$route.params.id,
					userId: this.userId,
					nroOrder: this.nroOrder,
					nroInvoice: this.nroInvoice,
					totalAmount: this.totalAmount,
					description: this.description,
					date: this.date,
					status: this.status,
					type: this.type,
					descRPS: this.descRPS,
					descEPS: this.descEPS,
					totalIncome: this.totalIncome
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}`})
				})
			}

		}
	}
</script>