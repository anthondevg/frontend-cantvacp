<template>
	
	<div class="container">
		<b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>

		<div class="config-card">
			<div style="font-size: 1.5em;">
				{{control_name}}
			</div>
			<b-button 
                  tag="router-link"
                  :to="{ name: 'editControl'}" 
                  type="is-default"
                  icon-right="engine">
                Editar Control
            </b-button>

		</div>

  		<div class="card add-div">
            <b-button 
            	  style="margin: 2px;"
                  tag="router-link"
                  :to="{ name: 'newBudget'}" 
                  type="is-link"
                  icon-right="earth">
                Nuevo Presupuesto
            </b-button>

             <b-button 

            	  style="margin: 2px;"
                  tag="router-link"
                  :to="{ name: 'newAdvance'}" 
                  type="is-link"
                  icon-right="pencil">
                Nuevo Anticipo
            </b-button>
            
            <b-button 

            	  style="margin: 2px;"
                  tag="router-link"
                  :to="{ name: 'addType'}" 
                  type="is-warning"
                  icon-right="pencil">
                Nuevo Tipo
            </b-button>
            | Valor del Dolar: {{this.$store.getters.config_DOLAR}} BsS

        </div>
	
        <h1 style="font-size: 2.4rem;">Presupuestos</h1>
	
		<div class="columns">
			<div class="column">
				
				<b-field label="Filtrar por">
		            <b-select 
		            	
		            	size="is-medium" 
		            	expanded 
		            	placeholder="CANTV"
		            	v-model="type" 
		            	icon="earth">
		            	<option value="ALL">Todo</option>
		            	<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
		            </b-select>
		        </b-field>
			
			</div>
			
			<div class="column" >
				<template>
				    <b-field label="Filtrar por Fecha">
				        <b-datepicker
				        	:day-names="dias"
				        	:month-names="meses"
				        	@input="fetchBudgetsFromTo"
				         	size="is-medium" 
				            placeholder="Selecciona dos fechas"
				            v-model="dates"
				            icon="calendar-today"
				            style="width: 60%"
				            language="es"
				            range>
				        </b-datepicker>
				    </b-field>
				</template>
			</div>	
	</div>
		
		
		<div class="loading-card">
			<half-circle-spinner
				v-if="loading"
			  :animation-duration="1200"
			  :size="55"
			  color="#86E88A"
			/>
		</div>

		<div v-if="budgets.length == 0 && !loading">
			<EmptyControlMsg 
				msg="No tienes presupuestos aún. Agrega algunos."
			/>
			
		</div>

		Mostrar
		<b-select 
		    style="width: 20%; margin-bottom: 5px;"   	
		    @input="fetchBudgets"
        	size="is-small" 
        	expanded 
        	placeholder="Cuantas mostrar?"
        	v-model="perPage" 
        	icon="account">
        	<option value="5">5</option>
        	<option value="10">10</option>
        	<option value="25">25</option>
        	<option value="50">50</option>
        </b-select>
		<transition name="fade">

	        <table v-if="budgets.length > 0 && !loading" style="width: 100%;" class="card table is-bordered is-dark mb-3 center is-responsive is-striped">
			  
			  <thead>
			    <tr>
					
			      <th scope="col"></th>
			      <th scope="col">ID</th>
			      <th scope="col">Descripcion</th>
			     
			      <th scope="col">Monto</th>
			      

			      <th scope="col">Fecha</th>
			      <th scope="col">Ganancia</th>
			      <th scope="col">Acciones</th>

			    </tr>
			  </thead>
			  
		  	<template>
		  		
		    	<budget-td v-for="budget in budgets" v-if="budget.type == type || type == 'ALL'" :budget="budget" />
		    	
		  	</template>
		  
			</table>
		</transition>
		<div class="card" style="padding: 5px;">
			<Pagination 
			v-bind:perPage="perPage"
			v-bind:total="total"
			/>
		</div>
		
		<div class="card" style="padding: 5px;"  v-if="budgets.length > 0 && !loading">
    		Se encontraron {{total}} Resultados.
    		<br>
			<StatusBoard />
    	</div>

		<TotalIncome 
			v-bind:budgets="budgets"
			v-bind:expenses="expenses"
			v-bind:globalBudgets="globalBudgets"
		/>

		<Advances/>


	</div>
</template>

