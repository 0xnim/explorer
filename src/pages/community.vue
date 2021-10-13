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
		<div class="col-span-full mx-auto">
            <h3>Discord Community</h3>
            <p>
				We have a great community on Discord where you can share ideas about Viscoin, discuss topics and get support.
                In this server you can also use the community made Discord Bot for Viscoin to interact with the blockchain and play games.
			</p>
			<Discord />
            <h3>Community made Discord Bot</h3>
            <p>
                The community made <a href="https://github.com/viscoin/bot">Discord Bot for Viscoin</a> is a project that aims to improve useability of Viscoin.
                It does so by making it easier to interact with the blockchain such as retreiving balances of addresses, looking up blocks and also getting a live feed of newly mined blocks.
            </p>
            <h4>Inviting the bot</h4>
            <p>
                You can invite the bot to your server with <a href="https://discord.com/oauth2/authorize?client_id=882996296720449586&scope=bot&permissions=52288">this invite url</a>.
            </p>
            <h4>Hosting the bot</h4>
            <p>
                You can download make edits and host the bot on your own if you want to. The github repository for the bot can be found <a href="https://github.com/viscoin/bot">here</a>.
            </p>
		</div>
	</div>
</template>
<script setup lang="ts">
</script>