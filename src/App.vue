<template>
  <div id="app">
    <CommentPage></CommentPage>
  </div>
</template>

<script>
import CommentPage from "./containers/CommentPage";
import { store } from "@/store";

export default {
  name: "app",
  store,
  components: {
    CommentPage
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 700;
}
.full-width {
  width: 100%;
}
.input-style {
  background: transparent;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px;
  width: 100%;
}
.content-style {
  background: transparent;
  padding: 5px;
  font-size: 15px;
  width: 100%;
  text-align: start;
  max-width: 90%;
}
img {
  display: inline-block;
  max-width: 150px;
  width: 50%;
  max-height: 150px;
  z-index: 0;
}
.btn {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgb(33, 134, 112);
  color: rgb(193, 240, 224);
  font-weight: 700;
  background: rgb(33, 134, 112);
  text-transform: capitalize;
}
.link {
  border: 0;
  background: transparent;
  text-transform: capitalize;
}
.underscore {
  margin: 40px;
  width: 80%;
  height: 1px;
  border: 0.2px solid lightgrey;
}
.link:hover {
  text-decoration: underline;
  color: rgb(33, 134, 112);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
