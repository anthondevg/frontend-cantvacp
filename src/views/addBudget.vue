<template>
	<div class="container mb-5">
		
		<h1 style="font-size: 2.4rem;">Crear nuevo Presupuesto</h1>
			<hr>
			<template>
				<form method="POST" @submit.prevent="newBudget">
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
									<option selected value="1">En proceso</option>
									<option value="2">Completado</option>
									<option value="3">Cancelado</option>
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
										<p>{{descRPS}} BsS</p>
									</div>
									
								</div>
								
								<div class="column">
									<div style="font-size: 2rem; text-align: center; color: rgb(222,222,111);">
										EPS
										<br>
										<p>{{descEPS}} BsS</p>
									</div>
									
								</div>
								
								<div class="column">
									<div style="font-size: 2rem; text-align: center; color: rgb(22,222,111);">
										Ganancia
										<br>
										<p>{{totalIncome}} Bs.S</p>
									</div>
									
								</div>
							
							</div>
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

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'newBudget',
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
				types: []
			}
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
		methods: {
			parseDate(){
				this.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
			},
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
			newBudget(){
				console.log('new budget in ')

				this.$store.dispatch('newBudget',{
					userId: this.userId,
					control_Id: this.control_Id,
					nroOrder: new Number(this.nroOrder),
					nroInvoice: new Number(this.nroInvoice),
					totalAmount: new Number(this.totalAmount),
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