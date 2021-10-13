<template>
	<router-link
		class="mx-auto"
		:to="'/wallet/' + props.address"
	>
		<code class="
			bg-indigo-600
			text-gray-200 p-4
			lg:text-lg sm:text-sm text-xs
			rounded-md shadow flex items-center"
			>
			<span
			style="white-space: nowrap;"
			class="block
			overflow-hidden
			w-60 sm:w-auto hover:text-white mr-2">{{ props.address }}</span>
			<router-link
				to=""
			>
				<button ref="copyButton" class="focus:outline-none" aria-label="Copy install command">
					<heroicons-outline-clipboard-copy
						v-if="!copied"
						class="inline-block fill-current text-gray-200 cursor-pointer hover:text-white mb-1"
						aria-hidden="true"
						@click="copyInstallCmd"
					/>
					<heroicons-outline-clipboard-check
						v-else
						class="inline-block fill-current text-green-500 cursor-pointer mb-1"
						aria-hidden="true"
						@click="copyInstallCmd"
					/>
				</button>
			</router-link>
		</code>
	</router-link>
</template>
<script setup lang="ts">
	import { defineProps, ref } from 'vue'
	import { useTippy } from 'vue-tippy'
	import debounce from 'lodash/debounce'
	const copyButton = ref()
	const copied = ref(false)
	const props = defineProps<{ address: string }>()
	const resetCopied = debounce((hide: () => void) => {
		hide()
		copied.value = false
	}, 1000)
	const { show: showTooltip, hide: hideTooltip } = useTippy(copyButton, {
		content: 'Copied',
		trigger: 'manual',
		hideOnClick: false,
	})
	const copyInstallCmd = async () => {
		try {
			await navigator.clipboard.writeText(props.address)
			showTooltip()
		}
		catch {}
		copied.value = true
		resetCopied(hideTooltip)
	}
</script>