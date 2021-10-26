<template>
</template>
<script>
export default {
	mounted() {
		try {
			const transaction = new Transaction(JSON.parse(this.$route.params.search))
			this.$router.replace('/transaction/' + this.$route.params.search)
		}
		catch {
			this.$router.replace('/explorer/' + this.$route.params.search)
		}
	}
}
</script>