<template>
	
	<div class="container">
		<h1 c><b-icon icon="table" style="margin-right: 5px;"></b-icon>Control | {{this.$route.params.id}}</h1>
              
  		<hr>
		
		<TotalIncome 
			v-bind:totalIncome="totalIncome"
			v-bind:totalInDollars="totalInDollars"
			v-bind:totalInDollarsAirTM="totalInDollarsAirTM"
		/>

  		<div class="card add-div">
            
            <b-button 
                  tag="router-link"
                  :to="{ name: 'newBudget'}" 
                  type="is-primary"
                  icon-right="ghost">
                Añadir Presupuesto
            </b-button>

            <b-button 
                  tag="router-link"
                  :to="{ name: 'addExpense'}" 
                  type="is-danger"
                  icon-right="plus">
                Añadir Gasto
            </b-button>
        </div>

        <h1 style="font-size: 2.4rem; font-family: Roboto;">Presupuestos</h1>
	
		<div class="columns">
			<div class="column">
				
				<b-field label="Filtrar por">
		            <b-select 
		            	
		            	size="is-medium" 
		            	expanded 
		            	placeholder="CANTV"
		            	v-model="type" 
		            	icon="earth">
		            	<option value="ALL">Todo</option>
		            	<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
		            </b-select>
		        </b-field>
			
			</div>
			
			<div class="column">
				<template>
				    <b-field label="Filtrar por Fecha">
				        <b-datepicker
				        	@input="fetchBudgetsFromTo"
				         	size="is-medium" 
				            placeholder="Click to select..."
				            v-model="dates"
				            icon="calendar-today"
				            range>
				        </b-datepicker>
				    </b-field>
				</template>
			</div>	
	</div>
		
		
		<div class="loading-card">
			<orbit-spinner
				v-if="loading"
			  :animation-duration="1200"
			  :size="55"
			  color="#86E88A"
			/>
		</div>

		<div v-if="budgets.length == 0 && !loading">
			<EmptyControlMsg 
				msg="No tienes presupuestos aún. Agrega algunos."
			/>
		</div>

		<table v-if="budgets.length > 0 && !loading" style="width: 100%;" class="card table mb-3 center is-striped">
		  
		  <thead>
		    <tr>
				
		      <th scope="col">Nro Pedido</th>
		      <th scope="col">Nro Factura</th>
		      <th scope="col">Monto</th>
		      <th scope="col">Descripcion</th>
		     
		      <th scope="col">DRSE</th>

		      <th scope="col">Fecha</th>
		      <th scope="col">DEPS</th>
		      <th scope="col">Ganancia</th>
		      <th scope="col">Acciones</th>

		    </tr>
		  </thead>
		  <tbody>
		  	
		    <tr class="budget-el" v-bind:style="{ borderLeft: borderLeft[budget.status] }" v-bind:value="budget.id" v-for="budget in budgets" v-if="budget.type == type || type == 'ALL'">
				
		    	<td>{{ budget.nroOrder }}</td>
		    	<td>{{ budget.nroInvoice }}</td>
		    	<td>{{ parseInt(budget.totalAmount) | formattedNumber }}</td>
		    	<td>{{ budget.description}}</td>
		    
		    	
		    	<td>{{ parseInt(budget.DRSE) | formattedNumber}}</td>
		    	
		    	<td>{{ budget.date}}</td>
		    	<td>{{ parseInt(budget.DEPS) | formattedNumber}}</td>
		    	<td>{{ parseInt(budget.totalIncome) | formattedNumber}}</td>
		    	<td>
		    		<b-button 
		    			tag="router-link"
		    			:to="{ name: 'presupuesto', params: {id: budget.id}}" 
		    			type="is-link"
                		icon-right="pencil" />

		    		<b-button type="is-danger" icon-right="delete" v-on:click="deleteBudget(budget.id)" />
		    	</td>		    	
		    </tr>
		  </tbody>
		</table>

		<Pagination v-bind:total="total"/>
		
		<div class="expenses">
			<h1 style="font-size: 2.4rem; font-family: Roboto;">Gastos</h1>
			<hr>
			<!-- convertir a componente ! -->
			<table v-if="expenses.length > 0 && !loading" style="width: 100%;" class="card table mb-3 center is-striped">
			  
			  <thead>
			    <tr>
			      <th scope="col">Descripcion</th>
			      <th scope="col">Monto</th>
			      <th scope="col">Acciones</th>
			    </tr>
			  </thead>
		  		<tbody>
					
					 <tr class="budget-el" v-bind:value="expense.id" v-for="expense in expenses">
						
				    	<td>{{ expense.description }}</td>
				    	<td>{{ expense.amount }}</td>
				    	
				    	<td>
				    		<b-button 
				    			tag="router-link"
				    			:to="{ name: 'gasto', params: {id: expense.id}}"
				    			type="is-link"
		                		icon-right="pencil" />

				    		<b-button type="is-danger" icon-right="delete" v-on:click="deleteExpense(expense.id)" />
				    	</td>		    	
				    </tr>
		  		</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { AtomSpinner } from 'epic-spinners'
	import { HalfCircleSpinner } from 'epic-spinners'
	import { OrbitSpinner } from 'epic-spinners'
	import TotalIncome from './TotalIncome.vue';
	import EmptyControlMsg from './emptyControlMsg.vue';
	import Pagination from './Pagination.vue';

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
 	
	export default {
		name: 'control',
		data(){
			return {
				control_id: this.$route.params.id,
				type: 'ALL',
				types: [],
				from: '',
				to: '',
				lastPage: '',
				dates: [],
				// state for pagination
                loading: true,
                total: '',
                // color of budgets status
                borderLeft: [
                	'3px solid orange',
                	'3px solid green',
                	'3px solid red'
                ]
			}
		},
		components: {
			AtomSpinner,
			HalfCircleSpinner,
			OrbitSpinner,
			TotalIncome,
			EmptyControlMsg,
			Pagination
		},
		computed: {
			totalIncome(){
				let total = 0;
				this.globalBudgets.forEach(budget=>{
					total += parseInt(budget.totalIncome);
				});

				this.$store.state.globalTotal += total;
				return parseInt(total);
			},
			totalInDollars(){
				return this.totalIncome / 20000;
			},
			totalInDollarsAirTM(){
				return this.totalIncome / 21400;
			},
			budgets(){
				return this.$store.getters.budgets;
			},
			expenses(){
				return this.$store.getters.expenses;
			},
			globalBudgets(){
				return this.$store.getters.globalBudgets;
			}
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
		methods: {
			deleteBudget(id){

				if(window.confirm('Estas seguro?')){
					axios.post('/budget/delete',{
						id: id
					})
					.then(res=>{

						let state = this.$store.state.budgets.filter(budget => budget.id != id)

						this.$store.state.budgets = state;
						console.log(res)
					})
					.catch(err=>{
						console.log(err)
					})
				}
			},
			fetchBudgetsFromTo(){
				console.log('get budgets')
				
				let from = this.dates[0].getFullYear() + "-" + (this.dates[0].getMonth() + 1) + "-" + this.dates[0].getDate();

				let to = this.dates[1].getFullYear() + "-" + (this.dates[1].getMonth() + 1) + "-" + this.dates[1].getDate();

				this.from = from;
				this.to = to;
				
				this.$store.dispatch('fetchBudgetsFromTo',{
					from: this.from,
					to: this.to
				});
			}
		},
		created: function(){

			axios.get(`/type/id/${this.$store.getters.user_id}`)
			  .then(res=> {
			    // handle succes
			    this.types = res.data;
			    console.log('SUCCESS',res.data);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  });

			this.$store.dispatch('setCurrentControl',{
				control_id: this.$route.params.id
			});
			
			this.$store.dispatch('fetchExpenses',{
				control_id: this.$store.getters.current_control_id
			})
			.then(res=>{
				console.log(res);
			});

			this.$store.dispatch('fetchBudgets',{
				control_id: this.$store.getters.current_control_id,
				currentPage: this.current
			})
			.then(res=>{
				console.log(res);
				this.loading = false;
				this.total = res.total;
			});

			this.$store.dispatch('fetchGlobalBudgets',{
				control_id: this.$store.getters.current_control_id
			});
		}
	}
</script>

<style>
	
	.loading-card{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.budget-el{
		border-left: '2px solid green';
		transition: all ease .2s;
	}

	.budget-el:hover{
		background-color: rgb(233,233,233) !important;
		border-left: '4px solid green' !important;
	}
</style>