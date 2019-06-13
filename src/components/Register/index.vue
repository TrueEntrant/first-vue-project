<template>
  <div id="register-form">
    <div class="form">
      <div class="title-holder">
        <h1 class="reg-title">register</h1>
      </div>
      <div class="avatar-holder">
        <label :for="formId">
          <img v-if="userAvatar" :src="userAvatar" alt="avatar" class="avatar">
          <img v-else src="@/assets/logo.png" alt="avatar" class="avatar">
          <input
            accept="image/x-png, image/gif, image/jpeg"
            @input="onFileChange"
            :id="formId"
            type="file"
            class="hidden"
          >
          <div class="avatar-message btn">Upload new photo</div>
        </label>
      </div>
      <div class="input-holder">
        <label for class="email">
          <input type="email" class="email">
        </label>
      </div>
      <div class="input-holder"></div>
      <div class="input-holder"></div>
      <div class="btn-holder"></div>
      <div class="btn-holder"></div>
    </div>
  </div>
</template>

<script>
import * as Help from "@/shared/helpers";

export default {
  name: "register-form",
  data() {
    return {
      formId: Help.getId()
    };
  }
};
</script>

<style scoped>
#register-form {
  display: flex;
}
</style>
