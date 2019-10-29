<template>
	<div>
		<transition name="slide-fade">
			
			<div v-show="isActive" class="card card-details">
				
				<Details :budget="budget"/>
			   		
			<div class="fancy-card card">

				<h3 class="div-actions-title">
					Gastos
				</h3>

				
				<form action="POST" v-if="addingExpense" @submit.prevent="addExpense">

					<div class="columns">
						<div class="column">	
				            <b-input 
				            	placeholder="Descripcion del Gasto"
				            	type="text" 
				            	required
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
				            	required
				            	min="0"
				            	v-model="amount" 
				            	name="amount">		
				           	</b-input>
					        
						</div>
						<div class="column">
							<b-button native-type="submit" type="is-defaul" icon-right="plus"></b-button>
						</div>
					</div>
					
				</form>

				<b-button native-type="submit" v-else @click="toggleFormExpense" type="is-defaul" icon-right="plus">Nuevo gasto</b-button>

				<div>
					<transition name="fade">
						
						<table v-if="sExpenses.length > 0" class="table is-bordered is-striped is-hoverable" style="width: 100%; margin-top: 6px; margin-bottom: 6px; border-radius: 5px;">
		  
		  				<thead>
			    			<th scope="col">Descripcion</th>
			    			<th scope="col">Monto</th>
			    			<th scope="col">Acciones</th>
			      
		    			</thead>
						
		    			<tbody v-for="expense in sExpenses">
		    				<tr>
		    					<td>{{expense.description}}</td>
		    					<td>
		    						<span class="badge badge--smaller badge--danger">
    									{{parseInt(expense.amount) | formattedNumber }}
    								</span>
		    					</td>

		    					<td>
		    						<b-button type="is-default" icon-right="delete" v-on:click="deleteExpense(expense.id)">Borrar</b-button>
		    					</td>
		    				</tr>
		    				
		    			</tbody>

		    		</table>
					</transition>

					<div class="no-expenses-card" v-if="sExpenses == 0">
						<b-icon style="color: white;" icon="medal"></b-icon>
	                
	    				<h3 style="font-size: 2rem; color: white;">
	    				No tienes gastos!
	    				</h3>
		    		</div>
				</div>
				<ResumeDetails 
				:sExpenses="sExpenses"
				:budgetIncome="budgetIncome"
				/>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>

	import axios from 'axios'
	import Details from './Details.vue';
	import ResumeDetails from './ResumeDetails.vue';

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'toggle-details-item',
		props: ['budget','expenses','budgetIncome','isActive'],
		data(){
			return {
				type: 'ALL',
				budget_Id: this.$props.budget.id,
				control_Id: this.$store.getters.current_control_id,
				user_Id: this.$store.getters.user_id,
				description: '',
				amount: '',
				sExpenses: this.$props.expenses,
				addingExpense: false
			}
		},
		components: {
			Details,
			ResumeDetails
		},
		methods: {
			toggleFormExpense(){
				this.addingExpense = !this.addingExpense;
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
					this.addingExpense = false;
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
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	}
	}
</script>

<style>

	.no-expenses-card{
		padding: 10px;
		background: rgba(33,33,150,0.9);
	    margin: 10px 1px;
		min-height: 100px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		text-align: center;
	}
	/* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
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