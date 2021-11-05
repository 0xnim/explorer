<template>
</template>
<script>
export default {
	mounted() {
		try {
			if (this.$route.params.search.startsWith('TX_')) this.$router.replace('/transaction/' + this.$route.params.search)
		}
		catch {
			this.$router.replace('/explorer/' + this.$route.params.search)
		}
	}
}
</script>