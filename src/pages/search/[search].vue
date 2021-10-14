<template>
</template>
<script>
export default {
	mounted() {
		this.$router.replace('/explorer/' + this.$route.params.search)
	}
}
</script>