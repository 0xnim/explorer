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
				@keydown="search(search_value)"
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
				type="text" :v-bind=search_value placeholder="Search for transactions, addresses, blocks and embedded text data...">
			<Button text="sdf" @click=search />
			<Logo class="filter drop-shadow-lg w-80 mx-auto" />
		</div>
	</div>
</template>
<script setup lang="ts">
export default {
	data() {
		return {
            block: this.$route.params.block,
			search_value: ''
		}
	},
	methods: {
		search: (search_value) => {
			console.log('search')
			fetch('/block').then(res => {
				res.json().then(data => console.log(data))
			})
		}
	}
}
</script>