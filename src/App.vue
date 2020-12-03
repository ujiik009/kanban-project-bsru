<template>
  <div id="app">
    <Kanban :data="data" :create_task_submit="create_task_submit" />
  </div>
</template>

<script>
import Kanban from "./components/Kanban";

export default {
  name: "App",
  components: {
    Kanban,
  },
  data() {
    return {
      data: [
        {
          name: "todo",
          color: "#F5B271",
          tasks: [
            {
              task_name: "test",
            },
          ],
        },
        {
          name: "doing",
          color: "#BEA771",
          tasks: [
            {
              task_name: "test",
            },
          ],
        },
        {
          name: "done",
          color: "#1B796F",
          tasks: [
            {
              task_name: "test",
            },
          ],
        },
      ],
    };
  },
  methods: {
    create_task_submit(column_index, item) {
      this.data[column_index].tasks.push(item);
    },
  },
};
</script>

<style>
#app {
  height: 100vh;
}
</style>
