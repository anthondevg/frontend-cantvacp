<template>
	<div class="container">
		
		<h1>Agregar nuevo Tipo </h1>	

		<hr>

		<form method="POST" class="needs-validation" @submit.prevent="newType">
		
		    <div class="col-md-12 mb-3">
		      <label>Nombre</label>

		      	<input type="text" name="name" autofocus v-model="name" class="form-control" id="validationCustom01" placeholder="CANTV" required>
		     
		    </div>
			<hr>
		  <button class="btn btn-primary" type="submit">Agregar Tipo</button>
		</form>
	</div>
</template>

<script>
	
	export default {
		name: 'addType',
		data() {

			return {
				userId: 1,
				code: this.makeid(10),
				name: ''
			}
		},
		methods: {
			newType(){
				console.log('new type')

				this.$store.dispatch('newType',{
					userId: this.userId,
					code: this.code,
					name: this.name
				})
				.then(response=>{
					this.$router.push({name: 'dashboard'})
				})
				.catch(err=>{
					console.log('error, ',err);
				})
			},
			makeid(length) {
			   var result           = '';
			   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			   var charactersLength = characters.length;
			   for ( var i = 0; i < length; i++ ) {
			      result += characters.charAt(Math.floor(Math.random() * charactersLength));
			   }
			   return result;
			}


		}
	}
</script>