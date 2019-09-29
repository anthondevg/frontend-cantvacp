<template>
	<div>
		<select name="type" v-model="type" class="form-control">
			<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
		</select>
	</div>
</template>

<script>
	import axios from 'axios'

	// setting up the endpoint !!!!!!!
	axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

	export default {
		name: 'selectTypes',
		data(){
			return {
				types: []
			}
		},

		created: function(){
			axios.get('/type')
				.then(res=>{
					this.types = res.data
				})
				.catch(err=>{
					console.log(err)
				})
		}
	}
</script>