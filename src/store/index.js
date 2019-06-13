import Vuex from "vuex";
import Vue from "vue";
import * as constants from "@/shared/constants";
import * as storage from "@/shared/storage";
import * as Help from "@/shared/helpers";
import { defaultState } from "@/shared/settings";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: storage.Get() || defaultState,
  mutations: {
    [constants.STORE_SET_MUTATION](state, payload) {
      state = payload;
    },
    [constants.USER_SET_MUTATION](state, payload) {
      state.user = payload;
    },

    [constants.USER_UPDATE_MUTATION](state, payload) {
      state.user = Object.assign(state.user, payload);
    },

    [constants.COMMENTS_SET_MUTATION](state, payload) {
      state.comments = payload;
    },

    [constants.COMMENTS_ADD_MUTATION](state, payload) {
      state.comments.push(payload);
    },

    [constants.COMMENTS_DELETE_MUTATION](state, payload) {
      state.comments = Help.filter(state.comments, payload, "id");
    },

    [constants.COMMENTS_UPDATE_MUTATION](state, payload) {
      Help.update(state.comments, payload, "id");
    }
  },
  actions: {
    [constants.USER_LOGGIN]: ({ dispatch, commit }, { email, password, router }) => {
      const db = storage.Get("users-data");
      const user = db.filter(elem => elem.email === email && elem.password === password)[0];

      if (user) {
        user.isAuth = true;
        commit(constants.USER_SET_MUTATION, user);
        router.replace("/profile/" + user.id);
        dispatch(constants.LOCALSTORAGE_SET);
      }
    },

    [constants.USER_SET]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.USER_SET_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.USER_UPDATE]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.COMMENTS_ADD_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.USER_DELETE]: ({ dispatch, commit }, { router }) => {
      Promise.resolve(commit(constants.USER_SET_MUTATION, defaultState.user)).then(() => {
        router.replace("/profile/login");

        dispatch(constants.LOCALSTORAGE_SET);
      });
    },

    [constants.COMMENTS_ADD]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.COMMENTS_ADD_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.COMMENTS_UPDATE]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.COMMENTS_UPDATE_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.COMMENTS_DELETE]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.COMMENTS_DELETE_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.COMMENTS_SET]: ({ dispatch, commit }, data) => {
      Promise.resolve(commit(constants.COMMENTS_SET_MUTATION, data)).then(() =>
        dispatch(constants.LOCALSTORAGE_SET)
      );
    },

    [constants.LOCALSTORAGE_GET]: ({ commit }) => {
      const syncData = storage.Get();
      syncData && commit(constants.STORE_SET_MUTATION, syncData);
    },

    [constants.LOCALSTORAGE_SET]: ({ dispatch, state }) => {
      storage.Set(state).then(() => dispatch(constants.LOCALSTORAGE_GET));
    }
  }
});
