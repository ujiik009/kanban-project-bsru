<template>
  <div id="app">
    <!--================ nav bar ========================-->
    
    <b-navbar toggleable="lg" type="dark" class="nav" v-if="isLogin">
      <b-navbar-brand href="#" style="color: black">Kanban BSRU</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link to="/project">Project</router-link></b-nav-item
          >
          <b-nav-item href="#">Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div class="display_fullanme">
            {{ user_info.first_name }} {{ user_info.last_name }}
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!--================ nav bar ========================-->
    <router-view />
  </div>
</template>
<script>
export default {
  created(){
    // ocalStorage.getItem('token') == null)
    
    if((localStorage.getItem('token') == null)){
      this.isLogin = false
    }else{
       this.user_info = JSON.parse(localStorage.getItem("user_info"));
       this.isLogin = true
    }
  },
  data(){
    return {
      isLogin:false,
      user_info:{}
    }
  }
};
</script>

<style>
#app {
  background-color: rgb(214, 214, 214);
  height: 100vh;
  /* max-height: auto; */
}
.nav {
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
