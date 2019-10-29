<template>
	<div>

		<b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>

		<b-pagination
			v-on:click.native="fetchBudgetFromPage(current)"
            :total="total"
            :current.sync="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :per-page="byPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
	    </b-pagination>

	</div>
</template>

<script>
	
	export default {
		name: 'Pagination',
		data(){
			return{
                current: 1,
                byPage: this.$props.perPage,
                rangeBefore: 2,
                rangeAfter: 2,
                order: 'is-right',
                size: 'size',
                isLoading: false,
                isFullPage: false
			}
		},
		props: ['total', 'perPage'],
		methods: {
			fetchBudgetFromPage(page){
				console.log('fetching budgets from page '+page);
				this.isLoading = true;
				this.current = page;
				this.$store.dispatch('fetchBudgets',{
					control_id: this.$store.getters.current_control_id,
					currentPage: this.current,
					perPage: this.byPage
				})
				.then(res=>{
					this.isLoading = false;
					console.log(res);
				});
			}
		}
	}
</script>