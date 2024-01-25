// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: null,
  },
  mutations: {
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    clearUserDetails(state) {
      state.userDetails = null;
    },
  },
  getters :{
    isLoggedIn: (state) => !!state.loggedInUser, // Convert to a boolean
  },
  actions: {
    login({ commit }, user) {
      // You can perform authentication here if needed.
      // Once authenticated, set the loggedInUser in the store.
      commit('setLoggedInUser', user);
    },
    logout({ commit }) {
      // Clear the loggedInUser when logging out.
      commit('setLoggedInUser', null);
    },
  },
});
