<template>
    <input
        v-model=search_value
        ref="search"
        v-on:input="search"
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
        type="text" placeholder="Search addresses and blocks... or paste a transaction">
</template>
<script>
export default {
	data() {
		return {
			search_value: this.$route.params.search
		}
	},
	methods: {
		search() {
            clearTimeout(this.timer)
            let delay = 250
            this.timer = setTimeout(() => {
                if (this.search_value) this.$router.push('/search/' + this.search_value)
                else this.$router.push('/')
            }, delay)
		}
	},
	mounted() {
		this.$refs.search.focus()
	}
}
</script>