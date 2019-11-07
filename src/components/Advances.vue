<template>
	<div id="advances" class="is-fullhd container" style="padding: 10px; margin-top: 5px;">
		<div>
			<div class="advance-container">
				<div v-for="advance in advances">
					<h1>{{advance.description}}</h1>
					<div class="info-advance">
						<div>
							<span>Monto {{parseInt(advance.totalAmount) | formattedNumber}}</span>
						</div>
						<div>
							<span>DRSE {{parseInt(advance.DRSE) | formattedNumber}}</span>
							<span>DEPS {{parseInt(advance.DEPS) | formattedNumber}}</span>
							
						</div>
						<div>
							<span>{{advance.date}}</span>
							<span>N.O {{advance.nroOrder}}</span>
							<span>N.F {{advance.nroInvoice}}</span>
						</div>

						<div style="margin: 5px;">	
			    		
			    			<b-button 
			    			tag="router-link"
			    			:to="{ name: 'editAdvance', params: {id: advance.id}}" 
			    			type="is-white is-small"
			    			size="small"
			    			rounded
			    			outlined
	                		icon-right="pencil" />
						
			    			<b-button type="is-white is-small" rounded size="small"
			    			outlined icon-right="delete" v-on:click="deleteAdvance(advance.id)" />
			    	
						</div>
					</div>
				</div>
			</div>

			<div style="display: flex;justify-content: center;">
				<b-button 
			    			type="is-dark is-medium"
			    			rounded
			    			icon-right="eye">Mostrar mas</b-button>
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
			deleteAdvance(id){

				if(window.confirm('Estas seguro?')){
					this.$http.post('/advance/delete',{
						id: id
					})
					.then(res=>{
						let state = this.advances.filter(advance => advance.id != id)
						this.advances = state;
						console.log(res)
					})
					.catch(err=>{
						console.log(err)
					})
				}
			
			},
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

<style>
	
	.advance-container > div {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  text-align: center;
	  border-radius: 3px;
	  color: white;
	  transition: all ease .5s;

	}
	.info-advance{
		display: none;
		transition: all ease .4s;
	}
	.info-advance > div  > span {

		border: 1px solid white;
		border-radius: 40px;
		padding: 5px;
		font-size: .5rem;
		margin: 1px;
	}
	.advance-container > div:hover  {
		transform: scale(1.6);
		width: 100%;
		box-shadow: 0px 2px 4px rgba(33,33,33,0.4);
	}
	.advance-container > div:hover .info-advance{
		display: block;
	}
	.advance-container > div:active  {
		transform: scale(2);
		width: 100%;
	}
	.advance-container > div:active .info-advance{
		display: block;
	}
	.advance-container > div > h1{
		font-size: 1.4em;
	}
	.advance-container > div:nth-child(1n) {
	  background-color: #272838;  
	}
	.advance-container > div:nth-child(2n) {
	  background-color: #17bebb;  
	}
	.advance-container > div:nth-child(2n) {
	  background-color: rgba(23,190,187,0.9);  
	}
	.advance-container > div:nth-child(3n) {
	  background-color: rgba(53,44,166,0.9);  
	}
	.advance-container{
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
		grid-auto-rows: 200px;
		grid-gap: 5px;
		padding: 50px;
	}
	

</style>

