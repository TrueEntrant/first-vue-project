<template>
  <div class="comments-holder">
    <div v-if="edit" id="comment-item" :class="{deleting : deleting}">
      <div class="controlls">
        <button @click="changeState" class="edit link">edit</button>
        <button @click="onDelete" class="edit link">delete</button>
      </div>
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
          <button @click="onReply" class="comment-btn link">Comment</button>
        </div>
      </div>
    </div>

    <Form
      v-else
      v-bind:comment="comment"
      v-bind:onClose="changeState"
      v-bind:isFromComment="true"
      v-bind:onSubmit="changeComment"
    />
    <Form
      v-if="reply"
      v-bind:onClose="onReply"
      v-bind:isFromComment="false"
      v-bind:onSubmit="onCommentReply"
    />

    <p class="underscore"/>

    <CommentsList
      v-if="comment.comments.length"
      v-bind:comments="comment.comments"
      v-bind:removeComment="deleteComment"
      v-bind:changeComment="changeComment"
      v-bind:change="updateList"
    />
  </div>
</template>

<script>
import * as Help from "@/shared/helpers";
import Form from "@/components/Form";

export default {
  name: "comment-item",
  components: { CommentsList: () => import("./List"), Form },
  data: () => ({
    edit: true,
    reply: false,
    deleting: false
  }),
  props: {
    onChange: Function,
    onRemove: Function,
    onResponse: Function,
    comment: Object
  },
  methods: {
    onDelete() {
      this.deleting = !this.deleting;
      setTimeout(() => {
        this.onRemove(this.comment.id);
      }, 200);
    },
    updateList(commentsList) {
      this.comment.comments = commentsList;
      this.onChange(this.comment);
    },
    onCommentReply(comment) {
      this.comment.comments.push(comment);
    },
    onReply() {
      this.reply = !this.reply;
    },
    changeState() {
      this.edit = !this.edit;
    },
    changeComment(comment, callback) {
      const res = Object.assign({}, this.comment, comment);
      this.onChange(res);
      callback && callback();
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
  animation: fadeIn 0.5s linear;
}
.controlls {
  width: 100%;
  display: flex;
  color: rgb(33, 134, 112);
  justify-content: flex-end;
  padding-right: 5%;
}
.edit {
  padding-right: 20px;
}
.comments-holder {
  width: 100%;
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
.deleting {
  animation: fadeOut 0.3s linear;
  opacity: 0;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
