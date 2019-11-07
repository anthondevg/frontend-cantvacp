<template>
	<div class="details-card">
		<b-button 
				@click="toggle()"
				type="is-dark"
	            icon-right="eye">Ver Detalles</b-button>

		<transition name="fade">
			<div v-show="isActive">

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
					
					<label>Descuento RSE </label>
					{{ parseInt(budget.DRSE) | formattedNumber}}
				</div>

				<div class="detail">
					
					<label>Descuento EPS </label>
						{{ parseInt(budget.DEPS) | formattedNumber}}
    			
				</div>

		</div>
		</transition>
	</div>
</template>

<script>
	
	export default {
		name: 'Details',
		props: ['budget'],
		data(){
			return {
				isActive: false
			}
		},
		methods: {
			toggle(){
				this.isActive = !this.isActive;
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
	.details-card{
		background: #53dd6c;
	    color: white;
	    margin-bottom: 10px;
	    padding: 10px;
	    display: flex;
	    border-radius: 3px;
	    justify-content: space-between;
	    align-items: center;
	    text-align: center;
		transition: all ease .3s;
	}

</style>