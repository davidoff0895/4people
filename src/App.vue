<template>
  <router-view/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  @Component({
    name: 'app'
  })
  export default class App extends Vue {

  }
</script>

<style lang="scss">
  body {
    font-family: 'Roboto', sans-serif;
  }
</style>
