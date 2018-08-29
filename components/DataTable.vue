<template>
	<v-card class="elevation-3">
		<v-toolbar flat color="white">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar" :selected="selected" :data="data" :onCreateItem="onCreateItem">
			</slot>
		</v-toolbar>
		<v-data-table
				:items="data.items"
				:item-key="itemKey"
				v-model="selected"
				select-all
				:pagination.sync="pagination"
				:total-items="pagination.totalItems"
		>
			<template slot="headers" slot-scope="props">
				<tr>
					<th>
						<v-checkbox
								:input-value="props.all"
								:indeterminate="props.indeterminate"
								primary
								hide-details
								@click.native="toggleAll"
						></v-checkbox>
					</th>
					<th
							v-for="header in config.headers"
							:key="header.text"
							:align="header.align ? header.align : 'left'"
							:class="['column active', header.sortable ? 'sortable ' + (pagination.descending ? 'desc ' : 'asc') : '']"
							@click="(() => { header.sortable ? changeSort(header.value) : false; })"
					>
						<v-icon v-if="header.sortable" small>arrow_upward</v-icon>
						{{ header.text }}
					</th>
					<th align="right" class="column" v-if="rowActions"></th>
				</tr>
			</template>
			<template slot="items" slot-scope="props">
				<tr :active="props.selected" @click="props.selected = !props.selected">
					<td width="80px">
						<v-checkbox
								:input-value="props.selected"
								primary
								hide-details
						></v-checkbox>
					</td>
					<td
							v-for="(th, key) in config.headers"
							v-if="props.item.hasOwnProperty(th.value)"
							:key="key"
							:width="th.width"
							:align="th.align"
							:class="th.class"
							v-html="th.hasOwnProperty('filter') ? th.filter(props.item[th.value]) : props.item[th.value]">
					</td>
					<td class="text-xs-right" v-if="rowActions">
						<v-icon v-if="updateCallback" color="orange" small class="mr-2" @click="updateCallback(props.item)">edit</v-icon>
						<v-icon v-if="deleteCallback" color="red" small @click="deleteCallback(props.item)">delete</v-icon>
					</td>
				</tr>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
	export default {
		name: 'DataTable',
		props : {
			title : {
				type : String,
				required : false,
				default : () => ''
			},
			data : {
				type : Object,
				required : true
			},
			itemKey : {
				type : String,
				required : true
			},
			rowActions : {
				type : Boolean,
				required : false,
				default : () => true
			},
			descending : {
				type : Boolean,
				required : false,
				default : () => true
			},
			config : {
				type : Object,
				required : true
			},
			fetchCallback : {
				type : Function,
				required : true,
			},
			createCallback : {
				type : Function,
				required : false,
			},
			updateCallback : {
				type : Function,
				required : false,
			},
			deleteCallback : {
				type : Function,
				required : false,
			},
		},
		data: () => ({
			pagination: {
				descending: true,
				totalItems: 0,
				page : 1,
				rowsPerPage : 5,
				sortBy : 'Id'
			},
			selected : [],
		}),
		watch: {
			pagination: {
				handler : function ( v ){
				
				},
				deep: true
			},
			selected : {
				handler : function( v ) {
					this.$emit('select', v);
				},
				deep : true
			},
		},
		methods: {
			onFetchData()
			{
				this.loading = true;
				return new Promise((resolve, reject) =>
				{
					this.fetchCallback(this.pagination)
						.then(response =>
						{
							this.items = response.items;
							this.pagination.totalItems = parseInt(response.totalItems);
							this.pagination.page = parseInt(response.currentPage);
							this.pagination.rowsPerPage = parseInt(response.perPage);
							
							if(this.pagination.sortBy)
							{
								this.items = this.items.sort((a, b) => {
									const sortA = a[sortBy];
									const sortB = b[sortBy];
									
									if (descending) {
										if (sortA < sortB) return 1;
										if (sortA > sortB) return -1;
										return 0
									} else {
										if (sortA < sortB) return -1;
										if (sortA > sortB) return 1;
										return 0
									}
								})
							}
							
							if (rowsPerPage > 0) {
								this.items = this.items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
							}
							this.loading = false;
							resolve({
								items: this.items,
								total: parseInt(this.pagination.totalItems)
							})
							
						})
						.catch(error =>
						{
						
						})
					;
				})
			},
			onCreateItem(){
				return this.createCallback()
					.then(response => {
						console.log('onCreateItem then:');
						console.log(response);
					})
					.catch(error => {
						console.log('onCreateItem catch:');
						console.log(error.message);
					});
			},
			onUpdateItem(){
			
			},
			onDeleteItem (item) {
			
			},
			
			toggleAll () {
				if (this.selected.length) this.selected = [];
				else this.selected = this.data.slice()
			},
			changeSort (column) {
				if (this.pagination.sortBy === column) {
					this.pagination.descending = !this.pagination.descending
				} else {
					this.pagination.sortBy = column
					this.pagination.descending = false
				}
			}
		}
	}
</script>

<style lang="scss">

</style>