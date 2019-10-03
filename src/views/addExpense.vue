<template>
	<div class="container mb-5">
		
		<h1 style="font-size: 2.4rem;">Crear nuevo Gasto</h1>
			<hr>
			<template>
				<form method="POST" @submit.prevent="newExpense">
					<div class="columns">

						<div class="column">
					        <b-field label="Descripción"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="Bote de Escombros"
					            	type="text" 
					            	native.type="text"
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
		name: 'newBudget',
		data() {
			return {
				userId: this.$store.getters.user_id,
				nroOrder: '',
				nroInvoice: '',
				totalAmount: 0,
				description: '',
				date: [], 
				status: '1',
				control_Id: this.$store.getters.current_control_id,
				type: '',
				descRPS: 0,
				descEPS: 0,
				totalIncome: '',
				types: []
			}
		},
		created: function(){
			axios.get(`/type/id/${this.$store.getters.user_id}`)
			  .then(res=> {
			    // handle success
				this.type = res.data[0].code
			    this.types = res.data;
			    console.log(res.data);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  })

		},
		methods: {
			parseDate(){
				this.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
			},
			calculateData(){
				this.descRPS = this.totalAmount * 0.180;
				this.descEPS = this.totalAmount * 0.03;

				this.totalIncome = this.totalAmount - (this.descRPS + this.descEPS); 
			},
			addMillion(){
				console.log('ok')

				this.totalAmount += '000000'

				this.totalAmount = parseInt(this.totalAmount)

				this.calculateData()
			},
			addThousand(){

				console.log('ok')

				this.totalAmount += '000'

				this.totalAmount = parseInt(this.totalAmount)

				this.calculateData()	
			},
			multiplyByTwo(){
				console.log('ok')
				
				this.totalAmount *= 2;
				this.calculateData()	
			}, 
			newBudget(){
				console.log('new budget in ')

				this.$store.dispatch('newBudget',{
					userId: this.userId,
					control_Id: this.control_Id,
					nroOrder: new Number(this.nroOrder),
					nroInvoice: new Number(this.nroInvoice),
					totalAmount: new Number(this.totalAmount),
					description: this.description,
					date: this.date,
					status: this.status,
					type: this.type,
					descRPS: this.descRPS,
					descEPS: this.descEPS,
					totalIncome: this.totalIncome
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}`})
				})
			}

		}
	}
</script>