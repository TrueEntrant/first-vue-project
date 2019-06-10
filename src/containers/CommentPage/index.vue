<template>
  <div id="comments-page">
    <header>Leave your thoughts here!</header>
    <div class="content-wrapper">
      <div class="form-holder">
        <Form v-bind:onSubmit="onCommentAdd" v-bind:isFromComment="false"></Form>
      </div>
      <p class="underscore"></p>
      <div v-for="item in comments" :key="item.id" class="comments-holder">
        <CommentsList
          v-bind:comment="item"
          v-bind:removeComment="onCommentDelete"
          v-bind:changeComment="onCommentChange"
        />
      </div>
    </div>
    <footer>&#169; Company name</footer>
  </div>
</template>


<script>
import Form from "@/components/Form";
import CommentsList from "@/components/Comment/List";
import * as Help from "@/shared/helpers";
import { mapActions } from "vuex";

export default {
  name: "comments-page",

  components: {
    Form,
    CommentsList
  },
  methods: {
    ...mapActions(["update", "set", "storeSetAsync"]),
    onDataUpdates: function() {
      this.storeSetAsync();
    },
    onCommentAdd: function(comment, callback) {
      this.comments.push(comment);
      this.set(this.comments);
      this.onDataUpdates();
      callback && callback();
    },
    onCommentChange: function(comment, callback) {
      this.set(Help.update(this.comments, comment, "id"));
      this.onDataUpdates();
      callback && callback();
    },
    onCommentDelete: function(id) {
      this.set(Help.filter(this.comments, id, "id"));
      this.onDataUpdates();
    }
  },
  computed: {
    comments: function() {
      return this.$store.state.comments;
    }
  }
};
</script>

<style scoped>
#comments-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-wrapper {
  margin-top: 80px;
  margin-bottom: 60px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 0.5px solid rgb(196, 194, 194); */
  border-radius: 5px;
  box-shadow: 5px 2px 45px 13px rgba(0, 0, 0, 0.14);
}
footer,
header {
  position: fixed;
  width: 100%;
  background: rgb(33, 134, 112);
  color: rgb(193, 240, 224);
  min-height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  min-height: 50px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 5px 2px 20px 13px rgba(0, 0, 0, 0.14);
  z-index: 10;
}
footer {
  bottom: 0;
  min-height: 30px;
  line-height: 30px;
}
.form-holder {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.comments-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
