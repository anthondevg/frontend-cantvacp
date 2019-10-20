<template>
	<div>
		<b-button 
				@click="toggle()"
				type="is-default"
	            icon-right="eye">Ver Detalles</b-button>

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
					<span class="badge badge--smaller badge--danger">
    				{{ parseInt(budget.DRSE) | formattedNumber}}</span>
				</div>

				<div class="detail">
					<label>Descuento EPS </label>
					<span class="badge badge--smaller badge--danger">
    					{{ parseInt(budget.DEPS) | formattedNumber}}
    				</span>
				</div>

		</div>
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