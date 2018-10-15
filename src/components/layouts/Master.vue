<template>
    <div id="app">
        <ul v-if="loggedIn" class="nav">
            <li><router-link :to="{ name: 'logout' }">Logout</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
// require('bootstrap/dist/css/bootstrap.css') 
// require('bootstrap-vue/dist/bootstrap-vue.css')

export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
    
}
</script>

<style>
@import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
 
  .nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: flex-end;
    background: #F5F8FA;
    border-bottom: 1px solid lightgrey;
    margin-bottom: 24px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  .nav a {
    color: black;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase;
  }
</style>