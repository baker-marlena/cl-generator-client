<template>
  <div id="app">
    <header>
      <h1>Cover Letter Helper</h1>
      <div id="login-logout">
      </div>
      <nav>
        <a v-if='authenticated' class='nav-link auth-link' v-on:click='logout' id='logout-button'><i class="far fa-sign-out-alt"></i> Logout</a>
        <a v-else v-on:click='login' class='nav-link auth-link' id='login-button'><i class="far fa-sign-in-alt"></i> Login</a>
        <router-link to='/list' class='nav-link' v-if='authenticated'><i class="fal fa-list-alt"></i> List</router-link>
        <router-link to='' class='nav-link' v-if='authenticated'><i class="far fa-plus-hexagon"></i> Add</router-link>
        <router-link to='' class='nav-link' v-if='authenticated'><i class="far fa-question-circle"></i> About</router-link>
      </nav>
    </header>
    <div class="router-wrapper">
      <router-view/>
    </div>
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
h1 {
  margin: 0;
  color: #BF1C83;
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
  /* border: 2px solid #2B1AB5; */
}
.auth-link {
  background-color: #1C61BF;
  cursor: pointer;
}
.nav-link:hover {
  background-color: white;
  color: #7A21A8;
}
.auth-link:hover {
  color: #1C61BF;
}
.router-wrapper {
  grid-column: 2/4;
  align-self: center;
   margin-top: 150px;
}
</style>
