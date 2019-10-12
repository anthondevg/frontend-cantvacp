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
							 <small class="text-primary">USD:(AirTM) ${{ totalInDollarsAirTM }} </small>
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
		props: ['totalIncome','totalAfterExpense','totalExpense','totalInDollars','totalInDollarsAirTM'],
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