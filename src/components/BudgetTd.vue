<template>
	<tbody>
		<tr class="budget-el" v-bind:style="{ borderLeft: borderLeft[budget.status] }" v-bind:value="budget.id" >
	
    	<td>
    		<b-button 
				@click="toggle()"
				type="is-default"
	            icon-right="eye" />
		</td>
		
    	<td>{{budget.id}}</td>
    	<td>{{ budget.description}}</td>
    	
    	<td>
    		<span class="badge badge--smaller badge--info">
				{{ parseInt(budget.totalAmount) | formattedNumber }}
			</span>
		</td>
    	
    	<td>{{ budget.date }}</td>
    	<td>
    		<span class="badge badge--smaller badge--success">
    		{{ parseInt(budget.totalIncome) | formattedNumber}}
			</span>
    	</td>
    	<td>
    		
    		<b-button 
    			tag="router-link"
    			:to="{ name: 'presupuesto', params: {id: budget.id}}" 
    			type="is-success"
        		icon-right="pencil" />
			
    		<b-button type="is-danger" icon-right="delete" v-on:click="deleteBudget(budget.id)" />
    	</td>
    </tr>

    <tr>
    	<td colspan="7"  style="padding: 0; margin: 0;">
    		<toggle-details-item
    		:isActive="isActive"
    		:budgetIncome="budget.totalIncome"
    		:budget="budget" 
			:expenses="budget.budget_expenses"
	    	/>
    	</td>
    </tr>
	</tbody>
</template>

<script>
	import axios from 'axios'
	import ToggleDetailsItem from './ToggleDetailsItem.vue';
	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
 	
	export default {
		name: 'budget-td',
		props: ['budget'],
		data(){
			return {
				isActive: false,
				borderLeft: [
                	'3px solid orange',
                	'3px solid green',
                	'3px solid red'
                ]
			}
		},
		components: {
			ToggleDetailsItem,
		},
		methods: {
			toggle(){
				this.isActive = !this.isActive;
			},
			deleteBudget(id){

				if(window.confirm('Estas seguro?')){
					axios.post('/budget/delete',{
						id: id
					})
					.then(res=>{

						let state = this.$store.state.budgets.filter(budget => budget.id != id)

						this.$store.state.budgets = state;
						
						console.log(res)
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}
		},
		filters: {
	    	formattedNumber (value) {
	     		return `${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} Bs`
	    	}
	  	}
	}
</script>