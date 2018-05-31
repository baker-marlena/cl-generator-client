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
  data() {
    return {
      options: [],
      snippets: [],
      selectedOption: '',
      modalShow: false,
      editId: null,
      authenticated: false
    }
  },
  created() {
    this.getSnippets()
  },
  methods: {
    getSnippets() {
      this.$auth.getAccessToken().then(token => {
        fetch('http://localhost:3000/items/list', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
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
   background-color: #BF1C83;
   color: white;
   font-size: 1.1rem;
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
