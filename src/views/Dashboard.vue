<template>
  <div class="container">
	
	
	<!-- incluir seccion de ayuda de atajos -->
	
	<div class="columns">
		<section class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Vista Global </h1>
					<h2 class="subtitle">
						Aqui puedes ver tus presupuestos globalmente
					</h2>
			    </div>
			</div>
		</section>
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
