<template>
	<div class="container">
	
		<div class="jumbotron">
			<h1>Agregar nuevo Gasto </h1>	
		</div>
		<hr>

		<form method="POST" @submit.prevent="newGasto">
		  
		  <label>Descripcion</label>

	      <input type="text" name="description" autofocus v-model="description" class="form-control" placeholder="Comprar teipe" required>
	      
	      <label>Monto</label>

	      <input type="number" name="amount" autofocus v-model="amount" class="form-control" placeholder="200.000" required>
	      <input type="submit" class="btn btn-success mt-2" value="Agregar">
		</form>
	</div>
</template>

<script>
	
	export default {
		name: 'addGasto',
		data() {
			return {

			}
		}
	}
</script>