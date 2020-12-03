<template>
  <div id="app">
    <Kanban :data="data"/>
  </div>
</template>

<script>
import Kanban from "./components/Kanban"


export default {
  name: 'App',
  components: {
    Kanban
  },
  data(){
    return {
      data:[
        {
          name:"todo",
          color:"#F5B271",
          tasks:[]
        },
         {
          name:"doing",
          color:"#BEA771",
          tasks:[]
        },
         {
          name:"done",
          color:"#1B796F",
          tasks:[]
        }
      ]
    }
  }
}
</script>

<style>
  #app {
  height: 100vh;
  }
</style>
