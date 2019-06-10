import Vuex from "vuex";
import Vue from "vue";
import { SET_MUTATION } from "@/shared/constants";
import * as storage from "@/shared/storage";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    comments: storage.Get() || []
  },
  mutations: {
    [SET_MUTATION](state, payload) {
      state.comments = payload;
    }
  },
  actions: {
    storeGetAsync({ commit }) {
      commit(SET_MUTATION, storage.Get());
    },
    set({ commit }, data) {
      commit(SET_MUTATION, data);
    },
    storeSetAsync({ dispatch, state }) {
      storage.Set(state.comments).then(() => dispatch("storeGetAsync"));
    }
  }
});
