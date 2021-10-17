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
			<h1 v-if="!search_result_json?.data" class="text-center pt-20">Vis.gg</h1>
			<h2 v-if="!search_result_json?.data" class="text-center">Blockchain explorer</h2>
			<Searchbar />
			<div class="mt-10">
				<router-link to="/search/latest">
					<Button text="latest block" />
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
</script>