<template>
	<v-content>
		<div v-for="(item, key) in data" :key="key">{{ item.title }}</div>
	</v-content>
</template>

<script>
	
	export default {
		name: 'pageArticleOverview',
		head: { title : 'Article Overview' },
		data() {
			return {
				data : []
			}
		},
		async asyncData(){
			return fetch('/api/articles').then(response =>
				response.json().then( items => ({ data : items } ))
			)
		},

	}
</script>

<style lang="scss">

</style>