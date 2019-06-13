<template>
  <div id="login-form">
    <div class="form">
      <div class="title-holder">
        <h1 class="login-title">Sing in</h1>

        <p class="sub-title">
          or
          <router-link class="link" to="/profile/register">Sing up</router-link>
        </p>
      </div>

      <div class="input-holder">
        <input
          name="email"
          type="email"
          class="input-style"
          placeholder="Login"
          :value="email"
          @input="onChange"
        >
      </div>

      <div class="input-holder">
        <input
          name="password"
          type="password"
          class="input-style"
          placeholder="Password"
          :value="password"
          @input="onChange"
        >
      </div>

      <div class="btn-holder">
        <div class="link forgot">forgot password?</div>
      </div>
      <div class="btn-holder">
        <div class="btn" @click="onLogin">login</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { USER_LOGGIN } from "@/shared/constants";

export default {
  name: "login-form",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    ...mapActions([USER_LOGGIN]),
    onLogin() {
      this[USER_LOGGIN]({
        email: this.email,
        password: this.password,
        router: this.$router
      });
    },
    onChange({ target: { name, value } }) {
      this[name] = value;
    }
  }
};
</script>

<style scoped>
#login-form {
  min-height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-holder {
  cursor: pointer;
}
input {
  width: 100%;
  min-width: 300px;
  user-select: auto;
}
.btn {
  min-width: 100px;
}
.forgot {
  font-size: 12px;
}
.form {
  padding: 50px 120px;
  box-shadow: 5px 2px 45px 13px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  max-width: 45%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.title-holder {
  margin-top: 55px;
}
.form div {
  margin-bottom: 30px;
}
</style>
