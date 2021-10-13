<template>
	<footer class="bg-gray-200 dark:bg-gray-800">
		<div class="max-w-3xl mx-auto text-center px-16 pt-8 pb-8 text-gray-800 dark:text-gray-200">
			<a href="https://viscoin.net">Viscoin.net</a>
			<p class="text-xs break-words-legacy">
				{{ gitCommit }}
				<br>
				{{ builtAt }}
			</p>
		</div>
	</footer>
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	// import Stats from './Stats.vue'
	declare const GIT_COMMIT_HASH: string
	declare const BUILT_AT: string
	const gitCommit = ref(GIT_COMMIT_HASH)
	const builtAt = ref(new Date(BUILT_AT).toUTCString())
</script>