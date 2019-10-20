<template>
	<div class="card" style="padding: 10px; margin-top: 5px;">
		<div>
			<h1 style="font-size: 2.4rem;">Anticipos</h1>
			
			<table style="width: 100%" class="card is-dark table mb-3 center is-responsive is-striped">
			  
			  <thead>
			    <tr>
					
			      <th scope="col">ID</th>
			      <th scope="col">Descripcion</th>
			     
			      <th scope="col">Numero de Orden</th>
			      <th scope="col">Numero de Factura</th>
			      <th scope="col">Monto</th>
			      
			      <th scope="col">Fecha</th>
			      <th scope="col">Acciones</th>

			    </tr>
			  </thead>
			  <tbody v-for="advance in advances">
			  	
			    <tr class="budget-el" v-bind:value="advance.id" >
					
			    	<td>{{advance.id}}</td>
			    	
			    	<td>{{ advance.description}}</td>
			    	
			    	<td>{{ advance.nroOrder }}</td>
			    	<td>{{ advance.nroInvoice }}</td>
			    	
			    	<td>{{ parseInt(advance.totalAmount) | formattedNumber }}</td>
			    	
			    	<td>{{ advance.date}}</td>
			    	
			    	<td>
			    		
			    		<b-button 
			    			tag="router-link"
			    			:to="{ name: 'anticipo', params: {id: advance.id}}" 
			    			type="is-success"
	                		icon-right="pencil" />
						
			    		<b-button type="is-danger" icon-right="delete" v-on:click="deleteAdvance(advance.id)" />
			    	</td>
			    
			    </tr>
			  </tbody>

			</table>

		<div class="card" style="padding: 10px;">
			<template>
				<b-pagination
						v-on:click.native="fetchAdvancesFromPage(current)"
			            :total="total"
			            :current.sync="current"
			            :range-before="rangeBefore"
			            :range-after="rangeAfter"
			            :order="order"
			            :size="size"
			            :per-page="perPage"
			            aria-next-label="Next page"
			            aria-previous-label="Previous page"
			            aria-page-label="Page"
			            aria-current-label="Current page">
			    </b-pagination>
			</template>

		</div>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
 	
	export default{
		name: 'Advances',
		data(){
			return {
				advances: [],
				current: 1,
                perPage: 2,
                rangeBefore: 1,
                rangeAfter: 2,
                order: 'is-right',
                size: 'size',
                total: 100
			}
		},
		methods: {
			fetchAdvancesFromPage(page){
				console.log('fetching advances from page '+page);

				this.current = page;

				return axios.get(`/advance/pagination/${this.$store.getters.user_id}/${this.$store.getters.current_control_id}?page=${page}`)
		         .then(res=>{
		         	this.advances = res.data.data;
		         	return res.data;
		         })
		         .catch(err=>{
		            console.log('Error fetching advances',err)
		         });

			}
		},
		created: function(){
			this.fetchAdvancesFromPage(this.current)
				.then(res=>{
					this.total = res.total;
				})
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	},
	}
</script>

