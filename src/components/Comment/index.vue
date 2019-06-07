<template>
  <div id="comment-wrapper">
    <div v-if="startEdit">
      <div class="controlls">
        <button @click="changeState" class="edit link">edit</button>
        <button class="delete link">delete</button>
      </div>
      <Item v-if="startEdit" v-bind:comment="comment" v-bind:onComment="onStartComment"></Item>
    </div>
    <Form v-else v-bind:comment="comment" v-bind:onClose="changeState" v-bind:isFromComment="true"></Form>
    <Form v-if="startComment"></Form>
  </div>
</template>

<script>
import Item from "./Item";
import Form from "@/components/Form";

export default {
  name: "comment-wrapper",
  components: { Item, Form },
  props: ["comment"],
  data: function() {
    return {
      startEdit: true,
      startComment: false
    };
  },
  methods: {
    changeState: function() {
      this.startEdit = !this.startEdit;
    },
    onStartComment: function() {
      this.startComment = !this.startComment;
    }
  }
};
</script>

<style scoped>
#comment-wrapper {
  position: relative;
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
