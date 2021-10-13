<template>
	<div class="sticky top-0 z-20">
		<header class="bg-gray-200 dark:bg-gray-800">
			<div class="max-w-7xl mx-auto px-2 sm:px-4 md:flex md:justify-between lg:px-8">
				<nav class="hidden md:flex md:py-2 md:space-x-4 lg:space-x-8" aria-label="Global navigation">
					<router-link
						v-for="link in links.to"
						:to=link.to
						class="
							bg-gray-200
							text-gray-800
							hover:bg-gray-300
							hover:text-black
							dark:bg-gray-800
							dark:text-gray-200
							dark:hover:bg-gray-900
							dark:hover:text-white

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
						{{ link.text }}
					</router-link>
					<a
						v-for="link in links.href"
						:href=link.href
						class="
							bg-gray-200
							text-gray-800
							hover:bg-gray-300
							hover:text-black
							dark:bg-gray-800
							dark:text-gray-200
							dark:hover:bg-gray-900
							dark:hover:text-white

							rounded-md
							py-2
							px-3
							inline-flex
							items-center
							text-sm
							font-semibold
							focus:outline-none
							focus-visible:ring-1 focus:ring-white dark:focus:ring-black
						"
						target="_blank"
						rel="noopener"
					>
						<span class="mr-2">{{ link.text }}</span><heroicons-outline-external-link class="h-5 w-5" />
					</a>
				</nav>
				<div class="relative h-16 flex md:max-w-md md:w-full lg:max-w-lg">
					<div class="relative z-10 flex items-center md:hidden">
						<button
							class="
								bg-gray-200
								text-gray-800
								hover:bg-gray-300
								hover:text-black
								dark:bg-gray-800
								dark:text-gray-200
								dark:hover:bg-gray-900
								dark:hover:text-white

								rounded-md
								p-2
								inline-flex
								items-center
								justify-center
								focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white dark:focus:ring-black
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun
								v-if="!isDarkMode"
								class="fill-current text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white h-6 w-6"
								aria-hidden="true"
							/>
							<heroicons-outline-moon
								v-else
								class="fill-current text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white h-6 w-6"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div class="relative z-0 flex-1 px-2 flex lg:gap-2 items-center justify-center md:justify-end">
						<button
							class="
								bg-gray-200
								text-gray-800
								hover:bg-gray-300
								hover:text-black
								dark:bg-gray-800
								dark:text-gray-200
								dark:hover:bg-gray-900
								dark:hover:text-white

								hidden
								md:block
								rounded-md
								p-2
								focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white dark:focus:ring-black
							"
							:aria-label="`Switch to ${isDarkMode ? 'light theme' : 'dark theme'}`"
							@click="toggleDarkMode()"
						>
							<heroicons-outline-sun
								v-if="!isDarkMode"
								class="fill-current text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white h-6 w-6"
								aria-hidden="true"
							/>
							<heroicons-outline-moon
								v-else
								class="fill-current text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white h-6 w-6"
								aria-hidden="true"
							/>
						</button>
					</div>
					<div class="relative z-10 flex items-center md:hidden">
						<button
							type="button"
							class="
								bg-gray-200
								text-gray-800
								hover:bg-gray-300
								hover:text-black
								dark:bg-gray-800
								dark:text-gray-200
								dark:hover:bg-gray-900
								dark:hover:text-white

								rounded-md
								p-2
								inline-flex
								items-center
								justify-center
								focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white dark:focus:ring-black
							"
							aria-controls="mobile-menu"
							:aria-expanded="isOpen"
							@click="isOpen = !isOpen"
						>
							<span class="sr-only">Open menu</span>
							<heroicons-outline-menu :class="{ hidden: isOpen, block: !isOpen }" aria-hidden="true" />
							<heroicons-outline-x :class="{ block: isOpen, hidden: !isOpen }" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
			<transition
				enter-active-class="transition transform-gpu duration-300 ease-out"
				enter-from-class="translate-x-12 opacity-0"
				enter-to-class="translate-x-0 opacity-100"
			>
				<nav v-if="isOpen" id="mobile-menu" class="md:hidden" aria-label="Global navigation">
					<div class="pt-2 pb-3 px-2 space-y-1">
						<router-link
							v-for="link in links.to"
							:to=link.to
							class="
								bg-gray-200
								text-gray-800
								hover:bg-gray-300
								hover:text-black
								dark:bg-gray-800
								dark:text-gray-200
								dark:hover:bg-gray-900
								dark:hover:text-white

								block
								rounded-md
								py-2
								px-3
								text-base
								font-semibold
							"
							@click="isOpen = !isOpen"
							>
								{{ link.text }}
							</router-link
						>
						<a
							v-for="link in links.href"
							:href=link.href
							class="
								bg-gray-200
								text-gray-800
								hover:bg-gray-300
								hover:text-black
								dark:bg-gray-800
								dark:text-gray-200
								dark:hover:bg-gray-900
								dark:hover:text-white

								block
								rounded-md
								py-2
								px-3
								text-base
								font-semibold
							"
							target="_blank"
							rel="noopener"
							@click="isOpen = !isOpen"
							><span class="mr-2">{{ link.text }}</span><heroicons-outline-external-link class="h-5 w-5 inline-block"
						/></a>
					</div>
				</nav>
			</transition>
		</header>
	</div>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	// import { ref, computed } from 'vue'
	// import { useRoute, useRouter } from 'vue-router'
	import { useBreakpoints, breakpointsTailwind, whenever, onClickOutside } from '@vueuse/core'
	// import { useStore } from '~/store'
	import { isDarkMode, toggleDarkMode } from '~/util/darkMode'
	// const router = useRouter()
	// const route = useRoute()
	// const store = useStore()
	const breakpoints = useBreakpoints(breakpointsTailwind)
	const lgAndLarger = breakpoints.greater('md')
	const isOpen = ref(false)
	const searchElement = ref()
	const isSearchOpen = ref(false)
	const searchScrollPosition = ref(-1)
	// const repository = computed(() => store.state.source?.repo)
	whenever(lgAndLarger, () => (isOpen.value = false))
	onClickOutside(searchElement, () => {
		isSearchOpen.value = false
		searchScrollPosition.value = -1
	})
	const links = {
		to: [
			{
				to: '/',
				text: 'Viscoin'
			},
			{
				to: '/wallet',
				text: 'Wallet'
			},
			{
				to: '/explorer',
				text: 'Explorer'
			},
			{
				to: '/docs',
				text: 'Documentation'
			},
			{
				to: '/community',
				text: 'Community'
			}
		],
		href: [
			{
				href: 'https://github.com/viscoin/viscoin',
				text: 'Github'
			},
			{
				href: 'https://discord.gg/wnJ2BCmaja',
				text: 'Discord'
			}
		]
	}
</script>
<style>
	#search::-webkit-search-cancel-button {
		display: none
	}
</style>
