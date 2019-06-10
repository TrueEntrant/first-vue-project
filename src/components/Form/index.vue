<template>
  <div id="comment-form">
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
    <div class="text-wraper">
      <div class="input-holder">
        <div v-if="nameChanging" class="user-holder">
          <input type="text" class="input-style" :placeholder="userName" @input="onInputUserName">
          <button class="cancel-input" @click="startNameChange">&#10008;</button>
          <button class="accept-input" @click="changeUserName">&#10004;</button>
        </div>
        <button v-else @click="startNameChange" class="input-style btn">{{ userName }}</button>
      </div>
      <div class="input-holder">
        <textarea
          name="comment"
          class="input-style"
          id="comment-input"
          cols="70"
          rows="10"
          placeholder="Place your text here..."
          :value="text"
          @input="changeUserComment"
        ></textarea>
      </div>
    </div>
    <div class="submit-wrapper">
      <button v-if="isFromComment" @click="onClose" class="close btn">Close</button>
      <button class="submit btn" @click="onFormSubmit">Send comment &#8618;</button>
    </div>
  </div>
</template>


<script>
import * as Help from "@/shared/helpers";

export default {
  name: "comment-form",
  props: {
    onClose: Function,
    onSubmit: Function,
    comment: Object,
    isFromComment: Boolean
  },
  data: function() {
    return {
      nameChanging: false,
      userName: this.isFromComment ? this.comment.author : "Anonimous",
      temp: this.isFromComment ? this.comment.author : "",
      text: this.isFromComment ? this.comment.text : "",
      userAvatar: this.isFromComment ? this.comment.avatar : null,
      comments: this.isFromComment ? this.comment.comments : [],
      formId: Help.getId()
    };
  },
  methods: {
    onFileChange: function(event) {
      const file = event.target.files[0];
      if (file && window.FileReader) {
        const reader = new FileReader();
        reader.onload = () => {
          if (
            reader.result.match(new RegExp(/data:image\/([a-zA-Z]*);base64/g))
          ) {
            this.userAvatar = reader.result;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    resetForm: function() {
      this.nameChanging = false;
      this.userName = "Anonimous";
      this.temp = "";
      this.text = "";
      this.userAvatar = null;
      this.comments = [];
      this.onClose && this.onClose();
    },
    startNameChange: function() {
      this.nameChanging = !this.nameChanging;
      this.temp = "";
    },
    onInputUserName: function(event) {
      this.temp = event.target.value;
    },
    changeUserName: function() {
      this.userName = this.temp;
      this.startNameChange();
    },
    changeUserComment: function(event) {
      this.text = event.target.value;
    },
    onFormSubmit: function() {
      this.text &&
        this.onSubmit(
          {
            author: this.userName,
            text: this.text,
            avatar: this.userAvatar,
            comments: this.comments,
            id: this.isFromComment ? this.comment.id : Help.getId()
          },
          () => this.resetForm()
        );
    }
  }
};
</script>

<style scoped>
#comment-form {
  width: 98%;
  margin: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.avatar-holder {
  position: relative;
  width: 29%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  z-index: 0;
}
textarea {
  resize: none;
}
.text-wraper div {
  width: 100%;
}
.text-wraper {
  width: 69%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-holder {
  position: relative;
  margin: 5px;
}
.accept-input,
.cancel-input {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  border: 0;
  background: transparent;
}
.cancel-input {
  transform: translate(-20%, 11%);
  color: red;
  font-size: 22px;
}
.accept-input {
  transform: translate(-150%, 2%);
  color: green;
  font-size: 25px;
}
label {
  width: 100%;
  height: 100%;
}
.hidden {
  position: absolute;
  visibility: hidden;
}
.close {
  margin-right: 40px;
}
.avatar-message {
  width: 60%;
  position: absolute;
  margin-bottom: 15px;
  left: 50%;
  bottom: 0;
  transform: translate(-50%);
}
.submit {
  font-size: 20px;
}
.submit-wrapper {
  width: 100%;
  margin: 0 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
