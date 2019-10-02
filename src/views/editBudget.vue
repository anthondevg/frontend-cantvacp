
<template>
	<div class="container">
		
		<h1>Editar {{$route.params.id}}</h1>	

			<hr>

			<form method="POST" @submit.prevent="updateBudget">
				<div class="form-row">
					<div class="col-md-4 mb-3">
						<label>Numero de Pedido</label>
			    		<input type="number" name="nroOrder" autofocus v-model="nroOrder" class="form-control" placeholder="522899" required>
					</div>
					<div class="col-md-4 mb-3">
						<label>Numero de Factura</label>
						<input type="number" name="nroInvoice" v-model="nroInvoice" class="form-control" placeholder="444" required>
					</div>
					<div class="col-md-4 mb-3">
						<label>Fecha</label>
						<div class="input-group">
					
							<div class="input-group-prepend">
								<span class="input-group-text" id="inputGroupPrepend">*</span>
							</div>

							<input type="date" name="date" v-model="date" class="form-control" placeholder="Username" required>
						</div>
					</div>
				</div>
			<div class="form-row">
				<div class="col-md-6 mb-3">
					<label for="validationCustom03">Descripción</label>
					<input 
						type="text" 
						v-model="description" 
						name="description" 
						class="form-control" id="validationCustom03" 
						placeholder="Descripcion" 
						required>
				</div>
				<div class="col-md-3 mb-3">
					<label>Status</label>
					<select class="form-control" name="status" v-model="status" id="validationCustom04">
						<option selected value="1">En proceso</option>
						<option value="2">Completado</option>
						<option value="3">Cancelado</option>
					</select>
				</div>

				<div class="col-md-3 mb-3">
					<label>Tipo</label>
						      
				<select name="type" v-model="type" class="form-control">
					<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
				</select>

				</div>
			</div>

			<div class="form-row">
			    <div class="col-md-6 mb-3">
			    	<label for="validationCustom03">Monto Total</label>
					
					<input 
						type="number" 
						name="totalAmount"
						@change="calculateData" 
			    		@input="calculateData"  
						@keyup.ctrl.32="multiplyByTwo" 
						@keyup.ctrl.88="addThousand" 
						@keyup.ctrl.77="addMillion"
						v-model="totalAmount" 
						class="form-control" 
						id="validationCustom03" 
						placeholder="20.000.000 BsS" 
						required>
				</div>

			    <div class="col-md-3 mb-3">
			    	<label>Descuento RPS</label>

			    	<input type="number" name="descRPS" v-model="descRPS" class="form-control" placeholder="0. BsS" value="0" required>

				</div>

				<div class="col-md-3 mb-3">
			    	<label>Descuento RPS</label>

			    	<input type="number" name="descEPS" v-model="descEPS" disabled class="form-control" placeholder="0. BsS" value="0" required>

				</div>
				<div class="col-md-3 mb-3">
					<label><b>Ganancia</b></label>

					<input type="number" name="totalIncome" v-model="totalIncome" disabled class="form-control" placeholder="0. BsS" value="0" required>
					
					{{totalIncome}} Bs.S
				</div>
			</div>
			<hr>
				<button class="btn btn-primary" type="submit">Agregar</button>
			</form>
	</div>
</template>

<script>
	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'editBudget',
		data() {
			return {
				userId: '2',
				nroOrder: '',
				nroInvoice: '',
				totalAmount: 0,
				description: '',
				date: '',
				status: '1',
				type: '',
				descRPS: '',
				descEPS: '',
				totalIncome: '',
				types: [],
				id: ''
			}
		},
		created: function(){
			axios.post('/budget/getById',{
				id: this.$route.params.id
			})
			.then(res=>{

				let d = res.data;
				this.nroOrder = d.nroOrder;
				this.nroInvoice = d.nroInvoice;
				this.totalAmount = d.totalAmount;
				this.description = d.description;
				this.date = d.date;
				this.status = d.status;
				this.type = d.type;
				this.descRPS = d.DRSE;
				this.descEPS = d.DEPS;
				this.totalIncome = d.totalIncome;

				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})

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
			updateBudget(){
				console.log('update budget')

				this.$store.dispatch('updateBudget',{
					id: this.$route.params.id,
					userId: this.userId,
					nroOrder: this.nroOrder,
					nroInvoice: this.nroInvoice,
					totalAmount: this.totalAmount,
					description: this.description,
					date: this.date,
					status: this.status,
					type: this.type,
					descRPS: this.descRPS,
					descEPS: this.descEPS,
					totalIncome: this.totalIncome
				})
				.then(response=>{
					this.$router.push({name: 'dashboard'})
				})
			}

		}
	}
</script>