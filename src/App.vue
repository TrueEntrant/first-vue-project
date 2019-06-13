<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="header">
        <md-button class="md-icon-button" @click="changeState">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="title">Leave your thoughts here!</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" class="menu">
        <md-toolbar class="transparent" md-elevation="0">Navigation</md-toolbar>
        <md-list>
          <md-list-item
            :to="userLink"
            @click="changeState"
            v-bind:class="{ active: isActive }"
            active-class="active"
          >
            <md-icon>account_box</md-icon>
            <span class="md-list-item-text">{{ accountLinkMsg }}</span>
          </md-list-item>

          <md-list-item exact to="/" @click="changeState" exact-active-class="active">
            <md-icon>assignment</md-icon>
            <span class="md-list-item-text">Comments</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { store } from "@/store";

const DEFAULT_TRANSITION = "fade";

export default {
  name: "app",
  data() {
    return {
      menuVisible: false,
      prevHeight: 0,
      isActive: !!location.pathname.match("profile"),
      transitionName: DEFAULT_TRANSITION
    };
  },
  methods: {
    changeState() {
      this.menuVisible = !this.menuVisible;
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  },
  store,
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      }
      this.transitionName = transitionName || DEFAULT_TRANSITION;
      this.isActive = !!to.path.match("profile");
      next();
    });
  },
  computed: {
    userLink() {
      return "/profile/" + this.$store.state.user.id;
    },
    accountLinkMsg() {
      return this.$store.state.user.isAuth ? "Account" : "Login / Register";
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 700;
  will-change: opacity, height;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
.md-list.md-theme-default .active i,
.md-list.md-theme-default .active .md-list-item-content {
  background-color: rgb(33, 134, 112) !important;
  color: rgb(193, 240, 224) !important;
}
.md-app {
  width: 100%;
  height: 100vh;
}

.md-list-item {
  transition: all 300ms;
  user-select: none;
}
.md-list-item:hover {
  background-color: rgb(193, 240, 224);
}
.md-list-item:active {
  background-color: white;
}
.md-app-content {
  border: 0 !important;
  height: auto !important;
  padding: 0 !important;
}
.md-content {
  display: flex;
  justify-content: center;
}
.title {
  width: 90%;
  /* text-align: center; */
}
.menu {
  background: white;
}
.footer,
.header {
  position: fixed;
  width: 100%;
  background: rgb(33, 134, 112) !important;
  color: rgb(193, 240, 224) !important;
  min-height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  min-height: 50px;
  font-size: 20px;
  font-weight: bold;
  /* box-shadow: 5px 2px 20px 13px rgba(0, 0, 0, 0.14); */
  z-index: 10;
}
.header i {
  color: rgb(193, 240, 224) !important;
}
.full-width {
  width: 100%;
}
.input-style {
  background: transparent;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
}
.content-style {
  background: transparent;
  padding: 5px;
  font-size: 15px;
  width: 100%;
  text-align: start;
  max-width: 90%;
}
img {
  display: inline-block;
  max-width: 150px;
  width: 50%;
  max-height: 150px;
  z-index: 0;
}
.btn {
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgb(33, 134, 112);
  color: rgb(193, 240, 224);
  font-weight: 700;
  background: rgb(33, 134, 112);
  text-transform: capitalize;
  user-select: none;
}
.link {
  cursor: pointer;
  color: black !important;
  border: 0;
  background: transparent;
  text-transform: capitalize;
}
.underscore {
  margin: 40px;
  width: 80%;
  height: 1px;
  border: 0.2px solid lightgrey;
}
.link:hover {
  text-decoration: underline;
  color: rgb(33, 134, 112) !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
