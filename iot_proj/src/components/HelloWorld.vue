<template>
  <div class="hello">
    <h1>Моё приложение!</h1>
    {{all_measures}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      polling: null,
      all_measures: null
    };
  },
  methods: {
    pollData() {
      let self = this;
      this.polling = setInterval(() => {
        axios
          .get("http://localhost:3000/")
          .then(response => (self.all_measures = response)); //here we need to get info from api
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.pollData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
