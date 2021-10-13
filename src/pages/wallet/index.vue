<template>
	<!-- <div class="bg-blueGray-500 md:py-10 flex justify-content-center">
		<div class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex gap-10 py-10 md:px-12">
		</div>
	</div> -->
	<div
		v-if="!wallets.length && !show_import"
		class="
			prose prose-discord
			dark:prose-light
			lg:prose-lg
			px-6
			mx-auto
			pb-8
			w-full
		"
	>
		<div
			class="max-w-3xl sm:mx-auto px-8 sm:px-16 flex flex-col gap-2 md:px-12">
			<h2>
				Viscoin wallet
			</h2>
			<p>
				This is a browser based Viscoin wallet which means
				your private keys are stored in localStorage in your browser.
				A hacker could steal your private keys if they
				get access to your computer since localStorage is not encrypted.
			</p>
			<p>
				The best way to store your private keys
				is by using the official built in Viscoin wallet
				found in Viscoin source code since it has a built in encryption feature.
			</p>
			<h3>Get started</h3>
			<p>
				Create a new wallet by clicking Generate.
				You can also choose import an existing wallet by clicking Import.
			</p>
		</div>
		<!-- <div
			v-if="wallets.length && !show_import"
		>
			<h2>
				<img src="../../../public/logo.svg" class="xl:hidden inline w-8 lg:w-12" alt="">
				<span class="ml-2 lg:ml-3">Viscoin wallet</span>
			</h2>
		</div>
		<div v-if="wallets.length && !show_import">
			<h2>
				<img src="../../../public/logo.svg" class="xl:inline hidden w-12 float-right" alt="">
			</h2>
		</div> -->
		<!-- <router-link
			to="/wallet"
			class="
				text-gray-200
				hover:bg-blueGray-700 hover:text-white
				rounded-md
				py-2
				px-3
				inline-flex
				items-center
				text-sm
				font-semibold
				focus:outline-none
				focus-visible:ring-1 focus-visible:ring-white
			"
			active-class="bg-blueGray-600"
		>
			Wallet
		</router-link> -->
	</div>
	<div
		v-if="wallets.length && !show_import"
		class="
			xl:grid xl:-grid-cols-3 xl:gap-x-12 xl:max-w-7xl
			max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 py-10 md:px-12
		"
	>
		<WalletAddress
			v-for="wallet in wallets"
			title="address (public)"
			class="max-w-screen-sm" :address=wallet.address />
	</div>
	<div style="user-select: none;" class="mb-20">
		<div
			v-if="!show_import"
			class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex gap-10 pt-10 md:px-12
			justify-center"
		>
			<router-link to="/wallet/import">
				<Button
					text="Import" />
			</router-link>
			<Button
				@click="generate_wallet"
				text="Generate" />
			<!-- <Button
				@click="export_wallets"
				text="Export" /> -->
		</div>
		<div
			v-if="!show_import && wallets.length"
			class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex gap-10 py-5 md:px-12
			justify-center"
		>
			<Button
				@click="export_wallets"
				text="Save Wallet .json" />
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			wallets: [],
			open_wallet: null,
			show_key: false,
			show_send: false,
			show_receive: false
		}
	},
	methods: {
		export_wallets() {
			this.download('viscoin.net.json', JSON.stringify(this.wallets, null, 4))
		},
		download(filename, text) {
			const element = document.createElement('a')
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
			element.setAttribute('download', filename)
			element.style.display = 'none'
			document.body.appendChild(element)
			element.click()
			document.body.removeChild(element)
		},
		generate_wallet() {
			const key_buffer = keygen()
			const address_v1 = addressFromPublicKey(publicKeyFromPrivateKey(key_buffer))
			const address_v2 = Address.convertToChecksumAddress(address_v1)
			const key = base58.encode(key_buffer)
			const address = base58.encode(address_v2)
			if (this.wallets.find(e => e.key === key)) return
			this.wallets.push({ key, address })
		},
		open(wallet) {
			if (this.open_wallet?.key === wallet.key) this.open_wallet = null
			else this.open_wallet = wallet
			this.show_key = false
		},
		del(wallet) {
			this.wallets = this.wallets.filter(e => e.key !== wallet.key)
			this.open_wallet = null
		}
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