<template>
    <button
        class="
            text-gray-200
            hover:bg-blue-700 hover:text-white
            bg-blue-600
            rounded-md
            py-2
            px-3
            lg:text-lg sm:text-sm text-xs
            items-center
            text-center flex flex-col
            mt-2.5
            font-semibold
            focus:outline-none
            focus-visible:ring-1 focus-visible:ring-white
        "
        active-class="bg-blueGray-600"
    >
        {{ props.text }}
    </button>
</template>
<script setup lang="ts">
	import { defineProps } from 'vue'
	const props = defineProps<{ text: string }>()
</script>