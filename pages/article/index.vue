<template>
	<v-content>
		<DataTable
				title="Articles"
				:config="config"
				:data="data"
				itemKey="Id"
				:rowActions="true"
				:fetchCallback="fetchData"
				:createCallback="saveData"
				:updateCallback="saveData"
				:deleteCallback="deleteData"
				@select="onRowSelect"
		>
			<template slot="toolbar" slot-scope="props">
				
				<v-dialog v-model="dialogs.create.open" persistent max-width="500px" :loading="true">
					<v-btn slot="activator" small color="primary">Create New</v-btn>
					<v-card>
						<v-card-title>
							<span class="headline">New Article</span>
						</v-card-title>
						<v-card-text>
							<v-layout wrap>
								<v-flex xs12>
									<v-text-field
											label="Title"
											hint="Title of the article"
											persistent-hint
											required
									></v-text-field>
								</v-flex>
							</v-layout>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat :disabled="dialogs.create.loading" @click.native="dialogs.create.open = false">Cancel</v-btn>
							
							<v-btn
									:loading="dialogs.create.loading"
									@click.native="dialogs.create.loading = true; props.onCreateItem().then( () => { dialogs.create.open = false; dialogs.create.loading = false } )"
									color="blue darken-1"
									flat>
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>
		</DataTable>
	</v-content>
</template>

<script>
	
	export default {
		head: { title : 'Article Overview' },
		data() {
			return {
				dialogs : {
					create : {
						open : false,
						loading : false
					}
				},
				config : {
					headers : [
						{
							text: 'Id',
							align: 'left',
							value: 'Id',
							width: '30px',
							sortable : true
						},
						{
							text: 'Title',
							align: 'left',
							value: 'Title',
							filter : function( v ){
								return '<a href="#">' + v + '</a>';
							},
							sortable : true
						},
						{
							text: 'Active',
							align: 'left',
							value: 'Active',
							filter : function( v ){
								return v === '0' ? 'Inactive' : 'Active';
							},
							sortable : true
						},
						{
							text: 'CreatedAt',
							align: 'right',
							value: 'CreatedAt',
							filter : function( v ){
								return v;
							},
							sortable : true
						},
					],
				},
			}
		},
		async asyncData( context )
		{
			const response =  await fetch("/api/articles", {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});

			let data =  await response.json();
			
			return { data : data }
		},
		methods :
		{
			async fetchData( pagination = {} )
			{
				let queryParams = {
					page : 1,
					rowsPerPage : 5,
					descending : true,
					search : ''
				};
				
				let queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
				
				const response =  await fetch("/api/articles?" + queryString, {
					credentials: 'include',
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				});
				
				if(response.status !== 200) throw new Error('Data loading error');
				
				let data =  await response.json();
				
				return { items : data.items, totalItems : data.totalItems };
			},
			async saveData()
			{
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({ foo : 'bar' })
					}, 3000);
				});
			},
			async deleteData()
			{
			
			},
			onRowSelect(selected = [])
			{
				console.log(selected)
			}
		},
		mounted(){
			this.fetchData()
		}
	}
</script>

<style lang="scss">

</style>