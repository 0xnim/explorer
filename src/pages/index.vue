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
			<h1 class="text-center pt-20">Vis.gg</h1>
			<!-- <a href="https://vis.gg">
				<h1 class="text-center pt-20">Vis.gg</h1>
			</a> -->
			<h2>Blockchain explorer</h2>
			<!-- <p>
				Explore data stored on Viscoin
			</p> -->
			<input
				@keydown="import_wallet"
				class="
					w-full
					bg-gray-200
					text-gray-800
					hover:bg-gray-300
					hover:text-black
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-900
					dark:hover:text-white
				"
				type="text" v-model="key" placeholder="Search for transactions, addresses, blocks and embedded text data...">
			<Logo class="filter drop-shadow-lg w-80 mx-auto" />
		</div>
	</div>
</template>
<script setup lang="ts">
</script>