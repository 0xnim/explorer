<template>
	<div
		class="
			prose prose-discord
			dark:prose-light
			lg:prose-lg
			mx-auto
			pb-8
			w-full
			xl:grid xl:grid-cols-2 xl:gap-x-12 xl:max-w-7xl
		"
	>
		<div class="col-span-full overflow-hidden">
			<div class="overflow-hidden mt-8 px-2" v-if="search_result_json">
				<h4 class="hidden sm:flex">{{ search_value }}</h4>
				<h4 class="sm:hidden">{{ search_value.slice(0, 33) }}{{ search_value.length > 33 ? '...' : '' }}</h4>
				<div v-if="search_result_json.type === 'block'">
					<h3>Block</h3>
					<ul>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Mined</strong>
							<span>{{ new Date(search_result_json.data.timestamp).toLocaleString() }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Height</strong>
							<router-link :to="'/search/' + search_result_json.data.height">{{ search_result_json.data.height }}</router-link>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Hash</strong>
							<router-link class="hidden sm:flex" :to="'/search/' + search_result_json.data.hash">{{ search_result_json.data.hash }}</router-link>
							<router-link class="sm:hidden" :to="'/search/' + search_result_json.data.hash">{{ search_result_json.data.hash.slice(0, 32) }}...</router-link>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Previous&nbsp;hash</strong>
							<router-link class="hidden sm:flex" :to="'/search/' + search_result_json.data.previousHash">{{ search_result_json.data.previousHash }}</router-link>
							<router-link class="sm:hidden" :to="'/search/' + search_result_json.data.previousHash">{{ search_result_json.data.previousHash.slice(0, 32) }}...</router-link>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Miner</strong>
							<router-link :to="'/search/' + search_result_json.data.transactions[0].to">{{ search_result_json.data.transactions[0].to }}</router-link>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Difficulty</strong>
							<span>{{ search_result_json.data.difficulty }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Approx&nbsp;network&nbsp;hashrate</strong>
							<span>{{ (2**(search_result_json.data.difficulty / 16 + 1) / 60).toPrecision(6) }} H/s</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Nonce</strong>
							<span>{{ search_result_json.data.nonce }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
							<strong>Transactions</strong>
							<span>{{ search_result_json.data.transactions.length }}</span>
						</li>
						<li class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black" v-for="transaction in search_result_json.data.transactions">
							<span>
								<router-link v-if="transaction.from" :to="'/search/' + transaction.from">{{ transaction.from }}</router-link>
								<span v-else>Network</span>
								&nbsp;
								<span class="text-red-600">➟</span>
								&nbsp;
								<span>{{ transaction.amount }}</span>
								&nbsp;
								<span class="text-green-600">➟</span>
								&nbsp;
								<router-link v-if="transaction.to" :to="'/search/' + transaction.to">{{ transaction.to }}</router-link>
								<span v-else>Network</span>
							</span>
							<span v-if="transaction.minerFee">
								<span>{{ transaction.minerFee }}</span>
								&nbsp;
								<span class="text-red-600">➟</span>
								&nbsp;
								<span>Network</span>
							</span>
							<span v-else>Newly generated Coins</span>
						</li>
					</ul>
				</div>
				<div v-else-if="search_result_json.type === 'address'">
					<h3>Address</h3>
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
			search_value: this.$route.params.explorer,
			search_result_json: null
		}
	},
	methods: {
		search() {
			fetch('/api/search?q=' + this.search_value).then(res => {
				console.log(res)
				res.json().then(data => {
					this.search_result_json = data
				}).catch(err => {
					this.search_result_json = {}
				})
			})
		}
	},
	mounted() {
		this.search()
	},
	watch: {
		search_value: {
			handler() {
				this.search()
			}
		}
	}
}
</script>