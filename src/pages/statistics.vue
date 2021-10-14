<template>
	<div
		class="
			prose prose-discord
			dark:prose-light
			lg:prose-lg
			px-6
			mx-auto
			pb-8
			w-full
			xl:grid xl:grid-cols-2 xl:gap-x-12 xl:max-w-7xl
		"
	>
		<div class="col-span-full">
            Data
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
            block: this.$route.params.block,
			search_value: '',
			search_result_json: null
		}
	},
	methods: {
		search(e) {
			// if (e.key !== 'Enter') return
			setTimeout(() => {
				fetch('/api/search?q=' + this.search_value).then(res => {
					console.log(res)
					res.json().then(data => {
						console.log(data)
						this.search_result_json = data
					}).catch(err => {
						this.search_result_json = {}
					})
				})
			}, 250)
		}
	},
	mounted() {
		this.$refs.search.focus()
		this.$refs.search.select()
	}
}
</script>