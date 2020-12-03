<template>
  <div id="app">
    <Kanban/>
  </div>
</template>

<script>
import Kanban from "./components/Kanban"


export default {
  name: 'App',
  components: {
    Kanban
  }
}
</script>

<style>
  #app {
  height: 100vh;
  }
</style>
