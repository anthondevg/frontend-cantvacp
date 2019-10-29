<template>
	<div class="resume-wrapper">
		<div class="columns">
			<div v-if="totalExpense > 0" class="column resume-card">
				<h3 class="div-actions-title">
					Ganancia antes de Gastos
					<br>
    				{{ parseInt(budgetIncome) | formattedNumber}}
    				</span>
				</h3>
			</div>
			<div v-if="totalExpense > 0" class="column resume-card">
				<h3 class="div-actions-title">
					Gasto Total 
					<br>
					 {{ parseInt(totalExpense) | formattedNumber}}
					
				</h3>
			</div>
			<div class="column resume-card resume-card--success">
				
				<b-tooltip v-bind:label="totalInDollars">
					
					<h3 class="div-actions-title">
						Ganancia Total
						<br>
						 {{ parseInt(totalIncome) | formattedNumber }}
					</h3>

				</b-tooltip>

			</div>
		</div>
	</div>

</template>

<script>
	export default{
		name: 'ResumeDetails',
		props: ['sExpenses','budgetIncome'],
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
				let total = this.totalIncome / this.$store.getters.config_DOLAR;

				return `$ ${total.toFixed(2)} USD`;
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
	
	.resume-card{
		padding: 10px;
		border: 3px solid grey;
		margin: 10px;
		min-height: 100px;
		width: 100%;
		color: grey;
		display: block;
		border-radius: 10px;
		text-align: center;
	}

	.resume-card--success{
		color: rgb(33,233,199);
		border-color: rgb(33,233,199);
	}
	.resume-card--danger{
		background: linear-gradient(left, rgb(233,111,133), rgb(133,133,100));
	}
</style>