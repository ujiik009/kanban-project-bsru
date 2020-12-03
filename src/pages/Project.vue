<template>
  <div style="height: 100%">
    <div class="project-content">
      <div class="project-content-title">
        <div style="font-size: 26px">Project</div>
        <div>
          <b-button
            variant="primary"
            @click="
              create_project_modal = true;
              action = 'create';
            "
            >Create Project</b-button
          >
        </div>
      </div>
      <div class="project-content-panel">
        <b-form-input
          id="input-filter-project"
          v-model="text_search"
          style="width: 200px"
          placeholder="Search Your Project"
        ></b-form-input>
      </div>

      <div class="project-content-list">
        <b-row>
          <b-col
            cols="3"
            v-for="projects in projects"
            :key="projects.project_id"
            style="margin-top: 20px"
          >
            <div
              class="project-content-box"
              @click="openKanban(projects.project_id)"
            >
              <div style="font-size: 25px; font-weight: bold">
                {{ projects.project_name }}
              </div>
              <div style="top: 7px; position: absolute; right: 7px">
                <div
                  style="color: #0169da; cursor: pointer"
                  @click="show_edit_modal(projects)"
                >
                  Edit
                </div>
              </div>
              <div style="bottom: 7px; position: absolute; right: 7px">
                {{ projects.project_start }} - {{ projects.project_end }}
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal v-model="create_project_modal" title="Create Project" hide-footer>
      <div>
        <b-form-group label="Project Name" label-for="project_name">
          <b-form-input
            id="project_name"
            v-model="record.project_name"
            type="text"
            required
            placeholder="Enter Project Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Project Start" label-for="project_start">
          <b-form-input
            id="project_start"
            v-model="record.project_start"
            type="date"
            required
            placeholder="Enter Project Start"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Project End" label-for="project_end">
          <b-form-input
            id="project_end"
            v-model="record.project_end"
            type="date"
            required
            placeholder="Enter Project End"
          ></b-form-input>
        </b-form-group>
        <div>
          <b-button
            v-if="action == 'create'"
            style="float: right"
            @click="submit_create_project"
            variant="primary"
          >
            Create
          </b-button>
          <b-button
            v-else
            style="float: right"
            @click="submit_update_project"
            variant="primary"
          >
            update
          </b-button>
        </div>
        <b-alert v-model="show_error" variant="danger" dismissible>
          {{ error_message }}
        </b-alert>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.get_project();
  },
  data() {
    return {
      user_info: {},
      text_search: "",
      projects: [],
      error_message: "",
      show_error: false,
      create_project_modal: false,
      action: "create", // create or update defult to create
      record: {
        project_name: "",
        project_start: "",
        project_end: "",
        project_id: "",
      },
    };
  },
  methods: {
    openKanban(project_id) {

    
      this.$router.push({ path: "/kanban/"+project_id });
    },
    show_edit_modal(project) {
      this.record = project;
      this.create_project_modal = true;
      this.action = "update";
    },
    async get_project() {
      const result = await axios.get(
        process.env.VUE_APP_API + "/services/projects/list_projects.php",
        {
          headers: {
            ["Authorization"]: localStorage.getItem("token"),
          },
        }
      );

      if (result.data.status == true) {
        this.projects = result.data.data;
      } else {
        this.error_message = "Can not Login";
        this.show_error = true;
      }
    },
    async submit_update_project() {
      const result = await axios.post(
        process.env.VUE_APP_API +
          "/services/projects/edit_project.php?project_id=" +
          this.record.project_id,
        {
          project_name: this.record.project_name,
          project_start: this.record.project_start,
          project_end: this.record.project_end,
        },
        {
          headers: {
            ["Authorization"]: localStorage.getItem("token"),
          },
        }
      );

      if (result.data.status == true) {
        this.get_project();
        this.create_project_modal = false;

        this.record = {
          project_name: "",
          project_start: "",
          project_end: "",
          project_id: "",
        };
      } else {
        this.error_message = "Can not Login";
        this.show_error = true;
      }
    },
    async submit_create_project() {
      const result = await axios.put(
        process.env.VUE_APP_API + "/services/projects/create_project.php",
        {
          project_name: this.record.project_name,
          project_start: this.record.project_start,
          project_end: this.record.project_end,
        },
        {
          headers: {
            ["Authorization"]: localStorage.getItem("token"),
          },
        }
      );

      if (result.data.status == true) {
        this.get_project();
        this.create_project_modal = false;

        this.record = {
          project_name: "",
          project_start: "",
          project_end: "",
        };
      } else {
        this.error_message = "Can not Login";
        this.show_error = true;
      }
    },
  },
};
</script>

<style>
.project-content {
  padding: 20px;
  background-color: white;
  height: 100%;
}
.project-content-title {
  display: flex;
  justify-content: space-between;
}
.project-content-panel {
  margin-top: 10px;
}
.project-content-list {
  padding-top: 20px;
}

.display_fullanme {
  font-size: 20px;
  font-weight: bold;
}

.project-content-box {
  cursor: pointer;
  position: relative;
  padding: 5px;
  height: 100px;
  background-color: white;
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.267);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.267);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.267);
  border-radius: 3px;
}
</style>