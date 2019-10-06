<template>
	<div class="container mb-5">
		
		<h1 style="font-size: 2.4rem;">Agregar nuevo Gasto</h1>
			<hr>
			<template>
				<form method="POST" @submit.prevent="newExpense">
					<div class="columns">

						<div class="column">
					        <b-field label="Descripción"  label-position="on-border" expanded>
					            <b-input 
					            	autofocus
					            	required
					            	placeholder="Bote de Escombros"
					            	type="text" 
					            	icon="pencil" 
					            	name="description" 
					            	v-model="description">		
					           	</b-input>
					        </b-field>
						</div>

						<div class="column">	
					        <b-field label="Gasto"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="180.000BsS"
					            	type="number" 
					            	native.type="number"
					            	icon="earth" 
					            	name="amount" 
					            	v-model="amount">		
					           	</b-input>
					        </b-field>
						</div>
					</div>
					<div class="block">
						<b-button native-type="submit" type="is-link" icon-right="earth">Agregar</b-button>
					</div>

				</form>
			</template>
		
	</div>
</template>

<script>
	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'addExpense',
		data() {
			return {
				userId: this.$store.getters.user_id,
				control_Id: this.$store.getters.current_control_id,
				description: '',
				amount: ''
			}
		},
		created: function(){
		},
		methods: {
			newExpense(){
				console.log('new expense in control')

				this.$store.dispatch('newExpense',{
					userId: this.userId,
					control_Id: this.control_Id,
					description: this.description,
					amount: new Number(this.amount)
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}`})
				})
			}

		}
	}
</script>