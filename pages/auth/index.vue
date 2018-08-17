<template>
	<v-layout row style="display: flex; justify-content: center; align-items: center; align-content: center;" app>
		<v-flex xs12 sm6 md4 lg3 offset-sm>
			<v-card app>
				<v-card-title app>
					<h2>Dashboard Login</h2>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<v-container>
						<form @submit.prevent="onLogin">
							<v-layout row>
								<v-flex xs12>
									<v-text-field
											name="email"
											label="Email"
											id="email"
											v-model="email"
											type="email"
											required></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
											name="password"
											label="Password"
											id="password"
											v-model="password"
											type="password"
											required></v-text-field>
								</v-flex>
							</v-layout>
							
							<v-layout row>
								<v-flex xs12>
									<v-checkbox
											label="Remember Me"
											v-model="remember"
									></v-checkbox>
								</v-flex>
							</v-layout>
							
							<v-layout row>
								<v-flex xs12>
									<v-btn type="submit" :disabled="loading" :loading="loading">
										Sign in
										<span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
										</span>
									</v-btn>
								</v-flex>
							</v-layout>
						</form>
					</v-container>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	
	export default {
		layout : 'auth',
		name: 'pageAuth',
		data() {
			return {
				email : '',
				password: '',
				remember: true
			}
		},
		methods: {
			onLogin(){
			
			}
		},
		mounted() {
		
		}
	}
</script>

<style lang="scss">

</style>