<template>
	
	<div class="row p-4 mb-4 mt-2 card">
		<div class="card p-2 mb-2">
				
			<label for="">Filtrar: </label>

			<select name="type" @change="onChange($event)" v-model="type" style="width: 40%" class="form-control mb-2">
				<option value="ALL">Todo</option>
				<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
			</select>
			Fecha
			<div class="p-2 mb-2" >
				<form action="" style="display: flex; flex-direction: row;" @submit.prevent="fetchBudgetsFromTo">
					<input type="date" required v-model="from" class="form-control" style="width: 30%;">
					<input type="date" required v-model="to" class="form-control" style="width: 30%;">
					<input type="submit" class="btn btn-sm ml-2 btn-small btn-success" value="GO" style="width: 20%">
				</form>
			</div>
		</div>
		<div class="card" style="display: flex; flex-direction: row-reverse; ">
			<button class="btn btn-small btn-danger">PDF</button>
			<button class="btn btn-small btn-success">Excel</button>
		</div>
		<table class="table  mb-3 table-striped table-hover table-dark table-responsive">
		  <thead>
		    <tr style="text-align: center;" >
		      <th scope="col">#</th>
		      <th scope="col">Nro Pedido</th>
		      <th scope="col">Nro Factura</th>
		      <th scope="col">Monto</th>
		      <th scope="col">Descripcion</th>
		      <th scope="col">Status</th>
		      
		      <th scope="col">DRSE</th>

		      <th scope="col">Fecha</th>
		      <th scope="col">DEPS</th>
		      <th scope="col">Ganancia</th>
		      <th scope="col">Acciones</th>

		    </tr>
		  </thead>
		  <tbody>
		    <tr style="text-align: center;" v-bind:value="budget.id" v-for="budget in budgets" v-if="budget.type == type || type == 'ALL'">

		    	<td>{{ budget.id}}</td>
		    	<td>{{ budget.nroOrder}}</td>
		    	<td>{{ budget.nroInvoice}}</td>
		    	<td>{{ budget.totalAmount}}</td>
		    	<td>{{ budget.description}}</td>
		    	<td>{{ budget.status}}</td>
		    	
		    	<td>{{ budget.DRSE}}</td>
		    	
		    	<td>{{ budget.date}}</td>
		    	<td>{{ budget.DEPS}}</td>
		    	<td>{{ budget.totalIncome}}</td>
		    	<td>
		    		<router-link :to="{ name: 'presupuesto', params: {id: budget.id}}" class="btn btn-sm btn-success">Editar</router-link>
		    		<button class="btn btn-danger btn-sm" v-on:click="deleteBudget(budget.id)">Borrar</button>
		    	</td>		    	
		    </tr>
		  </tbody>


		</table>
		<nav aria-label="Page navigation example">
		  <ul class="pagination justify-content-center">
		    <li class="page-item disabled">
		      <a class="page-link" href="#" tabindex="-1">Previous</a>
		    </li>
		    <li class="page-item"><a class="page-link" href="#">1</a></li>
		    <li class="page-item"><a class="page-link" href="#">2</a></li>
		    <li class="page-item"><a class="page-link" href="#">3</a></li>
		    <li class="page-item">
		      <a class="page-link" href="#">Next</a>
		    </li>
		  </ul>
		</nav>
		
		<div class="card p-3 mb-2">
			<h3 class="text-success">Ganancia Total </h3>
			<p>
				Bolivares Soberanos <small class="text-danger">{{ incomeGlobalTotal }} BsS</small>
				<br>
				 <small class="text-primary">USD:(DolarToday) ${{ totalInDollars }} </small>
				 <br>
				 <small class="text-primary">USD:(AirTM) ${{ totalInDollarsAirTM }} </small>
			</p>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios'
	
	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = 'http://authapi.arentus/api'
 	
	export default {
		name: 'budgetsTable',
		data() {
			return {
				type: 'ALL', //SELECTED TYPE
				types: [],
				from: '',
				to: ''
			}
		},
		computed: {
			incomeGlobalTotal(){
				let total = 0;
				
				this.budgets.forEach(budget=>{
					total += parseInt(budget.totalIncome);
				});
				
				this.$store.state.globalTotal += total;
				return total
			},
			totalInDollars(){
				return this.incomeGlobalTotal / 20000;
			},
			totalInDollarsAirTM(){
				return this.incomeGlobalTotal / 21400;
			},
			budgets(){
				return this.$store.getters.budgets
			}
		},
		methods: {
			onChange(event){
				console.log(event.target.value)
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

				this.$store.dispatch('fetchBudgetsFromTo',{
					from: this.from,
					to: this.to
				});
			}
		},

		created: function(){
			axios.get('/type')
				.then(res=>{
					this.types = res.data
				})
				.catch(err=>{
					console.log(err)
				})

			this.$store.dispatch('fetchBudgets');
		}
	}
</script>