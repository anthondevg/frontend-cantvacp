<template>
  <div class="container">

	<!-- incluir seccion de ayuda de atajos -->
	
	<div class="row card mt-2 p-2">
		<div class="p-2 mb-2"><h1>Panel de Control</h1></div>
		
		<div class="p-3" style="display: flex; flex-direction: row; ">
			
			<router-link to="/nuevo/presupuesto" class="btn btn-primary">Agregar Presupuesto +</router-link>	

			<router-link to="/nuevo/gasto" class="btn btn-danger">Agregar Gasto +</router-link>

			<router-link to="/nuevo/tipo" class="btn btn-success">Agregar Tipo +</router-link>
		</div>
	</div>
	<budgetsTable/>
  </div>
</template>


<script>
	import budgetsTable from '../components/budgetsTable.vue'

	export default {
		name: 'Dashboard',
		components: {
			budgetsTable
		}
	}
</script>