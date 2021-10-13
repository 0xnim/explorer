<template>
	<div
		class="
			prose prose-discord
			dark:prose-light
			lg:prose-lg
			mx-auto
			pb-8
			w-full
			max-w-3xl sm:mx-auto px-8 sm:px-16 flex flex-col gap-2 md:px-12
		"
    >
		<div class="flex justify-between">
			<div class="flex flex-col">
				<h3>Explorer - API tool</h3>
				<p style="font-size: 1rem;">
					This tool aims to make it easier to interact with any Viscoin node's HTTP API.
				</p>
			</div>
			<!-- <button>Get/Post toggle button</button>
			<button @click="transaction = null" v-if="transaction" class="text-green-500">Post</button>
			<button v-else class="text-gray-200">Get</button> -->
			<div class="flex flex-col align-center justify-center">
				<ToggleButton :defaultState=post_get labelEnableText="POST" labelDisableText="GET"
					v-on:change="toggle_post_get" />
			</div>
		</div>
		<div style="font-size: 0.8rem;">
			{{ post_get ? 'Post data' : 'Search query' }},
			<a v-if=post_get target="_blank" href="https://github.com/viscoin/viscoin/blob/main/config/settings.json#L55&L56">Post References</a>
			<a v-else target="_blank" href="https://github.com/viscoin/viscoin/blob/main/config/settings.json#L43&L52">Get References</a>
		</div>
		<input
			class="
				bg-gray-200
				text-gray-800
				hover:bg-gray-300
				hover:text-black
				dark:bg-gray-800
				dark:text-gray-200
				dark:hover:bg-gray-900
				dark:hover:text-white
				mb-6
			"
			type="text" v-model=search :placeholder="post_get ? 'Enter transaction JSON here...' : 'block, peers, block/123, balance/address'">
		<div
			v-if="!post_get"
			class="
				prose prose-discord
				dark:prose-light
				lg:prose-lg
				px-6
				mx-auto
				pb-8
				w-full
				grid gap-y-5 gap-x-10 max-w-7xl
				grid-cols-1
				sm:grid-cols-2
				xl:grid-cols-3
			">
			<a
				v-for="node in nodes"
				:href="'http://' + node + '/' + search + '?b=1'"
				target="_blank"
				rel="noopener"
				class="mx-auto"
			>
				<Button
					class="w-40
            overflow-x-auto custom-scroll"
					:text="node" />
			</a>
			<!-- <h2>Fetch</h2>
			<div
				v-for="node in nodes"
				class="mx-auto"
			>
				<Button
					@click="get(node)"
					class="max-w-screen-sm"
					:text=node />
			</div> -->
		</div>
		<div
			v-if="post_get"
			class="
				prose prose-discord
				dark:prose-light
				lg:prose-lg
				px-6
				mx-auto
				pb-8
				w-full
				grid gap-y-5 gap-x-10 max-w-7xl
				grid-cols-1
				sm:grid-cols-2
				xl:grid-cols-3
			"
		>
			<div
				v-for="node in nodes"
				class="mx-auto"
			>
				<Button
					@click="post_transaction(node)"
					class="w-40
            overflow-x-auto custom-scroll"
					:text="node" />
			</div>
			<!-- <form v-if="transaction" @submit="submit" v-for="node in nodes" target="_blank" rel="noopener" :action="'http://' + node + '/transaction'" method="post">
				<input class="hidden" type="text" name="from" :value=transaction.from>
				<input class="hidden" type="text" name="to" :value=transaction.to>
				<input class="hidden" type="text" name="amount" :value=transaction.amount>
				<input class="hidden" type="text" name="timestmap" :value=transaction.timestmap>
				<input class="hidden" type="text" name="minerFee" :value=transaction.minerFee>
				<input class="hidden" type="text" name="signature" :value=transaction.signature>
				<input class="hidden" type="text" name="recoveryParam" :value=transaction.recoveryParam>
				<Button
					class="max-w-screen-sm"
					:text=node />
			</form> -->
		</div>
		<div style="font-size: .8rem;">
			IP-address of Viscoin HTTP API
		</div>
		<input
			class="
				bg-gray-200
				text-gray-800
				hover:bg-gray-300
				hover:text-black
				dark:bg-gray-800
				dark:text-gray-200
				dark:hover:bg-gray-900
				dark:hover:text-white
				mb-6
			"
			type="text" v-model="node_input" placeholder="0.0.0.0/0, 192.168.0.0/24, XXXXXXXXXXX.onion">
		<div
			class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex gap-10 mb-40 md:px-12
			justify-center"
			style="user-select: none;"
		>
			<Button
				@click="remove_node"
				text="Remove" />
			<Button
				@click="add_node"
				text="Add" />
		</div>
		<div
        v-if=error>
            <h3>Error</h3>
            <p>{{error}}</p>
        </div>
		<div
        v-else-if=res>
            <h3>Response</h3>
            <p>{{res}}</p>
        </div>
    </div>
</template>
<script>
export default {
	data() {
		return {
			nodes: [],
            search: this.$route.query.search || '',
			post_get: false,
			res: '',
			error: ''
		}
	},
	methods: {
		add_node() {
			if (!this.node_input) return
			if (this.nodes.includes(this.node_input)) return
			this.nodes.push(this.node_input)
			this.node_input = ''
		},
		remove_node() {
			this.nodes = this.nodes.filter(e => e !== this.node_input)
		},
		submit(e) {
			console.log(e)
		},
		toggle_post_get(e) {
			if (typeof e !== 'boolean') return
			console.log('toggle', e)
			this.post_get = e
		},
		// open_new_window(e) {
		// 	console.log('click'); window.open('http://' + e, '_blank')
		// },
		// get(node) {
		// 	this.error = ''
		// 	this.res = ''
		// 	fetch('http://' + node + '/' + this.search, {
		// 		// mode: 'no-cors',
		// 		headers: {
		// 			'Accept': '*',
		// 			'Access-Control-Allow-Origin': '*'
		// 		}
		// 	})
		// 	// .then(res => console.log(res))
		// 	.then(res => res.json()).then(data => console.log(data))
		// 	// .then(res => res.json()).then(data => this.res = data).catch(err => this.error = err)
		// },
		post_transaction(node) {
			const mini = Transaction.minify(this.transaction)
			this.error = ''
			this.res = ''
			// fetch('http://' + node + '/transaction', {
			// 	method: 'post',
			// 	mode: 'no-cors',
			// 	headers: {
			// 		'Content-Type': 'application/x-www-form-urlencoded'
			// 	},
			// 	body: new URLSearchParams(mini).toString()
			// }).then(res => res.json()).then(data => this.res = data).catch(err => this.error = err)
			const form = document.createElement('form')
			form.style.visibility = 'hidden'
			document.body.appendChild(form)
			form.action = 'http://' + node + '/transaction'
			form.method = 'post'
			form.target = '_blank'
			for (const i in mini) {
				const input = document.createElement('input')
				input.name = i
				input.value = mini[i]
				form.appendChild(input)
			}
			form.submit()
			form.remove()
		}
	},
	mounted() {
		if (localStorage.nodes) {
			this.nodes = JSON.parse(localStorage.nodes)
		}
		try {
			this.transaction = JSON.parse(this.search)
			for (const i in this.transaction) {
				if (typeof this.transaction[i] === 'object') this.transaction[i] = Buffer.from(this.transaction[i]).toString('binary')
			}
			this.post_get = true
		}
		catch {}
	},
	watch: {
		nodes: {
			handler(new_nodes) {
				localStorage.nodes = JSON.stringify(new_nodes)
			},
			deep: true
		}
	}
}
</script>