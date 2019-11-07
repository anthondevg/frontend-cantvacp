<template>
	<div class="card totalCard">
			
			<div class="columns">
				<div class="column card mcard">
					<div  class="m-icon">
						<b-icon 
							size="is-large"  
							icon="currency-usd"></b-icon>
					</div>
					<div>
						<h1 style="font-size: 1.4em;">Monto</h1>
						<p>
							<small style="font-size: 1.6em;">{{ totalIncome | formattedNumber }}</small>
							<br>
							 <small class="text-primary">
							 ${{ totalInDollarsBeforeExpense }}USD (DolarToday)</small>
							 <br>
						</p>
					</div>
				</div>
				<div class="column card mcard">

					<div  class="m-icon">
						<b-icon size="is-large" icon="currency-usd-off"></b-icon>
					</div>

					<div>
						<h1 style="font-size: 1.5em;">Gasto</h1>
					<p>
						<small style="font-size: 1.6em;">{{ totalExpense | formattedNumber }}</small>
					</p>
					<b-icon icon="currency-usd"></b-icon>
					 <small class="text-primary">USD:(DolarToday) ${{ expenseInDollars }} </small>
					</div>
					
				</div>

				<div class="column card mcard">
					<div  class="m-icon">
						<b-icon size="is-large"  icon="currency-usd"></b-icon>
					</div>

					<div>
						<h1 style="font-size: 1.4em;">Ganancia</h1>
						<p>
							<small style="font-size: 1.6em;">{{ totalAfterExpense | formattedNumber }}</small>
						</p>
						<small class="text-primary">USD:(DolarToday) ${{ totalInDollarsAfterExpense }} </small>
					</div>
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
			totalInDollarsBeforeExpense(){
				return this.toDollars(this.totalIncome);
			},
			totalInDollarsAfterExpense(){
				return this.toDollars(this.totalAfterExpense);
			},
			expenseInDollars(){
				return this.toDollars(this.totalExpense);
			}

		},
		methods: {
			toDollars(total){
				const t = total / this.$store.getters.config_DOLAR;
				return t.toFixed(2);
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
	.totalCard{
		padding: 2em; 
		margin-bottom: 0.5em;
		background: whitesmoke;
	}
	.m-icon{
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		margin: 10px 3px;
		color: white;
	}

	
	.mcard{
		background: linear-gradient(to left, #53dd6c, #17bebb);
    	color: white;
		display: flex;
		justify-content: center;
		padding: 20px;
		border-radius:5px;
		margin: 3px;
		flex-direction: row; 
		box-shadow: 0px 3px 3px rgba(33,33,33,0.2),0px -1px 3px rgba(33,33,33,0.1);
	}
	
</style>