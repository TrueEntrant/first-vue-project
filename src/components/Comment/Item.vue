<template>
  <div id="comment-item">
    <div class="avatar-holder">
      <img v-if="comment.avatar" src="comment.avatar" alt="avatar" class="avatar">
      <img v-else src="@/assets/logo.png" alt="avatar" class="avatar">
    </div>
    <div class="text-wraper">
      <div class="input-holder">
        <p class="content-style">{{comment.author}} :</p>
      </div>
      <div class="input-holder">
        <p
          name="content"
          class="content-style"
          id="comment-content"
          placeholder="Place your text here..."
        >{{comment.text}}</p>
      </div>
      <div class="btn-holder">
        <button @click="onComment" class="comment-btn link">Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment-item",
  props: { comment: Object, onComment: Function }
};
</script>

<style scoped>
#comment-item {
  display: flex;
  flex-direction: row;
}
.avatar-holder {
  width: 30%;
}
.text-wraper {
  width: 70%;
}
.btn-holder {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.comment-btn {
  margin-right: 10%;
}
</style>
