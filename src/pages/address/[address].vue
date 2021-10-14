<template>
	<div class="
		max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 py-10 md:px-12
	">
		{{ this.address }}
	</div>
</template>
<script>
export default {
	data() {
		return {
            address: this.$route.params.address,
		}
	}
}
</script>