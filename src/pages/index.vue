<template>
	<div class="bg-gradient-to-br from-vis-purple-1 via-vis-purple-2 to-vis-purple-3 md:py-10">
		<div class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 md:px-12">
			<Logo class="filter drop-shadow-lg w-60 mx-auto" />
		</div>
	</div>
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
			<!-- <h1 class="text-center pt-20">Vis.gg</h1> -->
			<h2 class="text-center">Viscoin - Explorer</h2>
			<!-- <h2 class="flex justify-center gap-2">
				<span>Viscoin</span>
				<span>-</span>
				<span>Block explorer</span>
			</h2> -->
			<!-- <h2 class="text-center">for Viscoin</h2> -->
			<Searchbar />
			<div class="mt-10 text-center" v-if="latest">
				Latest block: <router-link to="/search/latest">{{ latest.height }}</router-link>
			</div>
			<!-- <div class="mt-10 flex justify-center" v-if="latest">
				<router-link to="/search/latest">
					<Button :text="'Latest block: ' + latest.height" />
				</router-link>
			</div> -->
			<!-- <p class="text-center">Data provided by <a href="https://vis.gg">Vis.gg</a>.</p> -->
			<!-- <div class="mt-10">
				Example:
				<br>
				latest | 12345 | 74Y8Dj15zmKqohNXfX1uDMLi8tEz3Qp3k
			</div> -->
			<!-- <div class="mt-10">
				<router-link to="/search/latest">
					<Button text="latest block" />
				</router-link>
			</div> -->
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			latest: null
		}
	},
	mounted() {
		document.title = 'Vis.gg - Explorer'
		fetch('/api/search?q=latest').then(res => {
			res.json().then(data => {
				console.log(data)
				this.latest = data.data
			}).catch(err => {})
		})
	}
}
</script>