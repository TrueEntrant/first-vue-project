<template>
  <div id="user-info">
    <p class="user-info">User id : {{ $route.params.id }}</p>

    <div class="btn-holder">
      <button class="btn" @click="logoutUser">Logout</button>
    </div>
  </div>
</template>

<script>
import { USER_DELETE } from "@/shared/constants";
import { mapActions } from "vuex";

export default {
  name: "user-info",
  methods: {
    ...mapActions([USER_DELETE]),
    logoutUser() {
      this[USER_DELETE]({ router: this.$router });
    }
  }
};
</script>

<style scoped>
#user-info {
  display: flex;
}
</style>