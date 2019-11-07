<template>
	<div style="display: flex;">
    	<div class="card status-box is-success"> 
    		<b-icon icon="checkbox-marked-circle-outline">
    		</b-icon>
			 <p>{{completedBudgets}}</p>
		</div>
		<div class="card status-box is-info"> 
    		<b-icon icon="clock-outline">
    		</b-icon>
			 <p>{{pendingBudgets}}</p>
		</div>
		<div class="card status-box is-danger"> 
    		<b-icon icon="close-circle">
    		</b-icon>
			 <p>{{cancelledBudgets}}</p>
		</div>
		
   </div>
</template>

<script>
	export default{
		name: 'status-board',
		data(){
			return {

			}
		},
		computed: {
			globalBudgets(){
				return this.$store.getters.globalBudgets;
			},
            completedBudgets(){
            	let total = 0;
            	this.globalBudgets.forEach(budget=>{
            		if(budget.status == 1){total++;}
				});
            	return total;
            },
            pendingBudgets(){

            	let total = 0;
            	
            	this.globalBudgets.forEach(budget=>{
            		if(budget.status == 0){
            			total++;
            		}
				});
            	
            	return total;
            },
            cancelledBudgets(){

            	let total = 0;
            	
            	this.globalBudgets.forEach(budget=>{
            		if(budget.status == 2){
            			total++;
            		}
				});
            	
            	return total;
            }
		}
	}
</script>