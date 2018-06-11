// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBONY5e4Y8-SUHybfvx8Ybq8Lgaw3LdPdc",
  authDomain: "coverletter-gen.firebaseapp.com",
  databaseURL: "https://coverletter-gen.firebaseio.com",
  projectId: "coverletter-gen",
  storageBucket: "coverletter-gen.appspot.com",
  messagingSenderId: "9225906390"
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
