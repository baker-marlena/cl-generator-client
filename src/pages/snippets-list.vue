<template lang="html">
  <div>
    <select v-model="selectedOption">
      <option class="option-box" v-for="topic in sortedOptions" :key="topic">{{topic}} <i class="far fa-angle-down"></i></option>
    </select>
    <ul>
      <listItem
      v-for="(snippet, index) in displaySnippets"
      :key="snippet.text"
      :class="{highlighted: index %2 == 0}"
      :itemData="snippet"
      :getSnippets="getSnippets"
      :userEmail="userEmail"
      ></listItem>
    </ul>
  </div>
</template>

<script>
import listItem from '../components/list-item'

export default {
  components: {
    listItem
  },
  props: ['getUserToken', 'userEmail', 'setLogout'],
  data() {
    return {
      options: [],
      snippets: [],
      selectedOption: '',
      modalShow: false,
      editId: null,
      authenticated: false,
      GoogleAuth: null
    }
  },
  created() {
    this.GoogleAuth = gapi.auth2.getAuthInstance();
    let authStatus = this.GoogleAuth.isSignedIn.get()
    if (authStatus) {
      this.getSnippets();
      this.authenticated = true;
    } else {
      this.setLogout();
      this.$router.push('/');
    }
  },
  methods: {
    getSnippets() {
      let userInstance = this.GoogleAuth.currentUser.get()
      let token = userInstance.getAuthResponse().id_token
      fetch(`http://localhost:3000/items/list?email=${this.userEmail}`, {
        method: 'GET',
        headers: {
          token: token
        }
      })
        .then(res => res.json())
        .then(res => {
          this.options = res.data.tags
          this.snippets = res.data.list.map(entry => {
            return {
              topics: entry.tags,
              text: entry.text,
              id: entry.id,
              type: entry.type
            }
          })
        })
    }
  },
  computed: {
    displaySnippets() {
      if(this.selectedOption !== '') {
        return this.snippets.filter(snippet => {
          return snippet.topics.map(topic => topic.toLowerCase()).includes(this.selectedOption.toLowerCase())
        })
      }
    },
    sortedOptions() {
      return this.options.map(option => option.toLowerCase()).sort();
    }
  }
}
</script>

<style lang="css" scoped>
 select {
   font-size: 1.1rem;
   align-self: center;
   background: transparent;
   border-top: transparent !important;
   border-left: transparent !important;
   border-right: transparent !important;
   border-bottom: 1px solid #BF1C83;
   color: #BF1C83;
 }
 ul {
   list-style: none;
 }
 h3 {
   margin: 0;
 }
 .highlighted {
   background-color: #EDEDED;
 }
</style>
