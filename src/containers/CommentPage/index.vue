<template>
  <div id="comments-page">
    <div class="content-wrapper" ref="autoHeight">
      <div class="form-holder">
        <Form v-bind:onSubmit="onCommentAdd" v-bind:isFromComment="false"></Form>
      </div>
      <p class="underscore"></p>

      <CommentsList v-bind:comments="comments" v-bind:change="onCommentsChange"/>
    </div>
    <md-toolbar class="footer">
      <span class="title">&#169; Company name</span>
    </md-toolbar>
  </div>
</template>


<script>
import Form from "@/components/Form";
import CommentsList from "@/components/Comments/List";
import { mapActions } from "vuex";
import smoothHeight from "vue-smooth-height";
import { COMMENTS_SET, COMMENTS_ADD } from "@/shared/constants";

export default {
  name: "comments-page",
  mixins: [smoothHeight],
  mounted() {
    this.$smoothElement({
      el: this.$refs.autoHeight,
      hideOverflow: true
    });
  },
  data: () => ({
    menuVisible: false,
    prevHeight: 0
  }),
  components: {
    Form,
    CommentsList
  },
  methods: {
    ...mapActions([COMMENTS_ADD, COMMENTS_SET]),

    onCommentAdd(comment, callback) {
      this[COMMENTS_ADD](comment);
      callback && callback();
    },
    onCommentsChange(comments, callback) {
      this[COMMENTS_SET](comments);
      callback && callback();
    }
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  }
};
</script>

<style scoped>
#comments-page {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-wrapper {
  margin-top: 20px;
  margin-bottom: 60px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 5px 2px 45px 13px rgba(0, 0, 0, 0.14);
}
.md-toolbar.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  min-height: 40px;
  line-height: 30px;
  font-size: 15px;
}
.form-holder {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-holder {
  position: relative;
  margin: 5px;
}
.comments-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  transition: height 0.3s;
}
</style>
