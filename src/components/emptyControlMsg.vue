<template>
	<div class="empty-budgets-msg">
		<b-icon icon="ghost"></b-icon>
		<h1 >{{msg}}</h1>
	</div>
</template>

<script>
	
	export default {
		name: 'EmptyControlMsg',
		props: ['msg']
	}
</script>


<style>
	
	.empty-budgets-msg{
		width: 100%; text-align: center; font-size: 2.4rem;
	}

</style>