<template>
  <div class="hello">
    <div v-for="item in measures_by_id" :key="item.id">
      <v-row>
        <v-col>
          <h1>Уровень жидкости</h1>
          <Chart v-if="loaded" :yo="hy_array" />
        </v-col>
        <v-col>
          <h1>Уровень температуры</h1>
          <Chart v-if="loaded" :yo="he_array" />
        </v-col>
      </v-row>
      <div id="track">Ваша бочка у нас в заложниках(здесь){{location}}</div>
    </div>
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
      hy_array: [],
      he_array: [],
      co_array: [],
      last_mes_id: 0,
      loaded: 0,
      location: [0, 0]
    };
  },
  methods: {
    pollData() {
      let self = this;
      this.polling = setInterval(() => {
        axios.get("http://localhost:3000/").then(response => {
          self.loaded = 1;
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
                el.values.push(response.data[response.data.length - 1]);
              }
            });
            self.hy_array.push(
              response.data[response.data.length - 1].hydration
            );
            self.he_array.push(response.data[response.data.length - 1].height);
            self.co_array.push(response.data[response.data.length - 1].coords);
            self.last_mes_id = response.data[response.data.length - 1].id;
            self.location = response.data[response.data.length - 1].coords;
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
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

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
#track {
  font-size: 2.5rem;
  font-family: "Permanent Marker", cursive;
}
</style>