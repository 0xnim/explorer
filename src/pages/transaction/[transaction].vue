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
        <div v-if="typeof valid === 'number'" class="flex flex-col">
            <h3>
                <span class="text-green-500" v-if="valid === 0">Valid Transaction</span>
                <span class="text-red-500" v-else>Invalid Transaction</span>
            </h3>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.from"><strong>From</strong><span>{{ Address.toString(transaction.from) }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.to"><strong>To</strong><span>{{ Address.toString(transaction.to) }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.amount"><strong>Amount</strong><span>{{ transaction.amount }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.minerFee"><strong>Miner Fee</strong><span>{{ transaction.minerFee }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.timestamp"><strong>Signed</strong><span>{{ (new Date(transaction.timestamp)).toLocaleString() }}</span></div>
            <div class="flex justify-between xl:flex-row flex-col" v-if="transaction.signature"><strong>Signature</strong><span>{{ transaction.signature.toString('hex').slice(0, 16) }}...{{ transaction.signature.toString('hex').slice(-12) }}</span></div>
        </div>
        <div v-if="typeof response === 'number'">
            <h3 v-if="response === 0">
                <span class="text-green-500">Success</span>
            </h3>
            <h3 v-else>
                <span class="text-red-500">Failed with code: {{ response }}</span>
            </h3>
        </div>
        <Button v-else-if="valid === 0" style="user-select: none;" class="mt-8" @click="send" text="Send" />
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
                body: JSON.stringify(this.transaction)
            }).then(res => {
                res.json().then(data => {
                    this.response = data
                })
            })
        }
    },
	mounted() {
		try {
			this.transaction = new Transaction(JSON.parse(this.$route.params.transaction))
            this.valid = this.transaction.isValid()
		}
		catch {}
	}
}
</script>