<template lang="html">
  <form @submit.prevent="sendRegistration">
    <input type="text" placeholder="First Name" v-model="user.profile.firstName"/>
    <input type="text" placeholder="Last Name" v-model="user.profile.lastName" />
    <input type="text" placeholder="Email Address" v-model="user.profile.email"/>
    <p class="error-text">{{emailErrorMessage}}</p>
    <small>Password should be 8 letters long and contain at least one of each: uppercase letters, lowercase letters, and numbers</small>
    <input type="text" placeholder="Password" v-model="user.credentials.password.value"/>
    <p class="error-text">{{passwordCriteriaErrorMessage}}</p>
    <input type="text" placeholder="Confirm Password" v-model="passwordConfirm" />
    <p class="error-text">{{passwordMatchErrorMessage}}</p>
    <input type=submit value="Submit Registraion"/>
  </form>
</template>

<script>
import OktaAuth from '@okta/okta-auth-js';

export default {
  name: 'registrationPage',
  data() {
    return {
      passwordConfirm: '',
      passwordMatchErrorMessage: '',
      passwordCriteriaErrorMessage: '',
      emailErrorMessage: '',
      user: {
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          login: ''
        },
        credentials: {
          password : {
            value: ''
          }
        }
      }
    }
  },
  methods: {
    sendRegistration() {
      if(this.verifyCredentials()){
        this.user.profile.login = this.user.profile.email
        fetch('http://localhost:3000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
        .then(res => res.json)
        .then(res => {
          console.log(res);
        })
      }
    },
    verifyCredentials() {
      let passwordMatch = this.verifyPasswordMatch()
      let password = this.verifyPasswordCritera()
      let email = this.verifyEmail()
      let firstName = this.user.profile.firstName !== ''
      let lastName = this.user.profile.lastName !== ''
      return passwordMatch && password && email && firstName && lastName
    },
    verifyPasswordMatch() {
      if(this.user.credentials.password.value !== this.passwordConfirm) {
        this.passwordMatchErrorMessage = 'Passwords do not match.'
      } else {
        return true
      }
    },
    verifyPasswordCritera() {
      let regexTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      if(!regexTest.test(this.user.credentials.password.value) && this.user.credentials.password.value !== '') {
        this.passwordCriteriaErrorMessage = 'Please enter a valid password.'
      } else {
        return true
      }
    },
    verifyEmail() {
      let regexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!regexTest.test(this.user.profile.email) && this.user.profile.email !== '') {
        this.emailErrorMessage = 'Please enter a valid email address.'
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="css">
  form {
    display: flex;
    flex-flow: column nowrap;
    width: 50%;
    margin: 0 auto;
  }
  .error-text {
    color: #E8220A;
  }
</style>
