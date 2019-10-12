<template>
	<div v-if="budget.type == this.$attrs.type || type == 'ALL'">
		<b-button 
			style="margin-bottom: 5px;"
			@click="toggle"
			type="is-default"
            icon-right="eye" />
		<div v-show="isActive" class="card card-details">
			
			<div class="fancy-card card" style="color: grey;">
				
				<h3 class="div-actions-title">
					Detalles
				</h3>
				<div class="detail">
					<label>Numero de Orden: </label>{{budget.nroOrder}}
				</div>
				<div class="detail">
					<label>Numero de Factura: </label>{{budget.nroInvoice}}
				</div>
				<div class="detail">
					<!-- agregar badget bonito completado, pendiente, cancelado-->
					<label>Estado: </label>{{budget.status}}
				</div>
				<div class="detail">
					<label>Tipo: </label>{{budget.type}}
				</div>
				
				
		    	<div class="detail">
					<label>Descuento RSE: </label>{{ parseInt(budget.DRSE) | formattedNumber}}
				</div>

				<div class="detail">
					<label>Descuento EPS: </label>{{ parseInt(budget.DEPS) | formattedNumber}}
				</div>
		 
		    	
			</div>

			<div class="fancy-card card">

				<h3 class="div-actions-title">
					Gastos
				</h3>

				<form action="POST" @submit.prevent="addExpense">

					<div class="columns">
						<div class="column">	
				            <b-input 
				            	placeholder="Descripcion del Gasto"
				            	type="text" 
				            	icon="pencil" 
				            	v-model="description" 
				            	name="description">		
				           	</b-input>
					     
						</div>
						<div class="column">	
					        
				            <b-input 
				            	placeholder="Monto Total p.Ej: 120.000Bs.S"
				            	type="number" 
				            	icon="earth" 
				            	v-model="amount" 
				            	name="amount">		
				           	</b-input>
					        
						</div>
						<div class="column">
							<b-button native-type="submit" type="is-defaul" icon-right="plus"></b-button>
						</div>
					</div>
					
				</form>

				<div>
					<table class="table is-striped is-hoverable" style="width: 100%; margin-top: 6px;">
		  
		  				<thead>
			    			<th scope="col">Descripcion</th>
			    			<th scope="col">Monto</th>
			    			<th scope="col">Acciones</th>
			      
		    			</thead>

		    			<tbody v-for="expense in sExpenses">
		    				<tr>
		    					<td>{{expense.description}}</td>
		    					<td>
		    						{{parseInt(expense.amount) | formattedNumber }}
		    					</td>

		    					<td>
		    						<b-button type="is-danger" icon-right="delete" v-on:click="deleteExpense(expense.id)" />
		    					</td>
		    				</tr>
		    			</tbody>
		    		</table>

				</div>
				
				<h3 class="div-actions-title">
					Monto Total {{ parseInt(budgetIncome) | formattedNumber}}
				</h3>

				<h3 class="div-actions-title" style="color: rgb(240,10,44);">
					Gasto Total : {{ parseInt(totalExpense) | formattedNumber}}
				</h3>

				<hr>
		
				<h3 class="div-actions-title">
					Ganancia Total : {{ parseInt(totalIncome) | formattedNumber }}
				</h3>

				<h3 class="div-actions-title">
					$ {{ parseInt(totalInDollars) }} USD (DolarToday)
				</h3>

				<h3 class="div-actions-title">
					$ {{ parseInt(totalInDollarsAirTM) }} USD (AirTM)
				</h3>

			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'toggle-details-item',
		props: ['budget','expenses','budgetIncome'],
		data(){
			return {
				type: 'ALL',
				isActive: false,

				// data for creating of expenses
				budget_Id: this.$props.budget.id,
				control_Id: this.$store.getters.current_control_id,
				user_Id: this.$store.getters.user_id,
				description: '',
				amount: '',
				sExpenses: this.$props.expenses
			}
		},
		methods: {
			toggle(){
				this.isActive = !this.isActive;
			},
			addExpense(){

				axios.post('/expense',{
					user_Id: this.user_Id,
					budget_Id: this.budget_Id,
					control_Id: this.control_Id,
		            description: this.description,
		            amount: parseInt(this.amount)
		          })
		          .then(res=>{
		          	this.sExpenses.push({
		          		id: res.data.id,
			        	user_Id: res.data.user_Id,
						budget_Id: res.data.budget_id,
						control_Id: res.data.control_id,
			            description: res.data.description,
			            amount: parseInt(res.data.amount)

			       	})
		          	
					this.$store.dispatch('fetchExpenses',{
						control_id: this.$store.getters.current_control_id
					})
					.then(res=>{
						console.log(res);
					});

		            this.description = '';
					this.amount = '';
		            console.log(res);
		          })
		          .catch(error=>{
		           	console.log(error);
		          })
			},
			deleteExpense(id){
				axios.post('/expense/delete',{
					id: id,
		          })
		          .then(res=>{
		          	let newExpenses = this.sExpenses.filter(expense => expense.id != id);

						this.sExpenses = newExpenses;
						console.log(res)
		            console.log(res);
		          })
		          .catch(error=>{
		           	console.log(error);
		          })
			}
		},
		computed:{
			totalExpense(){
				let total = 0;
				this.sExpenses.forEach(expenses=>{
					total += parseInt(expenses.amount);
				});

				this.total += total;
				return parseInt(total);
			},
			totalIncome(){
				return parseInt(this.budgetIncome) - parseInt(this.totalExpense);
			},
			totalInDollars(){
				return this.totalIncome / 20000;
			},
			totalInDollarsAirTM(){
				return this.totalIncome / 21400;
			},
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
		created: function(){
			this.$eventHub.$on('toggle', this.toggle);
		},
		beforeDestroy() {
		    this.$eventHub.$off('togle');
		}
	}
</script>

<style>
	
	.card-details{
		border-radius: 5px;
		padding: 10px;
	}
	.fancy-card{
		background: linear-gradient(bottom,rgb(254,254,254),rgb(255,255,255));
		padding: 10px;
		border-radius: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
		transition: all .2s ease-in;
		color: grey;
	}

	.dark-card{
		background: linear-gradient(left,rgb(80,25,80),rgb(55,55,155));
	}
	.fancy-card:hover{
	}

	.div-actions-title{
		font-size: 1.3em;
	}
	.detail{
		display: block;
	}
	.expense-li{
		margin: 2px;
		padding: 2px;
		border-bottom: 2px dotted white;
	}
</style>