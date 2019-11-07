<template>
	<div>
		<select name="type" v-model="type" class="form-control">
			<option v-for="type in types" v-bind:value="type.code">{{type.name}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'selectTypes',
		data(){
			return {
				types: []
			}
		},

		created: function(){
			this.$http.get('/type')
				.then(res=>{
					this.types = res.data
				})
				.catch(err=>{
					console.log(err)
				})
		}
	}
</script>