<template>
  <div id="comment-wrapper">
    <div v-if="startEdit" class="full-width">
      <div class="controlls">
        <button @click="changeState" class="edit link">edit</button>
        <button @click="onDelete" class="delete link">delete</button>
      </div>
      <Item
        v-if="startEdit"
        v-bind:changeComment="changeComment"
        v-bind:comment="comment"
        v-bind:onComment="onStartComment"
      ></Item>
    </div>

    <Form
      v-else
      v-bind:comment="comment"
      v-bind:onClose="changeState"
      v-bind:isFromComment="true"
      v-bind:onSubmit="changeComment"
    ></Form>
    <Form
      v-if="startComment"
      v-bind:onClose="onStartComment"
      v-bind:isFromComment="false"
      v-bind:onSubmit="onResponce"
    ></Form>
  </div>
</template>

<script>
import Item from "./Item";
import Form from "@/components/Form";

export default {
  name: "comments-list",
  components: { Item, Form },
  props: ["comment", "removeComment", "changeComment"],
  data: function() {
    return {
      startEdit: true,
      startComment: false
    };
  },
  methods: {
    onDelete: function() {
      this.removeComment(this.comment.id);
    },
    changeState: function() {
      this.startEdit = !this.startEdit;
    },
    onStartComment: function() {
      this.startComment = !this.startComment;
    },
    onResponce: function(comment, callback) {
      if (!this.comment.comments.some(item => item.id === comment.id)) {
        this.comment.comments.push(comment);
        this.changeComment(this.comment, callback);
      }
    }
  }
};
</script>

<style scoped>
#comment-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.comment {
  position: absolute;
  right: 20%;
  bottom: -20px;
}
.controlls {
  position: absolute;
  right: 10%;
  min-width: 100px;
  display: flex;
  color: rgb(33, 134, 112);
  justify-content: space-between;
}
</style>
