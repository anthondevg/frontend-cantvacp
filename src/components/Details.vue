<template>
	<div class="details-card">
		<b-button 
				@click="toggle()"
				type="is-default"
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
					<span class="badge badge--smaller badge--danger">
    				
					<label>Descuento RSE </label>
					{{ parseInt(budget.DRSE) | formattedNumber}}</span>
				</div>

				<div class="detail">
					<span class="badge badge--smaller badge--danger">
    				
					<label>Descuento EPS </label>
						{{ parseInt(budget.DEPS) | formattedNumber}}
    				</span>
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
		background: linear-gradient(left, rgb(33,33,153), rgba(33,33,199,0.5));
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