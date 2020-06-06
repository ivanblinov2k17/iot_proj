<template>
  <div class="hello">
    <Chart :chartData="b_array" />
    <div v-for="item in connected_ids" :key="item">{{item}}</div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "./Chart";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: { Chart },
  data() {
    return {
      polling: null,
      all_measures: null,
      connected_ids: [],
      measures_by_id: [],
      b_array: [0.1, 0.2, 0.3],
      last_mes_id: 0
    };
  },
  methods: {
    pollData() {
      let self = this;
      this.polling = setInterval(() => {
        axios.get("http://localhost:3000/").then(response => {
          let watch = 0;
          self.all_measures = response;
          let last_client = response.data[response.data.length - 1].id_client;
          //   if (!(last_client in self.connected_ids)) {
          //     self.connected_ids.push(last_client);
          //   } чето не заробило хз почему
          self.connected_ids.forEach(el => {
            if (el == last_client) {
              watch = 1;
            }
          });
          if (watch == 0) {
            self.connected_ids.push(last_client);
            self.measures_by_id.push({
              id: last_client,
              values: [response.data[response.data.length - 1]]
            });
            self.last_mes_id = response.data[response.data.length - 1].id;
          } else if (
            self.last_mes_id != response.data[response.data.length - 1].id
          ) {
            self.measures_by_id.forEach(el => {
              if (el.id == last_client) {
                el.values.push([response.data[response.data.length - 1]]);
              }
            });
            self.last_mes_id = response.data[response.data.length - 1].id;

            console.log(
              self.measures_by_id,
              self.last_mes_id,
              response.data[response.data.length - 1].id
            );
          }
          watch = 0;
        }); //here we need to get info from api
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
