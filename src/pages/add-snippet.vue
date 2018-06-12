<template lang="html">
  <form @submit.prevent="sendItem">
    <h3 class="full-width">Add an Item</h3>
    <select v-model="item.type" class="full-width">
      <option disabled hidden>Type</option>
      <option>Snippet</option>
      <!-- <option>Story</option>
      <option>Answer</option> -->
    </select>
    <p class="error-text full-width">{{typeErrorMessage}}</p>
    <textarea rows="12" class="text-input" v-model="item.text" placeholder="Item Text"/>
    <p class="error-text full-width">{{textErrorMessage}}</p>
    <input type='text' class="text-input tag-input" v-model="currentTag" placeholder="Tag" />
    <button @click.prevent="addTag(currentTag)">Add Tag</button>
    <p class="error-text full-width">{{tagsErrorMessage}}</p>
    <ul class="tag-list">
      <li v-for="(tag, index) in item.tags" :key="tag">{{tag}} <span @click="removeTag(index)"><i class="fas fa-times fa-sm"></i></span></li>
    </ul>
    <input class="submit-input full-width" type="submit" value="Add Item" />
  </form>
</template>

<script>
export default {
  name: 'addSnippet',
  props: {
    itemData: {
      type: Object,
      required: false
    },
    userEmail: {
      type: String,
      required: false
    },
    setLogout: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      GoogleAuth: null,
      authenticated: false,
      typeErrorMessage: '',
      textErrorMessage: '',
      tagsErrorMessage: '',
      currentTag: '',
      item: {
        type: 'Type',
        text: '',
        tags: []
      }
    }
  },
  created() {
    this.GoogleAuth = gapi.auth2.getAuthInstance();
    let authStatus = this.GoogleAuth.isSignedIn.get()
    if (authStatus) {
      this.authenticated = true;
    } else {
      this.setLogout();
      this.$router.push('/');
    }
  },
  methods: {
    addTag(tag) {
      if(!this.item.tags.find(el => {
        return el.toLowerCase() === tag.toLowerCase()
      }))
      this.item.tags.push(tag.toLowerCase())
    },
    removeTag(index) {
      this.item.tags.splice(index, 1)
    },
    sendItem() {
      if(this.verifyForm()){
        let token = this.GoogleAuth.currentUser.get().getAuthResponse().id_token
        fetch(`https://coverletter-gen.herokuapp.com/items/add?email=${this.userEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },
          body: JSON.stringify(this.item)
        })
        .then(res => {
          this.item = {
            type: '',
            text: '',
            tags: []
          }
          this.currentTag = ''
        })
      }
    },
    verifyForm () {
      let type = this.verifyType()
      let text = this.verifyText()
      let tags = this.verifyTags()
      return type && text && tags
    },
    verifyType() {
      if (this.item.type === 'Type') {
        this.typeErrorMessage = 'Please select a type.'
      } else {
        return true
      }
    },
    verifyText() {
      if (this.item.text === '') {
        this.textErrorMessage = 'Please enter some text.'
      } else {
        return true
      }
    },
    verifyTags() {
      if (this.item.tags.length === 0) {
        this.tagsErrorMessage = 'Please add at least one tag.'
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="css" scoped>
  form {
    display: grid;
    grid-template-columns: 80% 20%;
    width: 50%;
    margin: 0 auto;
  }
  textarea:focus, input:focus select:focus{
    outline: none;
  }
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
  .text-input {
    font-size: .8rem;
    padding: 5px;
    border-bottom: 1px solid #7A21A8;
    border-radius: 2px;
    grid-column: 1/3;
    outline: none;
    box-shadow: none;
    background: transparent;
    border-top: transparent ;
    border-left: transparent ;
    border-right: transparent ;
    margin: 10px 0 10px 0;
    color: #1C61BF;
  }
  textarea {
    border: 1px solid #7A21A8 !important;
  }
  .tag-input {
    width: auto;
    grid-column: 1/2;
  }
  button {
    font-size: .5rem;
    padding: 2px;
    background-color: #7A21A8;
    color: white;
    border-left: 0px;
    margin: 10px 0 10px 0;
  }
  button:hover {
    background-color: white;
    color: #7A21A8;
    border: 2px solid #7A21A8;
  }
  .tag-list {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
  }
  li {
    color: #2B1AB5;
    margin: 5px;
    padding: 7px;

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
  .error-text {
    color: #E8220A;
  }
  .full-width {
    grid-column: 1/3;
  }
</style>
