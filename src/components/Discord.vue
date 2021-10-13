<template>
    <div class="col-span-full" name="discord">
        <iframe class="mx-auto" height="400" v-if=isDarkMode src="https://discordapp.com/widget?id=840244262615515148&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        <iframe class="mx-auto" height="400" v-else src="https://discordapp.com/widget?id=840244262615515148&theme=light" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>
</template>
<script setup lang="ts">
import { isDarkMode } from '../util/darkMode'
</script>