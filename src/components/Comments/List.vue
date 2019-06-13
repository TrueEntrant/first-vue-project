<template>
  <div id="comment-wrapper">
    <div class="full-width">
      <div v-for="item in comments" :key="item.id">
        <Item
          v-if="startEdit"
          v-bind:onChange="onChange"
          v-bind:onRemove="onRemove"
          v-bind:onResponse="onResponse"
          v-bind:comment="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item";
import * as Help from "@/shared/helpers";

export default {
  name: "comments-list",
  components: { Item },
  props: ["comments", "remove", "change"],
  data: () => ({
    startEdit: true,
    startComment: false
  }),
  methods: {
    onRemove(id) {
      this.change(Help.filter(this.comments, id, "id"));
    },
    onChange(comment, callback) {
      this.change(Help.update(this.comments, comment, "id"));
      callback && callback();
    },
    onResponse(...args) {
      console.log(...args);
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
</style>
