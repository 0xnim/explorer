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
		">
		<div>
            <h2>Import wallet</h2>
		</div>
		<input
            @keydown="import_wallet"
			class="
				bg-gray-200
				text-gray-800
				hover:bg-gray-300
				hover:text-black
				dark:bg-gray-800
				dark:text-gray-200
				dark:hover:bg-gray-900
				dark:hover:text-white
			"
			type="text" v-model="key" placeholder="Enter private key...">
        <div
			class="
				mx-auto
				mt-10
                flex
                gap-10
			"
			style="user-select: none;"
		>
			<Button
                @click="import_wallet"
                text="Import" />
            <router-link to="/wallet">
                <Button
                    text="Cancel" />
            </router-link>
		</div>
        <div
        v-if=error>
            <h3>Error</h3>
            <p>{{error}}</p>
        </div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			wallets: [],
            error: false,
			key: ''
		}
	},
	methods: {
        import_wallet(e) {
			if (e.type === 'keydown' && e.key !== 'Enter') return
			try {
				const key_buffer = base58.decode(this.key)
				const address_v1 = addressFromPublicKey(publicKeyFromPrivateKey(key_buffer))
				const address_v2 = Address.convertToChecksumAddress(address_v1)
				const key = base58.encode(key_buffer)
				const address = base58.encode(address_v2)
				if (this.wallets.find(e => e.key === key)) {
					throw new Error('Wallet already exists')
				}
				this.wallets.push({ key, address })
				this.$router.push('/wallet/' + address)
			}
			catch (err) {
                this.error = err
            }
		},
	},
	mounted() {
		if (localStorage.keys) {
			this.wallets = JSON.parse(localStorage.keys).map(key => {
				const key_buffer = base58.decode(key)
				const address_v1 = addressFromPublicKey(publicKeyFromPrivateKey(key_buffer))
				const address_v2 = Address.convertToChecksumAddress(address_v1)
				const address = base58.encode(address_v2)
				return { key, address }
			})
		}
		if (this.$route.query.key) {
			this.key = this.$route.query.key
		}
	},
	watch: {
		wallets: {
			handler(new_wallets) {
				localStorage.keys = JSON.stringify(new_wallets.map(e => e = e.key))
			},
			deep: true
		}
	}
}
</script>