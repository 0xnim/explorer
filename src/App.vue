<template>
	<div class="min-h-full grid grid-layout">
		<Navbar />
		<div id="container" class="grid grid-layout-container custom-scroll">
			<div class="bg-white dark:bg-gray-900">
				<router-view />
			</div>
			<Footer />
		</div>
	</div>
	<SWBanner />
</template>
<script setup lang="ts">
	import { useStore } from './store';
	const store = useStore();
	void store.dispatch('fetchStats');
</script>
<style>
	.grid-layout {
		grid-template-rows: auto 1fr;
	}
	.grid-layout-container {
		grid-template-rows: 1fr auto;
	}
</style>