<template lang="html">
  <form @submit.prevent="sendRegistration">
    <input class="text-input" type="text" placeholder="First Name" v-model="user.profile.firstName"/>
    <p class="error-text">{{firstNameErrorMessage}}</p>
    <input class="text-input" type="text" placeholder="Last Name" v-model="user.profile.lastName" />
    <p class="error-text">{{lastNameErrorMessage}}</p>
    <input class="text-input" type="text" placeholder="Email Address" v-model="user.profile.email"/>
    <p class="error-text">{{emailErrorMessage}}</p>
    <input class="text-input" type="text" placeholder="Password" v-model="user.credentials.password.value"/>
    <small>Password should be 8 letters long and contain at least one of each: uppercase letters, lowercase letters, and numbers</small>
    <p class="error-text">{{passwordCriteriaErrorMessage}}</p>
    <input class="text-input" type="text" placeholder="Confirm Password" v-model="passwordConfirm" />
    <p class="error-text">{{passwordMatchErrorMessage}}</p>
    <input class="submit-input" type=submit value="Submit Registraion"/>
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
      firstNameErrorMessage: '',
      lastNameErrorMessage: '',
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
      console.log('final result', this.verifyCredentials());
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
      let firstName = this.verifyFirstName()
      let lastName = this.verifyLastName()
      console.log(passwordMatch, password, email, firstName, lastName);
      return passwordMatch && password && email && firstName && lastName
    },
    verifyFirstName() {
      if(this.user.profile.firstName === ''){
        this.firstNameErrorMessage = 'Please enter a first name.'
      } else {
        return true
      }
    },
    verifyLastName() {
      if(this.user.profile.lastName === ''){
        this.lastNameErrorMessage = 'Please enter a last name.'
      } else {
        return true
      }
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
      if(!regexTest.test(this.user.credentials.password.value)) {
        this.passwordCriteriaErrorMessage = 'Please enter a valid password.'
      } else {
        console.log('criteria', !regexTest.test(this.user.credentials.password.value) && this.user.credentials.password.value !== '');
        return true
      }
    },
    verifyEmail() {
      let regexTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(!regexTest.test(this.user.profile.email)) {
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
  input {

  }
  textarea:focus, input:focus{
    outline: none;
  }
  .error-text {
    color: #E8220A;
  }
  .text-input {
    font-size: .8rem;
    padding: 5px;
    border-bottom: 1px solid #7A21A8;
    border-radius: 2px;
    outline: none;
    box-shadow: none;
    background: transparent;
    border-top: transparent !important;
    border-left: transparent !important;
    border-right: transparent !important;
    margin: 5px 0 5px 0;
    color: #1C61BF;
  }
  .submit-input {
    padding: 5px 0 5px 0;
    font-size: 1rem;
    background-color: #1AADB5;
    color: white;
  }
  .submit-input:hover {
    background-color: white;
    border: 2px solid #1AADB5;
    color: #1AADB5;
  }
</style>
