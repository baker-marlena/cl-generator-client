<template lang="html">
  <li>
    <div v-if="!editMode" class="grid-div">
      <p class="full-width"><span v-for="(tag, index) in item.topics" :key="tag" class="tag" :class="{pipe: index != 0}">{{tag}}</span></p>
      <p>
        <span @click="editMode = !editMode"><i class="far fa-pen-square edit-button"></i></span>
      </p>
      <p class="full-width">
        {{item.text}}
      </p>
      <p @click="deleteSnippet(item.id)">
        <i class="far fa-times-hexagon delete-button"></i>
      </p>
    </div>
    <div v-if="editMode">
      <form class="grid-div" @submit.prevent="updateItem">
        <ul class="tag-list">
          <li v-for="(tag, index) in item.topics" :key="tag" class="tag-item">{{tag}} <span @click="removeTag(index)"><i class="fas fa-times fa-sm"></i></span></li>
        </ul>
        <p class="close-button" @click="editMode = !editMode">
          <i class="far fa-times"></i>
        </p>
        <input type='text' class="text-input tag-input" v-model="currentTag"></input>
        <button @click.prevent="addTag(currentTag)">Add Tag</button>
        <input type='text' contenteditable class="text-input" v-model="item.text"></input>
        <select v-model="item.type">
          <option>Snippet</option>
          <option>Story</option>
          <option>Answer</option>
        </select>
        <input class="submit-input" type="submit" value="Update Item" />
      </form>
    </div>
  </li>
</template>

<script>
export default {
  name:'listItem',
  props: ['itemData'],
  data() {
    return {
      editMode: false,
      currentTag: '',
      item: this.itemData
    }
  },
  methods: {
    deleteSnippet(id) {
      this.$auth.getAccessToken().then(token => {
        fetch(`http://localhost:3000/items/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.getSnippets();
        })
      })
    },
    addTag(tag) {
      if(!this.item.topics.find(el => {
        return el.toLowerCase() === tag.toLowerCase()
      }))
      this.item.topics.push(tag.toLowerCase())
    },
    removeTag(index) {
      this.item.topics.splice(index, 1)
    },
    updateItem(){
      console.log(this.item);
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
  border: 2px solid #2B1AB5;
  color: #2B1AB5;
  margin: 5px;
  padding: 7px;
}
.close-button {
  align-self: top;
}
.text-input {
  /* font-size: 1.2rem; */
  padding: 5px;
  border: 1px solid #7A21A8;
  border-radius: 2px;
  /* background-color: lightgrey; */
  grid-column: 1/3;
  margin-top: 10px;
}
.tag-input {
  width: auto;
  grid-column: 1/2;
}
button {
  font-size: .5rem;
  /* padding: 2px; */
  border: 3px solid #7A21A8;
  background-color: #7A21A8;
  color: white;
  border-left: 0px;
  margin-top: 10px;
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
  grid-column: 1/2;
  margin-top: 10px;
}
.submit-input {
  grid-column: 2/3;
  /* padding: 5px 0 5px 0; */
  font-size: .5rem;
  background-color: #1AADB5;
  color: white;
  margin-top: 10px;
}
</style>
