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
			<h2>For Developers</h2>
			<div
				class="
					col-span-full
					prose prose-discord
					dark:prose-light
					lg:prose-lg
					mx-auto
					w-full
					max-w-3xl sm:mx-auto px-8 sm:px-16 flex flex-col gap-2 md:px-12
				"
			>
				<a
					href="https://viscoin.github.io/viscoin/"
					class="
						bg-gray-200
						text-gray-800
						hover:bg-gray-300
						hover:text-black
						dark:bg-gray-800
						dark:text-gray-200
						dark:hover:bg-gray-900
						dark:hover:text-white

						flex
						justify-center

						rounded-md
						py-2
						px-3
						items-center
						text-sm
						font-semibold
						focus:outline-none
						focus-visible:ring-1 focus:ring-white dark:focus:ring-black
					"
					target="_blank"
					rel="noopener"
				>
					<span class="mr-2">Open Viscoin Documentation</span><heroicons-outline-external-link class="h-5 w-5" />
				</a>
				<a
					href="https://viscoin.github.io/bot/"
					class="
						bg-gray-200
						text-gray-800
						hover:bg-gray-300
						hover:text-black
						dark:bg-gray-800
						dark:text-gray-200
						dark:hover:bg-gray-900
						dark:hover:text-white

						flex
						justify-center

						rounded-md
						py-2
						px-3
						items-center
						text-sm
						font-semibold
						focus:outline-none
						focus-visible:ring-1 focus:ring-white dark:focus:ring-black
					"
					target="_blank"
					rel="noopener"
				>
					<span class="mr-2">Open Bot Documentation</span><heroicons-outline-external-link class="h-5 w-5" />
				</a>
			</div>
			<h2>Requirements</h2>
			<ul>
				<li><a href="https://nodejs.org/">NodeJS</a> - Gallium (version 16.x)</li>
				<li><a href="https://git-scm.com/">Git</a> - (optional)</li>
				<li><a href="https://www.torproject.org/">Tor</a> - (optional)</li>
			</ul>
			<h2>Installation</h2>
			<p>
				<h4>Step 1.</h4>
				Download the <a href="https://github.com/viscoin/viscoin">official source code for Viscoin</a>.
				<Codeblock lang="bash" code="git clone https://github.com/viscoin/viscoin"/>
				<h4>Step 2.</h4>
				Change directory into viscoin.
				<Codeblock lang="bash" code="cd viscoin"/>
				<h4>Step 3.</h4>
				Install npm packages and compile typescript.
				<Codeblock lang="bash" code="npm run setup"/>
			</p>
			<h2>Configuration</h2>
			<p>
				Create a <span class="font-bold">.env</span> file in the root of the project.
				<Codeblock lang="js" code='HTTP_API=:80
TCP_API=:9332
TCP_NODE=:9333
USE_PROXY=0
ONION_ADDRESS=
DEBUG=0
ADDRESS=your_mining_address'/>
			</p>
			<h3>Wallet</h3>
			<p>
				If you are not hosting a Fullnode on localhost you will need to change the IP-address for the API endpoints to something that works.
				<br>
				<span class="italic">Example if there was a Fullnode running on <span class="font-bold">192.168.0.12</span>.</span>
				<Codeblock lang="js" code='HTTP_API=192.168.0.12:80'/>
			</p>
			<h3>Miner</h3>
			<p>
				Replace <span class="font-bold">your_mining_address</span> with your own Viscoin address,
				if you haven't already created a wallet you can do it <a href="https://viscoin.net/#/wallet">here</a>.
				<br>
				<span class="italic">Example if your address was <span class="font-bold">APnd76ffhVQDsHyjwJj4SfD5TFy4Dgje8</span>.</span>
				<Codeblock lang="js" code='ADDRESS=APnd76ffhVQDsHyjwJj4SfD5TFy4Dgje8'/>
			</p>
			<p>
				If you are not hosting a Fullnode on localhost you will need to change the IP-address for the API endpoints to something that works.
				<br>
				<span class="italic">Example if there was a Fullnode running on <span class="font-bold">192.168.0.12</span>.</span>
				<Codeblock lang="js" code='HTTP_API=192.168.0.12:80
TCP_API=192.168.0.12:9332'/>
			</p>
			<p>
				If you want additional logs you can increase the numerical value of <span class="font-bold">DEBUG</span> (0 - 5).
				<br>
				<span class="italic">Example if you want to see your hashrate in the miner.</span>
				<Codeblock lang="js" code='DEBUG=1'/>
			</p>
			<h3>Fullnode</h3>
			<p>
				Optional. Configure which addresses and ports servers should bind to.
				<Codeblock lang="js" code='HTTP_API=host:port
TCP_API=host:port
TCP_NODE=host:port'/>
			</p>
			<p>
				If you want additional logs you can increase the numerical value of <span class="font-bold">DEBUG</span> (0 - 5).
				<br>
				<span class="italic">Example if you want to see when new blocks are accepted.</span>
				<Codeblock lang="js" code='DEBUG=2'/>
			</p>
			<h4>Tor hidden service</h4>
			<p>
				It is <span class="font-bold">not</span> required to use Tor as a proxy but it is <span class="font-bold">recommended</span>.
				<br>
				To use Tor as a proxy simply enable <span class="font-bold">USE_PROXY</span> like so.
				<Codeblock lang="js" code='USE_PROXY=1'/>
				Running a hidden service makes it possible for other nodes to connect to your node without any port forwarding.
				This is ideal if you want to host a fullnode on a computer at home.
			</p>
			<p>
				To make Viscoin a hidden service you need to first configure your <span class="font-bold italic">/etc/tor/torrc</span> file.
				<Codeblock lang="js" code='HiddenServiceDir /var/lib/tor/viscoin-service/
HiddenServicePort 9333 127.0.0.1:9333'/>
				Restart Tor...
			</p>
			<p>
				After you have restarted Tor you can find your onion address in <span class="font-bold italic">/var/lib/tor/viscoin-service/hostname</span>.
				<br>
				Paste your onion address as shown below.
				<Codeblock lang="js" code='ONION_ADDRESS=XXXXXXXXXXX.onion'/>
			</p>
			<h4>Adding a starting point</h4>
			<p>
				In order for your node to be able to connect to the network we need to give it a starting point.
				<Codeblock lang="bash" code='node net-config'/>
				Select <span class="font-bold">Add</span> then insert addresses to other nodes that are part of the Viscoin network.
				<br>
				Once your node is part of the network it will start discovering other nodes automatically.
			</p>
			<h4>Additional configuration</h4>
			<p>
				Additional configuration can be done in <span class="font-bold italic">./config/settings.json</span>.
			</p>
			<h2>Done!</h2>
		</div>
		<div>
			<h3>Running the Fullnode</h3>
			<p>
				Running the node with <a href="https://www.npmjs.com/package/pm2">pm2</a>.
				<Codeblock lang="bash" code='sudo pm2 start fullnode.js'/>
				Running the node in a docker container.
				<Codeblock lang="bash" code='sudo docker-compose up -d'/>
			</p>
		</div>
		<div>
			<h3>Using the Wallet</h3>
			<Codeblock lang="bash" code='node wallet'/>
			<h3>Running the Miner</h3>
			<Codeblock lang="bash" code='node miner'/>
		</div>
	</div>
</template>
<script setup lang="ts">
</script>