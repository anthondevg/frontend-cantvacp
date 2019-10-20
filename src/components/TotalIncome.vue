<template>
	<div class="card totalCard">
			<div class="columns">
				<div class="column card">
					<h1 style="font-size: 2.4em;">Monto</h1>
						<p>
							Bolivares Soberanos <small class="text-danger">{{ totalIncome | formattedNumber }}</small>
							<br>
							 <small class="text-primary">USD:(DolarToday) ${{ totalInDollars }} </small>
							 <br>
						</p>
				</div>
				<div class="column card">
					<h1 style="font-size: 2.4em;">Gasto</h1>
			
					<p>
						{{ totalExpense | formattedNumber }}
					</p>
					
				</div>
				<div class="column card">
					<h1 style="font-size: 2.4em;">Ganancia</h1>
						<p>
							Bolivares Soberanos <small class="text-danger">{{ totalAfterExpense | formattedNumber }}</small>
							
						</p>
				</div>
			</div>
		</div>
</template>
<script>
	
	export default {
		name: 'TotalIncome',
		props: ['budgets','expenses','globalBudgets'],
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
				return this.totalIncome / this.$store.getters.config_DOLAR;
			},
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	}
	}
</script>
<style>
	.totalCard{
		padding: 2em; 
		margin-bottom: 0.5em;
			
	}
</style>