<template>
	<v-content>
		<DataTable
				:data="data"
				:config="config"
				itemKey="Id"
				:fetchCallback="fetchData"
				:createCallback="saveData"
				:updateCallback="saveData"
				:deleteCallback="deleteData"
		>
		</DataTable>
	</v-content>
</template>

<script>
	
	export default {
		head: { title : 'Article Overview' },
		data() {
			return {
				config : {
					key : 'Id',
					headers : [
						{
							text: 'Id',
							align: 'left',
							value: 'Id',
							sortable : true
						},
						{
							text: 'Title',
							align: 'left',
							value: 'Title',
							filter : function( v ){
								return v + ' - filtered'
							},
							sortable : true
						},
						{
							text: 'Actions',
							value: 'actions',
							align: 'right'
						}
						/*
						{ text: 'Fat (g)', value: 'fat' },
						{ text: 'Carbs (g)', value: 'carbs' },
						{ text: 'Protein (g)', value: 'protein' },
						{ text: 'Actions', value: 'name', sortable: false }
						*/
					],
				},
				data : []
			}
		},
		async asyncData( context )
		{
			const response = await fetch('/api/articles');
			
			if(response.status !== 200) throw new Error('Data loading error');
			
			let data =  await response.json();
			
			return { data };
		},
		methods : {
			async fetchData()
			{
			
			},
			async saveData()
			{
			
			},
			async deleteData()
			{
			
			}
		},
		mounted(){
			this.fetchData()
		}
	}
</script>

<style lang="scss">

</style>