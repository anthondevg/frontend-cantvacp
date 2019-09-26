<template>
  <div class="home text-center">
  	<h1>CANTVACP</h1>

  	<hr>

  	<div class="container">
  		
  		<div class="row">
  			<div class="card col-md-6">
  				
  				<h3>Bienvenido!</h3>
  				<hr>

  				<p>

  					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos adipisci minus ipsam rem, officia blanditiis voluptatem hic perferendis, expedita amet, iste rerum eos qui odio dolor eum. Ea, quas, libero.
				
  				</p>

					<router-link class="btn btn-primary text-white" to="/dashboard">Dashboard</router-link>
				

  			</div>
  			<div class="card col-md-6">
  				
  				<h1>Que hacer?</h1>
				
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, et, expedita. Nobis libero placeat, officiis iste iusto non error, saepe architecto, repudiandae fugit amet maiores sequi recusandae ab! Atque, laborum.

  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
