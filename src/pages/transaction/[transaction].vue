<template>
    <div
        class="
			prose prose-discord
			dark:prose-light
			lg:prose-lg
			mx-auto
			pb-8
			w-full
            flex
            flex-col
            mt-8 px-2
		"
        v-if="transaction"
    >
        <div v-if="typeof valid === 'bigint'" class="flex flex-col">
            <h3>
                <span class="text-green-500" v-if="valid === 0n">Valid Transaction</span>
                <span class="text-red-500" v-else>Invalid Transaction</span>
            </h3>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.from"><strong>From</strong><span>{{ Address.toString(transaction.from) }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.to"><strong>To</strong><span>{{ Address.toString(transaction.to) }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.amount"><strong>Amount</strong><span>{{ transaction.amount }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.minerFee"><strong>Miner Fee</strong><span>{{ transaction.minerFee }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.timestamp"><strong>Signed</strong><span>{{ (new Date(transaction.timestamp)).toLocaleString() }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.signature"><strong>Signature</strong><span>{{ transaction.signature.toString('hex').slice(0, 16) }}...{{ transaction.signature.toString('hex').slice(-12) }}</span></div>
        </div>
        <div v-if="response !== null">
            <h3 v-if="response === '0x0'">
                <span class="text-green-500">Success</span>
            </h3>
            <h3 v-else>
                <span class="text-red-500">Failed with code: {{ response }}</span>
            </h3>
        </div>
        <Button v-else-if="!valid" style="user-select: none;" class="mt-8" @click="send" text="Send" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            transaction: null,
            Address,
            valid: null,
            response: null
        }
    },
    methods: {
        send() {
            fetch('/api/transaction', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(Transaction.minify(this.transaction))
            }).then(res => {
                res.json().then(data => {
                    console.log(data)
                    this.response = data
                })
            })
        }
    },
	mounted() {
		try {
            const buf = Buffer.from(this.$route.params.transaction.slice(3), 'hex')
            const str = buf.toString('utf8')
            const object = JSON.parse(str)
            this.transaction = Transaction.spawn(object)
            this.valid = this.transaction.isValid()
		}
		catch (err) {
            console.log(err)
        }
	}
}
</script>