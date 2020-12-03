<template>
  <div class="kanban">
    <div
      class="column"
      :style="{ backgroundColor: column.color }"
      v-for="(column, index) in data"
      :key="index"
    >
      <div class="column-header">
        {{ column.name }}
      </div>

      <div class="column-body">
        <div class="create-task" @click="create_task(index)">Create Task</div>
      </div>
    </div>
    <b-modal ref="create-task-modal"  title="Create Task">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  methods: {
    create_task(index_column) {
        console.log(index_column);
      this.$refs["create-task-modal"].show()
    },
  },
};
</script>

<style>
.kanban {
  width: 100%;
  height: 100%;
  background-color: bisque;
}
.column {
  height: 600px;
  width: 300px;
  border-radius: 10px;
  display: inline-block;
  margin: 25px;
  padding: 10px;
  -webkit-box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.75);
}
.column-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 32px;
  font-weight: bold;
}
.column-body {
  height: calc(100% - 60px);
  border-radius: 10px;
  padding: 5px;
  background-color: #ffffff7c;
}
.create-task {
  width: 100%;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.create-task:hover {
  background-color: rgb(158, 155, 155);
}
</style>