<template>
  <div id="app">
    <div id="header">BochkaTracker</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#header {
  height: 4rem;
  width: 100%;
  margin: 0rem;
  padding: 0rem;
  background-color: rgb(235, 116, 80);
  font-size: 2.5rem;
  font-family: "Permanent Marker", cursive;
}
</style>