import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'
import login from '@/pages/login'
import snippets from '@/pages/snippets-list'

Vue.use(VueRouter)
Vue.use(Auth, {
  issuer: 'https://dev-593134.oktapreview.com/oauth2/default',
  client_id: '0oaf5r6b3iHA6zH8Q0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

export default new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/implicit/callback',
        component: Auth.handleCallback()
      },
      {
        path: '/',
        name: 'home',
        component: login
      },
      {
        path: '/list',
        name: 'snippets-list',
        component: snippets
      }
    ]
})
