import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'
import snippets from '@/pages/snippets-list'
import add from '@/pages/add-snippet'
import registration from '@/pages/registration'
import landing from '@/pages/landing'

Vue.use(VueRouter)
Vue.use(Auth, {
  issuer: 'https://dev-593134.oktapreview.com/oauth2/default',
  client_id: '0oaf5r6b3iHA6zH8Q0h7',
  redirect_uri: 'https://coverletter-gen.firebaseapp.com/implicit/callback',
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
        component: landing,
        props: true
      },
      {
        path: '/register',
        name: 'registration',
        component: registration
      },
      {
        path: '/list',
        name: 'snippets-list',
        component: snippets,
        props: true
      },
      {
        path: '/add',
        name: 'add-snippet',
        component: add,
        props: true
      }
    ]
})
