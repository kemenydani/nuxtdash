import Vuex from 'vuex';

const createStore = () => {
	
	return new Vuex.Store({
		state : {
			authUser: {}
		},
		mutations: {
			setAuthUser(state, userData){
				state.authUser = userData;
			}
		},
		actions: {
			setAuthUser(vuexContext, userData){
				vuexContext.commit('setAuthUser', userData);
			}
		},
		getters : {
			getAuthUser(state){
				return state.authUser;
			}
		}
	});
	
};

export default createStore;
