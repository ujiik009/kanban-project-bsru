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
        <div
          class="drop_zone"
          @dragenter.prevent="drop_zone_enter"
          @dragleave.prevent="drop_zone_leave"
          @dragover.prevent
          @drop="drop_item(index, 0, $event)"
        ></div>
        <div v-for="(task, task_index) in column.tasks" :key="task_index">
          <div
            class="task"
            :draggable="true"
            @dragstart="start_move(task_index, index)"
          >
            {{ task.task_name }}
            {{ task.task_detail }}
          </div>
          <div
            class="drop_zone"
            @dragenter.prevent="drop_zone_enter"
            @dragleave.prevent="drop_zone_leave"
            @dragover.prevent
            @drop="drop_item(index, task_index + 1, $event)"
          ></div>
        </div>
        <div class="create-task" @click="create_task(index)">Create Task</div>
      </div>
    </div>
    <b-modal ref="create-task-modal" title="Create Task" hide-footer>
      <!-- <input
        class="input-task-name"
        v-model="task_name"
        @keyup.13="submit_create_task"
      /> -->
      
      <b-form-group label="Task Name" label-for="task_name">
        <b-form-input
          id="task-name"
          v-model="record.task_name"
          type="text"
          required
          placeholder="Enter Task Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Task Detail" label-for="task_detail">
        <b-form-input
          id="task_detail"
          v-model="record.task_detail"
          type="text"
          required
          placeholder="Enter Task Detail"
        ></b-form-input>
      </b-form-group>
      <b-button @click="submit_create_task"  variant="primary" style="float: right;" >
        Create
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    create_task_submit: Function,
    move_item_task: Function,
  },
  methods: {
    create_task(index_column) {
      this.current_column_index = index_column;
      this.$refs["create-task-modal"].show();
    },
    submit_create_task() {
      this.data[this.current_column_index].tasks.push({
        task_name: this.record.task_name,
        // task_detail: this.record.task_detail,
      });
    },
    start_move(task_index, column_index) {
      this.current_column_index = column_index;
      this.current_task_index = task_index;
    },
    drop_zone_enter(event) {
      event.target.style.height = "100px";
      event.target.style.borderStyle = "dotted";
      event.target.style.transition = "height 0.5s";
    },
    drop_zone_leave(event) {
      event.target.style.height = "10px";
      event.target.style.borderStyle = "none";
      event.target.style.transition = "height 0.5s";
    },
    drop_item(column_index, task_index, event) {
      var item = this.data[this.current_column_index].tasks[
        this.current_task_index
      ];
      // remove task before
      this.data[this.current_column_index].tasks.splice(
        this.current_task_index,
        1
      );
      // move to
      this.data[column_index].tasks.splice(task_index, 0, item);

      this.drop_zone_leave(event);
    },
  },
  data() {
    return {
      current_column_index: "",
      current_task_index: "",
      record: {
        task_name: "",
        task_detail: "",
      },
      data: [
        {
          name: "todo",
          color: "#F5B271",
          tasks: [
            {
              task_name: "test1",
              task_detail: "Detail",
            },
            {
              task_name: "test2",
              task_detail: "Detail",
            },
          ],
        },
        {
          name: "doing",
          color: "#BEA771",
          tasks: [
            {
              task_name: "test3",
              task_detail: "Detail",
            },
          ],
        },
        {
          name: "done",
          color: "#1B796F",
          tasks: [],
        },
      ],
    };
  },
};
</script>

<style>
.kanban {
  width: 100%;
  height: 100%;
  background-color: white;
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
  overflow: auto;
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

.input-task-name {
  width: 100%;
}
.task {
  /* position: relative; */
  width: auto;
  height: 100px;
  border-radius: 2px;
  margin: 10px;
  background-color: bisque;
}
.drop_zone {
  height: 10px;
}
</style>