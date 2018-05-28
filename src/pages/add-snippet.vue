<template lang="html">
  <form @submit.prevent="sendItem">
    <h3>Add an Item</h3>
    <label>Type</label>
    <select v-model="item.type">
      <option>Snippet</option>
      <option>Story</option>
      <option>Answer</option>
    </select>
    <label>Text</label>
    <input type='text' contenteditable class="text-input" v-model="item.text"></input>
    <label>Tags</label>
    <input type='text' class="text-input tag-input" v-model="currentTag"></input>
    <button @click.prevent="addTag(currentTag)">Add Tag</button>
    <ul class="tag-list">
      <li v-for="(tag, index) in item.tags" :key="tag">{{tag}} <span @click="removeTag(index)"><i class="fas fa-times fa-sm"></i></span></li>
    </ul>
    <input class="submit-input" type="submit" value="Add Item" />
  </form>
</template>

<script>
export default {
  name: 'addSnippet',
  data() {
    return {
      currentTag: '',
      item: {
        type: '',
        text: '',
        tags: []
      }
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
      console.log(this.item);
      this.$auth.getAccessToken().then(token => {
        fetch('http://localhost:3000/items/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
      })
    }
  }
}
</script>

<style lang="css">
  form {
    display: grid;
    grid-template-columns: 80% 20%;
    width: 30%;
    margin: 0 auto;
  }
  label {
    margin: 10px 0 10px 0;
    grid-column: 1/3;
  }
  select {
    background-color: #BF1C83;
    color: white;
    font-size: 1.1rem;
    align-self: center;
    grid-column: 1/3;
  }
  .text-input {
    font-size: 1.2rem;
    padding: 5px;
    border: 3px solid #7A21A8;
    border-radius: 2px;
    background-color: lightgrey;
    grid-column: 1/3;
  }
  .tag-input {
    width: auto;
    grid-column: 1/2;
  }
  button {
    font-size: .5rem;
    padding: 2px;
    border: 3px solid #7A21A8;
    background-color: #7A21A8;
    color: white;
    border-left: 0px;
  }
  .tag-list {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
  }
  li {
    border: 2px solid #2B1AB5;
    color: #2B1AB5;
    margin: 5px;
    padding: 7px;
  }
  .submit-input {
    grid-column: 1/3;
    padding: 5px 0 5px 0;
    font-size: 1rem;
    background-color: #1AADB5;
    color: white;
  }
</style>
