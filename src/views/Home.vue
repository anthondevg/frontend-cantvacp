<template>
  <main class="home container is-fullhd">
	<div class="columns header" style="margin-bottom: 0;">
		<div class="column txt">
			<span class="min-txt">REMOTA
			<span> EL CONTROL CON</span>
			</span>
			<span class="max-txt"><span id="pre">CANTV</span><span id="fix">ACP</span></span>
		</div>
		<div class="column">
			<img src="https://i.postimg.cc/bYGDj9V7/logo-sumptify-logo-only.png" alt="">
		</div>
	</div>

	<div class="home-container">
		<div class="overlay blue">
			<h3>Controles</h3>
			<p>Aisla tus diferentes presupuestos en Controles.</p>
		</div>
		<div class="overlay blue">
			<h3>Presupuestos</h3>
			<p>Calcula los descuentos de Responsabilidad social automaticamente.</p>
		</div>
		<div class="overlay blue">
			<h3>Gastos</h3>
			<p>Control de gastos para Presupuestos.</p>
		</div>
		<div class="overlay blue">
			<h3>Anticipos</h3>
			<p>Maneja los anticipos de tu empresa.</p>
		</div>
		<div class="overlay blue"><h3>Vue.js</h3><p>Desarrollado con el poderoso Vue.js.</p></div>
		<div class="overlay blue"><h3>CANTVACP</h3></div>
	</div>
	<footer class="footer" style="background: rgb(33,33,33); color: grey;">
  		<div style="text-align: center;">
  			Desarrollado con Amor por <a href="https://arentus.github.io">Mota Robwert</a>
  		</div>
 	</footer>
  </main>

  
</template>


</template>

<script>
  export default {
    name: 'home' 
  }
</script>

<style>
	.home-container > div {
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    padding: 50px;
	    text-align: center;
	    align-items: center;
	    color: darkgrey;
	    transition: all ease .2s;
	    border-radius: 10px;
	} 
	.home-container > div:hover {
		box-shadow: 0px 3px 4px rgba(33,33,33,0.1);
		color: red;
	}
	.home-container > div > h3 {
		font-size: 2em;
	}

	.home-container > div > p {
		font-size: .9rem;
	}
	.home-container > div:nth-child(1n) {
	  background-color: white;	
	  color: grey;
	}

	.home-container {
		display: grid;
		background-color: whitesmoke;
		grid-gap: 15px;
		padding: 15px;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(2, 250px);
	}
		
	@media screen and (max-width: 768px){
		.home-container {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(2, 30%);
		}
	}
	@media screen and (max-width: 500px){
		.home-container {
			grid-template-columns: 1fr;
			padding: 50px;
			grid-template-rows: repeat(6, 200px);
		}
	}
	
	.header{
		background: url('https://cdn.dribbble.com/users/2069402/screenshots/5574718/gif-4mb.gif');
		height: 100%;
		padding: 2% 5%;
		align-items: center;
		text-align: center;
		opacity: 1;
	}
	.txt{
		color: white;
		background: rgba(33,33,33,0.2);
		font-family: 'Lato';
		font-weight: 900;
	}
	.min-txt{ display: inline-block; font-size: 2rem; text-align: right; }
	.medium-txt{ font-size: 3.5rem;  }
	.max-txt{ font-size: 5rem; font-weight: 900; padding: 10px;  }
	#pre{
		color: #53dd6c;
	}
	#fix{
		color: #272838;
	}


	.overlay {
	  position: relative;
	}

	.overlay:after {
	  position: absolute;
	  content:"";
	  top:0;
	  left:0;
	  width:100%;
	  height:100%;
	  opacity: 0;
	  transition: all ease .4s;
	}
	
	.red:after {
	  background-color: red;
	}

	.blue:after {
	  background-color: blue;
	}

	.green:after {
	  background-color: #53dd6c;
	}

	.orange:after {
	  background-color: orange;
	}

</style>


