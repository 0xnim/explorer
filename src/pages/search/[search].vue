<template>
</template>
<script>
export default {
	mounted() {
		try {
			if (this.$route.params.search.startsWith('TX_')) this.$router.replace('/transaction/' + this.$route.params.search)
			else throw new Error()
		}
		catch {
			this.$router.replace('/explorer/' + this.$route.params.search)
		}
	}
}
</script>