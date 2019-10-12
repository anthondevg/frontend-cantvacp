<template>
	
	<div class="container">
		<h1><b-icon icon="table" style="margin-right: 5px;"></b-icon>Control | {{this.$route.params.id}}</h1>
              
  		<hr>
		
		<TotalIncome 

			v-bind:totalIncome="totalIncome"
			v-bind:totalExpense="totalExpense"
			v-bind:totalAfterExpense="totalAfterExpense"
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

        </div>

        <h1 style="font-size: 2.4rem;">Presupuestos</h1>
	
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

		<Pagination v-bind:total="total"/>
		<br>
		<table v-if="budgets.length > 0 && !loading" style="width: 100%;" class="card table mb-3 center is-responsive is-striped">
		  
		  <thead>
		    <tr>
				
		      <th scope="col">ID</th>
		      <th scope="col">Descripcion</th>
		     
		      <th scope="col">Monto</th>
		      

		      <th scope="col">Fecha</th>
		      <th scope="col">Ganancia</th>
		      <th scope="col">Acciones</th>

		    </tr>
		  </thead>
		  <tbody v-for="budget in budgets" v-if="budget.type == type || type == 'ALL'">
		  	
		    <tr class="budget-el" v-bind:style="{ borderLeft: borderLeft[budget.status] }" v-bind:value="budget.id" >
				
				<!--
		    	<td>{{ budget.nroOrder }}</td>
		    	<td>{{ budget.nroInvoice }}</td>-->
		    	<td>{{budget.id}}</td>
		    	<td>{{ budget.description}}</td>
		    	
		    	<td>{{ parseInt(budget.totalAmount) | formattedNumber }}</td>
		    	
		    	<td>{{ budget.date}}</td>
		    	<td>{{ parseInt(budget.totalIncome) | formattedNumber}}</td>
		    	<td>
		    		
		    		<b-button 
		    			tag="router-link"
		    			:to="{ name: 'presupuesto', params: {id: budget.id}}" 
		    			type="is-success"
                		icon-right="pencil" />
					
		    		<!--

		    			<b-button 
		                  tag="router-link"
		                  :to="{ name: 'addExpense'}" 
		                  type="is-warning"
		                  icon-right="plus">
					-->
		    			<b-button type="is-danger" icon-right="delete" v-on:click="deleteBudget(budget.id)" />
		    	</td>

		    	
		    </tr>

		    <tr style="width: 100%">
		    	
		    	<td colspan="6">
		    		<toggle-details-item
		    		:budgetIncome="budget.totalIncome"
		    		:type="type"
			    	:budget="budget" 
					:expenses="budget.budget_expenses"
			    	/>
		    	</td>
		    </tr>
		  </tbody>
		</table>
		Gastos
		<table v-if="expenses.length > 0 && !loading" style="width: 100%;" class="card table mb-3 center is-responsive is-striped">
		  
		  <thead>
		    <tr>
				
		      <th scope="col">ID</th>
		      <th scope="col">Descripcion</th>
		     
		      <th scope="col">Monto</th>

		    </tr>
		  </thead>
		  <tbody v-for="expense in expenses">
		  	
		    <tr class="budget-el" v-bind:value="expense.id" >
				
				
		    	<td>{{expense.id}}</td>
		    	<td>{{ expense.description}}</td>
		    	
		    	<td>{{ parseInt(expense.amount) | formattedNumber }}</td>
		    
		    		<b-button type="is-danger" icon-right="delete" v-on:click="test(expense.id)" />
		    	</td>

		    </tr>
		  </tbody>
		</table>

		<div>
			<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laudantium veniam consequuntur tempora odio provident corporis esse consectetur vitae quis saepe aut dolores ipsa, harum ex maxime temporibus. Amet, perspiciatis.</div>
			<div>Qui ipsam dolore maiores perferendis accusamus tempore rerum dicta assumenda quas, cum ipsum eum facere soluta mollitia blanditiis debitis labore iusto error sunt magnam laudantium quis quia corporis, obcaecati, optio.</div>
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
	import ToggleDetailsItem from './ToggleDetailsItem.vue';
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
			Pagination,
			ToggleDetailsItem
		},
		computed: {
			totalExpense(){
				let total = 0;
				this.expenses.forEach(expense=>{
					total += parseInt(expense.amount);
				});
				
				this.$store.state.totalExpense = total;
				return parseInt(total);
			},
			totalIncome(){
				let total = 0;
				this.globalBudgets.forEach(budget=>{
					total += parseInt(budget.totalIncome);
				});

				this.$store.state.globalTotal = parseInt(total);
				return parseInt(total);
			},
			totalAfterExpense(){

				let n = parseInt(this.totalIncome - this.totalExpense);
				this.$store.state.totalIncome = n;
				return n;
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
			toggle(){
				console.log('toggle in parent')
				this.$eventHub.$emit('toggle');
			},
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
			},
			showDetails(id){

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