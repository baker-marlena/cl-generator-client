<template lang="html">
  <li>
    <div v-if="!editMode" class="grid-div">
      <p class="full-width"><span v-for="(tag, index) in item.tags" :key="tag" class="tag" :class="{pipe: index != 0}">{{tag}}</span></p>
      <p>
        <span @click="editMode = !editMode"><i class="far fa-pen-square edit-button"></i></span>
      </p>
      <p class="full-width">
        {{item.text}}
      </p>
      <p @click="showModal = true">
        <i class="far fa-times-hexagon delete-button"></i>
      </p>
    </div>
    <div v-if="editMode">
      <form class="grid-div" @submit.prevent="updateSnippet(itemData.id)">
        <ul class="tag-list">
          <li v-for="(tag, index) in item.tags" :key="tag" class="tag-item">{{tag}} <span @click="removeTag(index)"><i class="fas fa-times fa-sm"></i></span></li>
        </ul>
        <p class="close-button" @click="editMode = !editMode">
          <i class="far fa-times"></i>
        </p>
        <input type='text' class="text-input tag-input" v-model="currentTag"></input>
        <button @click.prevent="addTag(currentTag)" class="tagButton">Add Tag</button>
        <textarea rows="6" class="text-input" v-model="item.text" />
        <select v-model="item.type">
          <option :selected="item.type == 'snippet'">Snippet</option>
          <!-- <option :selected="item.type == 'story'">Story</option>
          <option :selected="item.type == 'answer'">Answer</option> -->
        </select>
        <input class="submit-input" type="submit" value="Update Item" />
      </form>
    </div>
    <div class="modalDiv" v-if="showModal">
      <h2 class="modalHeader">Confirm you want to delete this snippet?</h2>
      <button class="modalDecline modalButton" @click="showModal = false">No</button>
      <button class="modalConfirm modalButton" @click="deleteSnippet(itemData.id)">Yes</button>
    </div>
  </li>
</template>

<script>
export default {
  name:'listItem',
  props: ['itemData', 'getSnippets', 'userEmail'],
  data() {
    return {
      GoogleAuth: null,
      editMode: false,
      showModal: false,
      deleteConfirm: false,
      currentTag: '',
      item: {
        text: '',
        type: '',
        tags: []
      }
    }
  },
  created() {
    this.GoogleAuth = gapi.auth2.getAuthInstance();
    this.getItemData();
  },
  methods: {
    getItemData() {
      let token = this.GoogleAuth.currentUser.get().getAuthResponse().id_token
      fetch(`http://localhost:3000/items/${this.itemData.id}?email=${this.userEmail}`, {
        method: 'GET',
        headers: {
          token: token
        }
      })
      .then(res => res.json())
      .then(res => {
        this.item.tags = res.data.tags.map(tag => tag.text)
        this.item.text = res.data.text
        this.item.type = res.data.type
      })
    },
    deleteSnippet(id) {
      let token = this.GoogleAuth.currentUser.get().getAuthResponse().id_token
      fetch(`https://coverletter-gen.herokuapp.com/items/delete/${id}?email=${this.userEmail}`, {
        method: 'DELETE',
        headers: {
          token: token
        }
      })
      .then(res => {
        this.getSnippets();
      })
    },
    updateSnippet(id) {
      let body = this.item
      let token = this.GoogleAuth.currentUser.get().getAuthResponse().id_token
      fetch(`https://coverletter-gen.herokuapp.com/items/${id}?email=${this.userEmail}`, {
        method: 'PUT',
        headers: {
          token: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    },
    addTag(tag) {
      if(!this.item.tags.find(el => {
        return el.toLowerCase() === tag.toLowerCase()
      }))
      this.item.tags.push(tag.toLowerCase())
    },
    removeTag(index) {
      this.item.tags.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
li {
  padding: 10px;
}
.grid-div {
  display: grid;
  grid-template-columns: 75% 20% 5%;
}
.full-width {
  grid-column: 1/3;
}
.delete-button {
  align-self: center;
  color: #BF1C83;
  cursor: pointer;
}
.edit-button {
  align-self: center;
  color: #1AADB5;
  cursor: pointer;
}
.tag {
  padding: 5px;
  font-weight: bold;
  color: #2B1AB5;
}
.pipe {
  border-left: 2px solid #7A21A8;
}
.tag-list {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  grid-column: 1/3;
  margin: 0 auto;
}
.tag-item {
  color: #2B1AB5;
  margin: 5px;
  padding: 7px;
}
.close-button {
  align-self: top;
}
.text-input {
  grid-column: 1/3;
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
  margin: 10px 0 10px 0;
  color: #1C61BF;
}
.tag-input {
  width: auto;
  grid-column: 1/2;
}
.tagButton {
  font-size: .5rem;
  padding: 2px;
  background-color: #7A21A8;
  color: white;
  border-left: 0px;
  margin: 10px 0 10px 0;
}
.tagButton:hover {
  background: transparent;
  color: #7A21A8;
  border: 2px solid #7A21A8;
}
textarea:focus, input:focus select:focus{
  outline: none;
}
select {
  font-size: 1.1rem;
  align-self: center;
  grid-column: 1/2;
  background: transparent;
  border-top: transparent !important;
  border-left: transparent !important;
  border-right: transparent !important;
  border-bottom: 1px solid #BF1C83;
  color: #BF1C83;
  margin-right: 5px;
}
.submit-input {
  grid-column: 2/3;
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
textarea {
  border: 1px solid #7A21A8 !important;
}
.modalDiv {
  display: grid;
  grid-column-template: 50% 50%;
  width: 70%;
  margin: 0 auto;
}
.modalHeader {
  font-size: 1.5rem;
  color: #BF1C83;
  margin: 0 0 15px 0;
  grid-column: 1/3;
}
.modalButton {
  color: white;
  font-size: 1rem;
  padding: 5px;
  width: 100px;
  margin: 0 auto;
}
.modalConfirm {
  background-color: #0B7200;
}
.modalConfirm:hover {
  background-color: transparent;
  color: #0B7200;
  border: 1px solid #0B7200;
}
.modalDecline {
  background-color: #E8220A;
}
.modalDecline:hover {
  color: #E8220A;
  border: 1px solid #E8220A;
  background-color: transparent;
}
</style>
