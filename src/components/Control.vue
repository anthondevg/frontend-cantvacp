<template>
	
	<div class="container">
		<h1 style="font-size: 1.5rem;">Control | {{this.$route.params.id}}</h1>
              
  		<hr>
	
  		<div class="card add-div">
            
            <b-button 
                  tag="router-link"
                  :to="{ name: 'newBudget'}" 
                  type="is-primary"
                        icon-right="plus">
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

        <h1 style="font-size: 2.4rem;">Presupuestos</h1>
	
		<div class="columns">
			<div class="column">
				
				<b-field label="Filtrar por">
		            <b-select 
		            	
		            	size="is-medium" 
		            	expanded 
		            	placeholder="CANTV" 
		            	@change="onChange($event)" 
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

	
		<table style="width: 100%;" class="card table mb-3 center is-striped">

		  <thead>
		    <tr>
		      
		      <th scope="col">Nro Pedido</th>
		      <th scope="col">Nro Factura</th>
		      <th scope="col">Monto</th>
		      <th scope="col">Descripcion</th>
		      <th scope="col">Status</th>
		      <th scope="col">Control</th>
		      
		      <th scope="col">DRSE</th>

		      <th scope="col">Fecha</th>
		      <th scope="col">DEPS</th>
		      <th scope="col">Ganancia</th>
		      <th scope="col">Acciones</th>

		    </tr>
		  </thead>
		  <tbody>
		    <tr v-bind:value="budget.id" v-for="budget in budgets" v-if="budget.type == type || type == 'ALL'">

		    	<td>{{ budget.nroOrder}}</td>
		    	<td>{{ budget.nroInvoice}}</td>
		    	<td>{{ budget.totalAmount}}</td>
		    	<td>{{ budget.description}}</td>
		    	<td>{{ budget.status}}</td>
		    	<td>{{ budget.control_Id}}</td>
		    	
		    	<td>{{ budget.DRSE}}</td>
		    	
		    	<td>{{ budget.date}}</td>
		    	<td>{{ budget.DEPS}}</td>
		    	<td>{{ budget.totalIncome}}</td>
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

		<b-pagination
			v-on:click.native="fetchBudgetFromPage(current)"
            :total="total"
            :current.sync="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :per-page="perPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </b-pagination>
		
	</div>
</template>

<script>
	import axios from 'axios'

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
                total: '',
                current: 1,
                perPage: 8,
                rangeBefore: 3,
                rangeAfter: 4,
                order: 'is-centered',
                size: 'size'
			}
		},
		computed: {
			TotalIncome(){
				let total = 0;
				
				this.budgets.forEach(budget=>{
					total += parseInt(budget.totalIncome);
				});
				
				this.$store.state.globalTotal += total;
				return total
			},
			totalInDollars(){
				return this.TotalIncome / 20000;
			},
			totalInDollarsAirTM(){
				return this.TotalIncome / 21400;
			},
			budgets(){
				return this.$store.getters.budgets
			}
		},
		methods: {
			onChange(event){
				console.log(event.target.value)
			},
			test(){
				alert('work')
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
			fetchBudgetFromPage(page){
				console.log('fetching budgets from page '+page);

				this.current = page;
				this.$store.dispatch('fetchBudgets',{
					control_id: this.$store.getters.current_control_id,
					currentPage: this.current
				})
				.then(res=>{
					console.log(res);
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

			this.$store.dispatch('fetchBudgets',{
				control_id: this.$store.getters.current_control_id,
				currentPage: this.current
			})
			.then(res=>{
				console.log(res);
				this.total = res.total;
				console.log(res.last_page);
			});
		}
	}
</script>