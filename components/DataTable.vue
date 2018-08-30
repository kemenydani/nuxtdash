<template>
	<v-card class="elevation-3">
		<v-toolbar flat color="white">
			<v-toolbar-title>{{ title }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<slot name="toolbar" :selected="selected" :data="items">
			</slot>
		</v-toolbar>
		<v-data-table :headers-length="config.colCount" :items="items" :loading="loading" :item-key="itemKey" :pagination.sync="pagination" :total-items="pagination.totalItems" v-model="selected" select-all>
			<!-- headers -->
			<template slot="headers" slot-scope="props">
				<tr>
					<th>
						<v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" @click.native="checkAll" primary hide-details></v-checkbox>
					</th>
					<th :key="header.text"
							:align="header.align ? header.align : 'left'"
							:class="['column', header.sortable ? 'sortable ' + (pagination.descending ? 'desc ' : 'asc') + (pagination.sortBy === header.value ? 'active ' : '') : '']"
							v-for="header in config.headers"
							@click="() => { header.sortable ? changeSort(header.value) : false; }"
					>
						<v-icon v-if="header.sortable" small>arrow_upward</v-icon>
						{{ header.text }}
					</th>
					<th align="right" class="column" v-if="rowActions"></th>
				</tr>
			</template>
			<!-- rows -->
			<template slot="items" slot-scope="props">
				<tr :active="props.selected" @click="props.selected = !props.selected">
					<td width="80px">
						<v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
					</td>
					<td v-for="(th, key) in config.headers"
							v-if="props.item.hasOwnProperty(th.value)"
							v-html="th.hasOwnProperty('filter') ? th.filter(props.item[th.value]) : props.item[th.value]"
							:key="key"
							:width="th.width"
							:align="th.align"
							:class="th.class"
					>
					</td>
					<td class="text-xs-right" v-if="rowActions">
						<v-icon color="orange" small class="mr-2" >edit</v-icon>
						<v-icon color="red" small>delete</v-icon>
					</td>
				</tr>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
	export default {
		name : 'DataTable',
		props : {
			title : { type : String, required : false, default : () => ''},
			initialItems: { type : Array, required : false, default : () => [] },
			initialPagination : {
				type : Object,
				required : false,
				default : () => ({
					perPage : 0,
					page : 1,
					totalPages : 0,
					totalItems : 0,
					sortBy : "",
					search : "",
					descending : true
				})
			},
			itemKey : { type : String, required : true },
			rowActions : { type : Boolean, required : false, default : () => true },
			descending : { type : Boolean, required : false, default : () => true },
			config : { type : Object, required : true },
		},
		data : () => ({
			selected : [],
			items : [],
			pagination : {},
			loading : false,
		}),
		methods:
		{
			async onFetchData()
			{
				this.loading = true;
				
				let queryString = Object.keys(this.pagination).map(key => key + '=' + this.pagination[key]).join('&');
				
				const response =  await fetch("/api/articles?" + queryString, {
					credentials: 'include',
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				});
				
				let json = await response.json();
				
				this.items = json.items || [];
				
				Object.keys(json.pagination).forEach(key => this.pagination[key] = json.pagination[key]);
			
				this.loading = false;
				
				return json;
			},
			checkAll () {
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
		},
		watch: {
			pagination: {
				handler : function( v ) {
					this.onFetchData()
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
		created()
		{
			this.items = this.initialItems.length ? this.initialItems : [];
			this.pagination = this.initialPagination;
		},
	}
</script>

<style lang="scss">

</style>