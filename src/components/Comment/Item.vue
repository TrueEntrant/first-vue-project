<template>
  <div id="comment-item">
    <div class="avatar-holder">
      <img v-if="comment.avatar" :src="comment.avatar" alt="avatar" class="avatar">
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
    <p class="underscore"></p>

    <div v-if="comment.comments.length" class="comments-holder">
      <div v-for="item in comment.comments" :key="item.id">
        <CommentsList
          v-bind:comment="item"
          v-bind:removeComment="delComment"
          v-bind:changeComment="chgComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as Help from "@/shared/helpers";

export default {
  name: "comment-item",
  components: { CommentsList: () => import("./List") },
  props: {
    comment: Object,
    onComment: Function,
    removeComment: Function,
    changeComment: Function
  },
  methods: {
    chgComment: function(comment, callback) {
      this.comment.comments = Help.update(this.comment.comments, comment, "id");
      this.changeComment(this.comment, callback);
    },
    delComment: function(id) {
      this.comment.comments = Help.filter(this.comment.comments, id, "id");
      this.changeComment(this.comment, () => {});
    }
  }
};
</script>

<style scoped>
#comment-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.comments-holder {
  width: 100%;
  margin-left: 50px;
}
.comments-holder .avatar {
  max-width: 100px;
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
