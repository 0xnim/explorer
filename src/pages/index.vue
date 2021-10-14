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
			<!-- <a href="https://vis.gg">
				<h1 class="text-center pt-20">Vis.gg</h1>
			</a> -->
			<h2 v-if="!search_result_json?.data">Blockchain explorer</h2>
			<!-- <p>
				Explore data stored on Viscoin
			</p> -->
			<!-- <p>Search</p> -->
			<input
				@focus="$event.target.select()"
				v-model=search_value
				ref="search"
				v-on:input="search"
				class="
					mt-10
					w-full
					bg-gray-200
					text-gray-800
					hover:bg-gray-200
					hover:text-black
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-900
					dark:hover:text-white
				"
				type="text" placeholder="Search for transactions, addresses and blocks...">
			<!-- <Logo class="filter drop-shadow-lg w-80 mx-auto" /> -->
			<div v-if="search_result_json">
				<div v-if="search_result_json.type === 'block'">
					<h4>Block</h4>
					<!-- <ul>
						<li v-for="i of search_result_json.data">
							<div v-if="Array.isArray(i)">
								<ul>
									<li v-for="transaction in i">{{ transaction.from || 'Network' }} → {{ transaction.amount }} → {{ transaction.to || 'Network' }}</li>
								</ul>
							</div>
							<div v-else>{{ i }}</div>
						</li>
					</ul> -->
					<ul class="overflow-hidden">
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Height&nbsp;</strong>
							<span
								class="cursor-pointer"
								@click="search_value = search_result_json.data.height; search()"
							>{{ search_result_json.data.height }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Mined&nbsp;at&nbsp;</strong>
							<span>{{ new Date(search_result_json.data.timestamp).toLocaleString() }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Hash&nbsp;</strong>
							<span
								class="cursor-pointer"
								@click="search_value = search_result_json.data.hash; search()"
							>{{ search_result_json.data.hash }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Previous&nbsp;hash&nbsp;</strong>
							<span
								class="cursor-pointer"
								@click="search_value = search_result_json.data.previousHash; search()"
							>{{ search_result_json.data.previousHash }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Miner&nbsp;</strong>
							<span
								class="cursor-pointer"
								@click="search_value = search_result_json.data.transactions[0].to; search()"
							>{{ search_result_json.data.transactions[0].to }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Difficulty&nbsp;</strong>
							<span>{{ search_result_json.data.difficulty }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Approximated&nbsp;network&nbsp;hashrate&nbsp;when&nbsp;mined</strong>
							<span>{{ (2**(search_result_json.data.difficulty / 16 + 1) / 60).toPrecision(6) }} H/s</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Nonce&nbsp;</strong>
							<span>{{ search_result_json.data.nonce }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Transactions&nbsp;</strong>
							<span>{{ search_result_json.data.transactions.length }}</span>
						</li>
						<li>
							<ul>
								<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black" v-for="transaction in search_result_json.data.transactions">
									<span>{{ transaction.from || 'Network' }}&nbsp;<span class="text-red-600">➟</span>&nbsp;{{ transaction.amount }}&nbsp;<span class="text-green-600">➟</span>&nbsp;{{ transaction.to || 'Network' }}</span>
									<span v-if="transaction.minerFee">{{ transaction.minerFee }}&nbsp;<span class="text-red-600">➟</span>&nbsp;Network&nbsp;</span>
									<span v-else>Newly generated Coins</span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div v-else-if="search_result_json.type === 'address'">
					<h4>Address</h4>
					<ul>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Balance&nbsp;</strong>
							<span>{{ search_result_json.data }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
            block: this.$route.params.block,
			search_value: '',
			search_result_json: null
		}
	},
	methods: {
		search(e) {
			// if (e.key !== 'Enter') return
			setTimeout(() => {
				fetch('/api/search?q=' + this.search_value).then(res => {
					console.log(res)
					res.json().then(data => {
						console.log(data)
						this.search_result_json = data
					}).catch(err => {
						this.search_result_json = {}
					})
				})
			}, 250)
		}
	},
	mounted() {
		this.$refs.search.focus()
		this.$refs.search.select()
	}
}
</script>