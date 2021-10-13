<template>
    <img ref="img" style="image-rendering: auto;
	image-rendering: crisp-edges;
	image-rendering: pixelated;" src="" alt=""
	class="cursor-pointer w-full"
	title="Click to zoom"
	@click="resize" >
</template>
<script>
import { isDarkMode, toggleDarkMode } from '~/util/darkMode'
export default {
	props: {
		data: {
			type: String
		}
	},
	data() {
		return {
			isDarkMode: isDarkMode
		}
	},
	methods: {
		render() {
			const settings = { errorCorrectionLevel: 'H', color: { dark: '000000', light: 'ffffff' } }
			if (this.isDarkMode) settings.color = { dark: 'ffffff', light: '18181b' }
			qrcode.toDataURL(this.data, settings).then(url => {
				this.$refs.img.src = url
			})
		},
		resize() {
			const classList = this.$refs.img.classList
			if (classList.contains('w-40')) classList.remove('w-40')
			else classList.add('w-40')
		}
	},
	mounted() {
		this.render()
		this.$refs.img.classList.add('w-40')
	},
	watch: {
		isDarkMode: {
			handler() {
				this.render()
			}
		}
	}
}
</script>