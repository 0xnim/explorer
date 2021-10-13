<template>
	<div class="bg-gradient-to-br from-viscoin-blue-1 via-viscoin-blue-2 to-viscoin-blue-3 md:py-10">
		<div class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 md:px-12">
			<Logo class="filter drop-shadow-lg w-60 mx-auto" />
		</div>
	</div>
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
			<h2>Viscoin</h2>
			<p>
				Viscoin is an experimental digital currency that enables instant payments to anyone, anywhere in the world. Viscoin uses peer-to-peer technology to operate with no central authority: managing transactions and issuing money are carried out collectively by the network.
			</p>
			<div class="flex justify-center gap-10 mb-10">
				<router-link
					to="/explorer"
				>
					<Button text="Open Explorer" />
				</router-link>
				<router-link
					to="/wallet"
				>
					<Button text="Open Wallet" />
				</router-link>
			</div>
			<h3>You own your money</h3>
			<p>
				Start sending and receiving Viscoin today. Creating a wallet is as easy as rolling a dice, quite literally. A wallet can be generated offline. Be your own bank. Chargebacks are a thing of the past. No need for middlemen. Tap into the global market at the speed of light.
			</p>
			<h3>Mining</h3>
			<p>
				Help secure the blockchain by mining. The Viscoin mining algorithm uses argon2d. Argon2 is a key derivation function that was selected as the winner of the Password Hashing Competition in July 2015. Argon2d maximizes resistance to GPU cracking attacks. Viscoin is an ASIC resistant coin, designed to be mined on regular computers.
			</p>
			<h3>Hosting</h3>
			<p>
				Become a part of the network by hosting a node. By hosting a public node you help protect the network against denial of service attacks. You also contribute to the decentralization by keeping a copy of the blockchain.
			</p>
			<h3>Source code</h3>
			<p>
				Viscoin source code is 100% Typescript. Viscoin has a target block time of 1 minute. Every time a block is mined the miner is rewarded with 1000 ℣ newly generated coins + transaction fees from all the transactions in the block. The difficulty is adjusted every time a block is mined.
			</p>
			<router-link
				to="/docs"
			>
				<Button class="mx-auto" text="Documentation" />
			</router-link>
		</div>
		<div>
			<h2>Why?</h2>
			<ul>
				<li>Decentralized blockchain</li>
				<li><a href="https://nodejs.org/">NodeJS</a> runtime environment</li>
				<li>Source code written in <a href="https://www.typescriptlang.org/">Typescript</a></li>
				<li><a href="https://en.wikipedia.org/wiki/Argon2">Argon2</a> ASIC resistant mining algorithm</li>
				<li>Easy to implement in your project</li>
			</ul>
		</div>
		<div>
			<h2>Statistics</h2>
			<Stats />
			<p class="text-center">... and growing!</p>
		</div>
	</div>
</template>
<script setup lang="ts">
</script>