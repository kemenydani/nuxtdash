import Vuex from 'vuex';

const createStore = () => {
	
	return new Vuex.Store({
		state : {
			authUser: {},
			authUserNotifications: [],
			authUserConversations: []
		},
		mutations: {
			setAuthUser(state, userData){
				state.authUser = userData;
			},
			setAuthUserNotifications(state, notificationData){
				state.authUserNotifications = notificationData;
			},
			setAuthUserConversations(state, conversationData){
				state.authUserConversations = conversationData;
			},
		},
		actions: {
			setAuthUser(vuexContext, userData){
				vuexContext.commit('setAuthUser', userData);
			},
			setAuthUserNotifications(vuexContext, notificationData){
				vuexContext.commit('setAuthUserNotifications', notificationData);
			},
			setAuthUserConversations(vuexContext, conversationData){
				vuexContext.commit('setAuthUserConversations', conversationData);
			},
		},
		getters : {
			getAuthUser(state){
				return state.authUser;
			},
			getAuthUserNotifications(state){
				return state.authUserNotifications;
			},
			getAuthUserConversations(state){
				return state.authUserConversations;
			},
		}
	});
	
};

export default createStore;
