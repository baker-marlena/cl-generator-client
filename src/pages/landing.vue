<template lang="html">
  <main>
    <h3>Welcome!</h3>
    <p>
      This is a site for storing and browsing cover letter snippets to make writing cover letters a little less tedius. Each snippet can be tagged with as many tags as you need to find it easily later. This way you have a collection of building blocks that you wrote to make cover letters that are uniquely yours and tailored for the job at hand.
    </p>
    <br />
    <p>
      Eventually, I'd like to add sections for storing relevant stories and back-pocket interview answers to help job seakers prepare for the interview process, but I'm not sure when that will become a reality.
    </p>

    <div class="login-modal" v-if="showLoginModal">
      <span class="login-button" @click="onSignIn"><i class="fab fa-google google-logo"></i> Login with Google</span>
    </div>
  </main>
</template>

<script>

export default {
  name: 'landing',
  props: ['showLoginModal', 'onSignIn']
}
</script>

<style lang="css" scoped>
p {
  text-align: left;
  width: 50%;
  margin: 0 auto;
}
.login-modal {
  background-color: white;
  padding: 50px 15px 50px 15px;
  display: flex;
  flex-flow: column;
  position: fixed;
  border: 1px solid #1AADB5;
  left: 36%;
  top: 200px;
  width: 25%;
  text-align: center;
}
.login-button {
  display: inline-block;
  padding: 5px;
  border: 1px solid #0057e7;
  color: #0057e7;
  background-color: #ffa700;
  cursor: pointer;
}
.google-logo {
  color: white;
}
.login-button:hover {
  background-color: #0057e7;
  color: white;
}
</style>
