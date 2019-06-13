import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "@/store";

Vue.use(VueRouter);

const CommentPage = () => import("@/containers/CommentPage");
const ProfilePage = () => import("@/containers/ProfilePage");
const Login = () => import("@/components/Login");
const Register = () => import("@/components/Register");
const UserInfo = () => import("@/components/UserInfo");

const privateMode = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user.isAuth) {
    next("/profile/login");
  } else {
    next();
  }
};

const profileRoutes = [
  { path: "/", redirect: "login" },
  { path: "login", meta: { transitionName: "slide" }, component: Login },
  { path: "register", meta: { transitionName: "slide" }, component: Register },
  {
    path: "/profile/:id",
    component: UserInfo,
    meta: { requiresLogin: true, transitionName: "slide" },
    beforeEnter: privateMode,
    props: true
  }
];
const routes = [
  { path: "/", meta: { transitionName: "slide" }, component: CommentPage },
  {
    path: "/profile",
    meta: { transitionName: "slide" },
    component: ProfilePage,
    children: profileRoutes
  }
];

export const router = new VueRouter({
  routes,
  mode: "history"
});
