<template>
  <div class="login-box">
    <b-alert v-model="show_error" variant="danger" dismissible>
      {{ error_message }}
    </b-alert>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="UserName"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="username"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password"
        label-for="input-password"
      >
        <b-form-input
          id="input-password"
          type="password"
          v-model="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <div class="center">
        <b-button variant="info" @click="submit_login">Login</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "ikool009",
      password: "028900407",
      show_error: false,
      error_message: "",
    };
  },
  methods: {
    async submit_login() {
      const result = await axios.post(
        process.env.VUE_APP_API + "/services/auth/login.php",
        {
          username: this.username,
          password: this.password,
        }
      );

      if (result.data.status == true) {
        localStorage.setItem(
          "user_info",
          JSON.stringify(result.data.data.user_info)
        );
        localStorage.setItem("token", result.data.data.token);
        this.$router.push({ name: "project" });
      } else {
        this.error_message = "Can not Login";
        this.show_error = true;
      }
    },
  },
};
</script>

<style>
.login-box {
  display: inline-block;
  width: 500px;

  background-color: white;
  padding: 50px;
  border-radius: 10px;
  margin-top: 200px;
  margin-left: calc(50% - (500px / 2));
}
.center {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>