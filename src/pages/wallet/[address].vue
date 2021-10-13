<template>
	<div class="
		max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 py-10 md:px-12
	">
		<WalletAddress
			title="address (public)"
			class="max-w-screen-sm
			filter drop-shadow-lg mx-auto" :address=wallet?.address />
			<!-- <Button @click="show_qr_code = !show_qr_code" class="mx-auto" text="QR" /> -->
			<!-- <a :href=qr_url class="w-10 mx-auto" >
				<img @click="show_qr_code = !show_qr_code"
					src="qrcode-solid.svg" alt="">
			</a> -->
			<!-- <Button @click="share" text="Share" class="mx-auto" /> -->
	</div>
	<div
		v-if="wallet"
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
		<h3 v-if="show === ''">Wallet</h3>
		<p v-if="show === ''" style="font-size: 1rem;">
			Here you can send, receive and store Viscoin.
		</p>
		<h3 v-if="show === 'transaction'">Create Transaction</h3>
		<p v-if="show === 'transaction'" style="font-size: 1rem;">
			Create a transaction by filling in the required fields and signing the transaction.
			You can then click Broadcast which will redirect you to the API tool.
		</p>
		<h3 v-if="show === 'private_key'">Private Key</h3>
		<p v-if="show === 'private_key'" style="font-size: 1rem;">
			Your Private Key is sensitive information. Do not share it with anyone unless you want them to be granted full access to the coins on your wallet.
		</p>
		<div style="user-select: none;" class="flex flex-row justify-evenly w-full">
			<Button text="Transaction" v-on:click="show = show === 'transaction' ? show='' : 'transaction'" />
			<!-- <Button text="Receive" v-on:click="show = ''" /> -->
			<router-link :to="'/explorer?search=balance/' + wallet.address">
				<Button
					class="mx-auto"
					text="Balance" />
			</router-link>
			<Button text="Private Key" v-on:click="show = show === 'private_key' ? show='' : 'private_key'" />
		</div>
		<div
			v-if="show==='transaction'"
			class="
				max-w-3xl sm:mx-auto px-8 sm:px-16 flex flex-col py-10 md:px-12
			"
		>
			<label style="font-size: .8rem;" for="address">The base58 address of the recipient.</label>
			<input
				name="address"
				class="
					bg-gray-200
					text-gray-800
					hover:bg-gray-300
					hover:text-black
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-900
					dark:hover:text-white
					mb-10
				"
				v-model=transaction.to
				type="text" placeholder="Enter address...">
			<label style="font-size: .8rem;" for="amount">How much the recipient will receive.</label>
			<input
				name="amount"
				class="
					bg-gray-200
					text-gray-800
					hover:bg-gray-300
					hover:text-black
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-900
					dark:hover:text-white
					mb-10
				"
				v-model=transaction.amount
				type="text" placeholder="Enter amount...">
			<label style="font-size: .8rem;" for="miner-fee">How much the miner will receive.</label>
			<input
				name="miner-fee"
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
				v-model=transaction.miner_fee
				type="text" placeholder="Enter miner fee...">
			<Button
				class="mx-auto mb-10"
				@click="sign_transaction" text="Sign transaction" />
			<textarea
				v-if=transaction_str
				class="
					bg-gray-200
					text-gray-800
					hover:bg-gray-300
					hover:text-black
					dark:bg-gray-800
					dark:text-gray-200
					dark:hover:bg-gray-900
					dark:hover:text-white
					resize-none
					text-xs
					mb-6
				"
				v-model=transaction_str
			name="" id="" cols="30" rows="6"></textarea>
			<router-link target="_blank" v-if=transaction_json :to="'/explorer?search=' + transaction_json">
				<Button
					class="mx-auto"
					text="Broadcast" />
			</router-link>
		</div>
		<div
			v-if="show==='private_key'"
			class="
				max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 py-10 md:px-12
			"
		>
			<div class="flex flex-row justify-center">
				<Button
					class="mx-auto
					hover:bg-red-600
					bg-red-500"
					@click="del" text='Delete' />
				<Button
					class="mx-auto bg-indigo-600 hover:bg-indigo-700"
					@click="show_key = !show_key" :text="show_key ? 'Hide Key' : 'Show Key'" />
			</div>
			<WalletKey
				v-if=show_key
				title="address (public)"
				class="max-w-screen-sm w-60" :private="wallet?.key" />
			<!-- <div v-if="show_key && qr_key" class="flex justify-center mt-6">
				<div class="flex flex-col justify-center center align-center">
					<div style="font-size: 1rem;" class="mx-auto">Scan address QR</div>
					<div style="font-size: .8rem;" class="mx-auto">{{ qr_key }}</div>
				</div>
			</div>
			<div v-if="show_key && qr_key">
				<QRCode :data=qr_key />
			</div> -->
		</div>
		<div v-if="show === '' && qr_address" class="flex justify-center mt-6">
			<div class="flex flex-col justify-center center align-center">
				<div style="font-size: 1rem;" class="mx-auto">Scan address QR</div>
				<div style="font-size: .8rem;" class="mx-auto">{{ qr_address }}</div>
			</div>
		</div>
		<div v-if="show === '' && qr_address" class="flex justify-center">
			<QRCode :data=qr_address />
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
            address: this.$route.params.address,
			wallets: [],
			node_input: '',
			nodes: [],
			show_key: false,
			wallet: null,
			show_qr_code: false,
			transaction: {
				to: this.$route.query.to || '',
				amount: this.$route.query.amount || '',
				miner_fee: ''
			},
			transaction_str: '',
			transaction_json: '',
			show: ''
		}
	},
	methods: {
		sign_transaction() {
			this.transaction_json = null
			try {
				const to = this.transaction.to
				const amount = this.transaction.amount
				const minerFee = this.transaction.miner_fee
				const privateKey = this.wallet.key
				if (!privateKey || !minerFee || !to !== !amount) return this.transaction_str = null
				const transaction = new Transaction({
					to: to === '' ? undefined : Address.toBuffer(to),
					amount: amount === '' ? undefined : beautifyBigInt(parseBigInt(amount)),
					minerFee: beautifyBigInt(parseBigInt(minerFee)),
					timestamp: Date.now()
				})
				transaction.sign(base58.decode(privateKey))
				this.transaction_str = JSON.stringify(transaction)
				this.transaction_json = this.transaction_str
			}
			catch (err) {
				this.transaction_str = err
			}
		},
		del() {
			this.wallets = this.wallets.filter(e => e.address !== this.address)
			this.wallet = null
			this.$router.push('/wallet')
		},
		add_node() {
			if (!this.node_input) return
			if (this.nodes.includes(this.node_input)) return
			this.nodes.push(this.node_input)
			this.node_input = ''
		},
		remove_node() {
			this.nodes = this.nodes.filter(e => e !== this.node_input)
		},
		async share() {
			const data = this.address
			console.log(data)
			const settings = { errorCorrectionLevel: 'H', color: { dark: '000000', light: 'ffffff' } }
			const b64toBlob = (dataURI) => {
				let byteString = atob(dataURI.split(',')[1])
				let ab = new ArrayBuffer(byteString.length)
				let ia = new Uint8Array(ab)
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i)
				}
				return new Blob([ab], { type: 'image/png' })
			}
			const getQRCode = async () => {
				return new File([b64toBlob(await qrcode.toDataURL(data, settings))], 'qrcode.png', { type: 'image/png' })
			}
			window.navigator.share({
                title: 'Send Viscoin',
                url: data,
                files: [
                    await getQRCode()
                ]
            })
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
			this.wallet = this.wallets.find(e => e.address === this.address)
		}
		if (localStorage.nodes) {
			this.nodes = JSON.parse(localStorage.nodes)
		}
		this.qr_address = `${location.origin}/#/wallet?to=${this.wallet?.address}`
		this.qr_key = `${location.origin}/#/wallet/import?key=${this.wallet?.key}`
	},
	watch: {
		wallets: {
			handler(new_wallets) {
				localStorage.keys = JSON.stringify(new_wallets.map(e => e = e.key))
			},
			deep: true
		},
		nodes: {
			handler(new_nodes) {
				localStorage.nodes = JSON.stringify(new_nodes)
			},
			deep: true
		}
	}
}
</script>