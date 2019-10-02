<template>
  <div class="container">

	<!-- incluir seccion de ayuda de atajos -->
	
	<div class="columns p-2 mt-5">
		<section class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Dashboard</h1>
					<h2 class="subtitle">
						Aqui puedes ver tus presupuestos y demas
					</h2>
			    </div>
			</div>
		</section>
		<div class="column p-2">
			
			<router-link to="/nuevo/presupuesto">
				<b-button class="mr-2" type="is-link">Añadir Presupuesto</b-button>
			</router-link>

			<router-link to="/nuevo/gasto">
				<b-button class="mr-2" type="is-danger">Añadir Gasto</b-button>
			</router-link>

			<router-link to="/nuevo/tipo" >
				<b-button type="is-success">Añadir Tipo</b-button>
			</router-link>
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
		},
		computed: {
			userId() {
				return this.$store.getters.user_id;
			}
		}
	}
</script>