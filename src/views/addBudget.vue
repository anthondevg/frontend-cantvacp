<template>
	<div class="container form-container mb-5">
		
		<div class="desc-card">
			<h1 class="desc-title">Nuevo Presupuesto</h1>
			<b-icon icon="earth" class="desc-icon"></b-icon>            
		</div>

			<template >
				<form method="POST" class="inner-form--wrapper" @submit.prevent="newBudget">
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
						            placeholder="Selecciona la fecha"
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

					<div class="columns">

						<div class="column">
							<b-field label="Monto Global"  label-position="on-border" expanded>
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

					<div style="display: flex; flex-direction: row-reverse;">
						<b-button native-type="submit" type="is-info" icon-right="ghost" class="save-button">
							Guardar
						</b-button>
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
			calculateData(){
				this.descRPS = this.totalAmount * (this.$store.getters.config_DRSE/100);
				this.descEPS = this.totalAmount * (this.$store.getters.config_DEPS/100);

				this.totalIncome = this.totalAmount - (this.descRPS + this.descEPS); 
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

<style>
	
	.form-container{
		background-color: white;
		box-shadow: 0px 1px 10px rgba(33,33,33,0.2);
		border-radius: 3px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.desc-card{
		background: linear-gradient(left, rgb(33,33,133), rgb(33,33,199));
	    color: white;
	    margin-bottom: 10px;
	    padding: 10px;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.desc-icon{
		background-color: white;
		font-size: 2rem;
		color: rgb(33,33,133);
		border-radius: 100px;
		padding: 20px;
	}
	.desc-title{
		font-size: 2em;
	}

	.inner-form--wrapper{
		padding: 20px;
	}
	.save-button{
		font-size: 1.4rem; width: 30%;
		background: linear-gradient(left, rgb(33,33,133), rgb(33,33,199));
	    
	}
</style>