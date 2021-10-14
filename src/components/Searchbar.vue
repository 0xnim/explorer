<template>
    <input
        v-model=search_value
        ref="search"
        v-on:input="search"
        v-on:keydown="_search"
        class="
            w-full
            bg-gray-200
            text-gray-800
            hover:bg-gray-200
            hover:text-black
            dark:bg-gray-800
            dark:text-gray-200
            dark:hover:bg-gray-900
            dark:hover:text-white
        "
        type="text" placeholder="Search for transactions, addresses and blocks...">
</template>
<script>
export default {
	data() {
		return {
			search_value: this.$route.params.search
		}
	},
	methods: {
        _search(e) {
            if (e.key === 'Enter') this.search()
		},
		search() {
            if (this.search_value) this.$router.push('/search/' + this.search_value)
            else this.$router.push('/')
		}
	},
	mounted() {
		this.$refs.search.focus()
	}
}
</script>