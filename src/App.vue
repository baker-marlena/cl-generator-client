<template>
  <div id="app">
    <header>
      <h1><router-link class="logo-link" to="/"><i class="far fa-file-alt"></i> Cover Letter Helper</router-link></h1>
      <div id="login-logout">
      </div>
      <nav>
        <router-link to='/list' class='nav-link' v-if='authenticated'><i class="fal fa-list-alt"></i> List</router-link>
        <router-link to='/add' class='nav-link' v-if='authenticated'><i class="far fa-plus-hexagon"></i> Add</router-link>
        <router-link to='/register' class='nav-link register-link' v-if='!authenticated'><i class="far fa-star"></i> Register</router-link>
        <a v-if='authenticated' class='nav-link auth-link' v-on:click='logout' id='logout-button'><i class="far fa-sign-out-alt"></i> Logout</a>
        <a v-else v-on:click='login' class='nav-link auth-link' id='login-button'><i class="far fa-sign-in-alt"></i> Login</a>
      </nav>
    </header>
    <div class="router-wrapper">
      <router-view/>
    </div>
    <footer>
      <small>Copyright 2018 Marlena Baker <a class="site-link" href="https://marlenabaker.tech"><i class="far fa-globe"></i></a></small>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      authenticated: false
    }
  },
  created () {
    this.isAuthenticated()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    login () {
      this.$auth.loginRedirect('/list')
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()

      // Navigate back to home
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style>
html {
  margin: 0px;
  padding: 0px;
}
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 20% 30% 30% 20%;
}
header {
  grid-column: 1/5;
  background-color: white;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  border-bottom: 5px solid #1AADB5;
  position: fixed;
  width: 100%;
}
.logo-link {
  margin: 0;
  color: #BF1C83;
  font-size: 1.5rem;
  align-self: end;
  text-decoration: none;
  padding: 10px;
}
.logo-link:hover {
  margin: 0;
  color: white;
  background-color: #BF1C83;
  font-size: 1.5rem;
  align-self: end;
}
#login-logout {
  grid-column: 2/3;
  align-self: end;
}
nav {
  grid-column: 3/4;
  align-self: end;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.nav-link {
  padding: 15px;
  text-decoration: none;
  color: white;
  background-color: #7A21A8;
  margin:0;
  cursor: pointer;
}
.auth-link {
  background-color: #1C61BF;
}
.register-link {
  background-color: #BF1C83;
}
.nav-link:hover {
  background-color: white;
  color: #7A21A8;
}
.auth-link:hover {
  color: #1C61BF;
}
.register-link:hover {
  color: #BF1C83;
}
.router-wrapper {
  grid-column: 2/4;
  align-self: center;
   margin-top: 150px;
}
footer {
  position: fixed;
  bottom: 0;
  text-align: right;
  width: 100%;
  padding: 10px 0 10px 0;
}
footer small {
  margin-right: 20px;
  background-color: white;
  z-index: 999;
  padding: 5px;
  color: #1C61BF;
}
.site-link {
  color: #7A21A8;
  text-decoration: none;
  padding: 3px;
}
.site-link:hover {
  background-color: #7A21A8;
  color: white;
}
</style>
