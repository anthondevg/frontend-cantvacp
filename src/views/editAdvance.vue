<template>
	<div class="container form-container">
		
		<div class="desc-card">
			<h1 class="desc-title">Editar Anticipo</h1>
			<b-icon icon="earth" class="desc-icon"></b-icon>
		</div>

			<template >
				<form method="POST" class="inner-form--wrapper" @submit.prevent="updateAdvance">
					<div class="columns">

						<div class="column">
							 <b-field label="Tipo"  label-position="on-border">
				            	<b-select 
				            	required
				            	expanded
				            	icon="earth" 
				            	name="type" 
				            	v-model="type">
				            
									<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
					
					            </b-select>
					        </b-field>
						</div>

						<div class="column">
					        <b-field label="Numero de Pedido"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="889911"
					            	type="number" 
					            	native.type="number"
					            	icon="earth" 
					            	name="nroOrder" 
					            	v-model="nroOrder">		
					           	</b-input>
					        </b-field>
						</div>

						<div class="column">	
					        <b-field label="Numero de Factura"  label-position="on-border" expanded>
					            <b-input 
					            	required
					            	placeholder="555"
					            	type="number" 
					            	native.type="number"
					            	icon="earth" 
					            	name="nroInvoice" 
					            	v-model="nroInvoice">		
					           	</b-input>
					        </b-field>
						</div>

						<div class="column">
					        <b-field label="Fecha"  label-position="on-border">
						        <b-datepicker
						        	v-model="date"
						        	@input="parseDate"
						            placeholder="Selecciona la fecha"
						            icon="calendar-today"
						            >
						        </b-datepicker>
						    </b-field>
						</div>
					</div>

					<div class="columns">
						<div class="column">	
					        <b-field label="Descripción"  label-position="on-border" expanded>
					            <b-input 
					            	placeholder="APURE VENTA"
					            	type="text" 
					            	icon="pencil" 
					            	v-model="description" 
					            	name="description">		
					           	</b-input>
					        </b-field>
						</div>
						<div class="column">	
					        <b-field label="Status" label-position="on-border">
					            <b-select icon="check" name="status" v-model="status">
									<option selected value="0">En proceso</option>
									<option value="1">Completado</option>
									<option value="2">Cancelado</option>
							      </b-select>
					        </b-field>
						</div>

					</div>

					<div class="columns">

						<div class="column">
							<b-field label="Monto Global"  label-position="on-border" expanded>
								<div class="control">
									
									<money 
										class="input"
										v-model="totalAmount" 
										@change="calculateData" 
						    			@input="calculateData" 
						    			placeholder="523.231 BS"
						    			v-bind="money">
						    				
						    			</money>
								</div>
								           	
					        </b-field>
							<b-input
								type="number" 
								name="descRSE" 
								v-model="descRSE" 
								disabled 
								placeholder="0. BsS" required
							>	
							</b-input>
							<br>
							<b-input
								type="number" 
								name="descEPS" 
								v-model="descEPS" 
								disabled 
								placeholder="0. BsS" 
								required>
							</b-input>	
							<br>

						</div>
						<div class="column">
							<div class="columns">
								
								<div class="column ">
									<div style="font-size: 2rem; text-align: center; color: rgb(33,22,111);">
										RPS
										<br>
										<p>{{parseInt(descRSE) | formattedNumber }}</p>
									</div>
									
								</div>
								
								<div class="column">
									<div style="font-size: 2rem; text-align: center; color: rgb(222,222,111);">
										EPS
										<br>
										<p>{{parseInt(descEPS) | formattedNumber}}</p>
									</div>
									
								</div>	
							</div>
						</div>

					</div>

					<div style="display: flex; flex-direction: row-reverse;">
						<b-button native-type="submit" type="is-success" icon-right="ghost" class="save-button">
							Guardar
						</b-button>
					</div>
				</form>
			</template>
		
	</div>
</template>

<script>
	import {Money} from 'v-money'

	export default{
		name: 'editAdvance',
		data(){
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
				descRSE: 0,
				descEPS: 0,
				types: [],
				 money: {
		          decimal: ',',
		          thousands: '.',
		          prefix: '',
		          suffix: ' Bs.S',
		          precision: 2,
		          masked: false /* doesn't work with directive */
		        }
			}
		},
		components: {
			Money
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
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
		methods: {
			parseDate(){
				this.date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
			},
			calculateData(){
				this.descRSE = this.totalAmount * (this.$store.getters.config_DRSE/100);
				this.descEPS = this.totalAmount * (this.$store.getters.config_DEPS/100);
			},
			updateAdvance(){
				console.log('update advance')

				this.$http.post('/advance/update',{
					id: this.$route.params.id,
					user_Id: this.userId,
					control_Id: this.control_Id,
					nroOrder: new Number(this.nroOrder),
					nroInvoice: new Number(this.nroInvoice),
					totalAmount: new Number(this.totalAmount),
					description: this.description,
					date: this.date,
					status: this.status,
					type: this.type,
					DRSE: this.descRSE,
					DEPS: this.descEPS
				})
				.then(response=>{
					this.$router.push({path: `/control/${this.$store.getters.current_control_id}#advances`})
				})
			}
		},
		created: function(){
			this.$http.post('/advance/getById',{
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
				this.descRSE = d.DRSE;
				this.descEPS = d.DEPS;
				this.totalIncome = d.totalIncome;

				console.log(res)
			})
			.catch(err=>{
				console.log(err)
			})

			this.$http.get(`/type/id/${this.$store.getters.user_id}`)
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
		}
	}
</script>