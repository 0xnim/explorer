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
            <h1 class="text-center pt-20">Vis.gg</h1>
			<h2 class="text-center">Statistics</h2>
            <div class="overflow-hidden mt-8 px-2">
                <h3>Top 10 addresses</h3>
                <ul v-if="addresses">
                    <li v-for="address in addresses" class="flex xl:flex-row flex-col justify-between px-2 rounded hover:bg-gray-200 dark:hover:bg-black">
                        <router-link :to="'/search/' + address[0]">{{ address[0] }}</router-link>
                        <span>{{ address[1] }}</span>
                    </li>
                </ul>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			addresses: null
		}
	},
	mounted() {
		fetch('/api/addresses').then(res => {
            res.json().then(data => {
                this.addresses = data
            }).catch(err => console.log(err))
        })
	}
}
</script>