<script>

	import axios from 'axios'
	import { HalfCircleSpinner } from 'epic-spinners'
	import TotalIncome from './TotalIncome.vue';
	import EmptyControlMsg from './emptyControlMsg.vue';
	import Advances from './Advances.vue';
	import Pagination from './Pagination.vue';
	import BudgetTd from './BudgetTd.vue';
	import StatusBoard from './StatusBoard.vue';

	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
 	
	export default {
		name: 'control',
		data(){
			return {
				control_id: this.$route.params.id,
				control_name: 'Cargando...',
				type: 'ALL',
				types: [],
				from: '',
				to: '',
				lastPage: '',
				dates: [],
				// state for pagination
                loading: true,
                total: '',
                // color of budgets status
                perPage: 5,
                meses: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                dias: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vier", "Sab"],
                isLoading: false,
                isFullPage: true
			}
		},
		components: {
			HalfCircleSpinner,
			TotalIncome,
			EmptyControlMsg,
			Pagination,
			Advances,
			BudgetTd,
			StatusBoard
		},
		computed: {
			budgets(){
				return this.$store.getters.budgets;
			},
			expenses(){
				return this.$store.getters.expenses;
			},
			globalBudgets(){
				return this.$store.getters.globalBudgets;
			},
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
		methods: {
			fetchBudgetsFromTo(){
				this.isLoading = true;
				console.log('get budgets')
				
				let from = this.dates[0].getFullYear() + "-" + (this.dates[0].getMonth() + 1) + "-" + this.dates[0].getDate();

				let to = this.dates[1].getFullYear() + "-" + (this.dates[1].getMonth() + 1) + "-" + this.dates[1].getDate();

				this.from = from;
				this.to = to;
				
				this.$store.dispatch('fetchBudgetsFromTo',{
					from: this.from,
					to: this.to
				}).then(res=>{
					this.isLoading = false;
				})
			},
			fetchBudgets(){
				this.isLoading = true;
				this.$store.dispatch('fetchBudgets',{
					control_id: this.$store.getters.current_control_id,
					currentPage: this.current,
					perPage: this.perPage
				})
				.then(res=>{
					this.isLoading = false;
					console.log(res);
					this.loading = false;
					this.total = res.total;
				});
			}
		},
		created: function(){

			axios.get(`/type/id/${this.$store.getters.user_id}`)
			  .then(res=> {
			    // handle succes
			    this.types = res.data;
			    console.log('SUCCESS',res.data);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  });

			
			this.$store.dispatch('setCurrentControl',{
				control_id: this.$route.params.id
			});

	    	axios.get(`/control/id/${this.$store.getters.current_control_id}`)
			  .then(res=> {
			    // handle succes
			    this.control_name = res.data[0].name;
			    console.log('control res data',res.data);
			  })
			  .catch(function (error) {
			    // handle error
			    console.log(error);
			  });

			this.$store.dispatch('fetchExpenses',{
				control_id: this.$store.getters.current_control_id
			})
			.then(res=>{
				console.log(res);
			});

			this.$store.dispatch('fetchBudgets',{
				control_id: this.$store.getters.current_control_id,
				currentPage: this.current,
				perPage: this.perPage
			})
			.then(res=>{
				console.log(res);
				this.loading = false;
				this.total = res.total;
			});

			this.$store.dispatch('fetchGlobalBudgets',{
				control_id: this.$store.getters.current_control_id
			});
		}
	}
</script>

<style>

	.slide-fade-enter-active {
	transition: all .3s ease;
	}
	.slide-fade-leave-active {
	transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(10px);
	opacity: 0;
	}

	.status-box{
		width: 8%; color: white; height: 8%;
		text-align: center; background: rgb(44,188,44);
		padding: 5px 2px;
	}
	.status-box{

	}

	.loading-card{
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.budget-el{
		border-left: '2px solid green';
		transition: all ease .2s;
	}

	.budget-el:hover{
		background-color: rgb(233,233,233) !important;
		border-left: '4px solid green' !important;
	}

	.config-card{
		background: linear-gradient(left, rgb(33,33,133), rgb(33,33,199));
	    border-radius: 10px;
	    display: flex;
	    justify-content: space-between;
	    margin: 5px;
	    padding: 10px;
	    color: white;
	    width: 100%;
	    text-align: center;
	    transition: all ease .4s;
	}

	/*css styles*/
	
	.badge {
	 box-sizing: border-box;
	 display: inline-block;
	 background-color: #2c3e50;
	 color: #fff;
	 border-radius: 5px;
	 text-align: center;
	 font-size: 1.6rem;
	 font-weight: 400;
	 padding: 0.05rem 0.8rem 0.1rem;
	 line-height: inherit;
	}
 .badge--line {
	 background-color: transparent;
	 color: #95a5a6;
	 box-shadow: 0 0 0 1px #95a5a6;
}
 .badge--info {
	 background-color: #3498db;
}
 .badge--warning {
	 background-color: #f1c40f;
}
 .badge--danger {
	 background-color: #e74c3c;
}
 .badge--success {
	background: linear-gradient(left, rgb(33,233,133), rgb(33,233,199));	    
}
 .badge--small {
	 font-size: 1.2rem;
	 padding: 0.1rem 0.65rem 0.2rem;
}
 .badge--smaller {
	 font-size: 0.88rem;
	 padding: 0.05rem 0.4rem 0.15rem;
}


 
</style>