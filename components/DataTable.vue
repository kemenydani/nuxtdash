<template>
	<v-card class="elevation-3">
		<v-toolbar flat color="white">
			<v-toolbar-title>My CRUD</v-toolbar-title>
			<v-divider
					class="mx-2"
					inset
					vertical
			></v-divider>
			<v-spacer></v-spacer>
			<v-dialog v-model="dialog" max-width="500px">
				<v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
				<v-card>
					<v-card-title>
						<span class="headline">{{ formTitle }}</span>
					</v-card-title>
					
					<v-card-text>
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12 sm6 md4>
									<v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
									<v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
									<v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
									<v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
								</v-flex>
								<v-flex xs12 sm6 md4>
									<v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card-text>
					
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
						<v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-toolbar>
		<v-data-table
				:items="data"
				:item-key="itemKey"
				v-model="selected"
				:pagination.sync="pagination"
				hide-actions
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
				</tr>
			</template>
			
			
			<template slot="items" slot-scope="props">
				
				<td>
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
						:align="th.align"
						:class="th.class"
						v-html="th.hasOwnProperty('filter') ? th.filter(props.item[th.value]) : props.item[th.value]">
				</td>
				
				<td class="text-xs-right">
					<v-icon v-if="updateCallback" color="orange" small class="mr-2" @click="updateCallback(props.item)">edit</v-icon>
					<v-icon v-if="deleteCallback" color="red" small @click="deleteCallback(props.item)">delete</v-icon>
				</td>
				
			</template>
			<template slot="no-data">
				<!--<v-btn color="primary" @click="initialize">Reset</v-btn>-->
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
	export default {
		name: 'DataTable',
		props : {
			data : {
				type : Array,
				required : true
			},
			itemKey : {
				type : String,
				required : true
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
				descending: true
			},
			selected : [],
			dialog: false,
			editedIndex: -1,
			editedItem: {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			},
			defaultItem: {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0
			}
		}),
		
		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
			}
		},
		
		watch: {
			selected : {
				handler : function( v ) {
					this.$emit('select', v);
				},
				deep : true
			},
			dialog (val) {
				val || this.close()
			}
		},
		created ()
		{
			this.pagination.sortBy = this.itemKey;
			this.pagination.descending = this.descending;
		},
		methods: {
			editItem (item) {
				this.editedIndex = this.desserts.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},
			deleteItem (item) {
				const index = this.desserts.indexOf(item)
				confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
			},
			close () {
				this.dialog = false
				setTimeout(() => {
					this.editedItem = Object.assign({}, this.defaultItem)
					this.editedIndex = -1
				}, 300)
			},
			save () {
				if (this.editedIndex > -1) {
					Object.assign(this.desserts[this.editedIndex], this.editedItem)
				} else {
					this.desserts.push(this.editedItem)
				}
				this.close()
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