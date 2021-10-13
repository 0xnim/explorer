<template>
	<code
		class="
			mx-auto
			text-gray-200 p-4
			lg:text-lg sm:text-sm text-xs
			rounded-md shadow flex items-center
		"
		>
			<span
			style="white-space: nowrap;"
			class="
				block
				overflow-hidden
				w-60 sm:w-auto hover:text-white mr-2
			">{{ props.private }}</span>
			<button ref="copyButton" class="focus:outline-none" aria-label="Copy install command">
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
		</button>
	</code>
</template>
<script setup lang="ts">
	import { defineProps, ref } from 'vue'
	import { useTippy } from 'vue-tippy'
	import debounce from 'lodash/debounce'
	const copyButton = ref()
	const copied = ref(false)
	const props = defineProps<{ private: string }>()
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
			await navigator.clipboard.writeText(props.private)
			showTooltip()
		}
		catch {}
		copied.value = true
		resetCopied(hideTooltip)
	}
</script>