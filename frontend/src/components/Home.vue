<template>
  <div class="home">
    <h1>2DV515 - Assignment 3</h1>

    <p id="error" v-if="error">{{error}}</p>
    

    <input type="text" name="input" id="input" v-model="input">
    <input type="submit" value="Search" v-on:click="getData()" v-on:submit.prevent>

    <table class="center" v-if="data">
      <tr>
        <th>URL</th>
        <th>Score</th>
      </tr>
      <tr v-for="result in data" :key="result.url">
        <td>{{result.url}}</td>
        <td>{{result.score}}</td>
      </tr>
    </table>

    <!--
    <p v-if="data">{{data}}</p>
    -->

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
    data: function() {
        return {
            input: null,
            data: null,
            error: "",
        }
    },
    methods: {
      getData: function() {
          axios.get("http://localhost:3000/api?search=" + this.input).then((response) => {
              if (response != null) {
                  let sliced = response.data.slice(0, 5)
                  this.data = sliced;
              } else {
                  console.log(response);
              }
          })
      },

    }
}
</script>