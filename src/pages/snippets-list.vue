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
        fetch('https://coverletter-gen.herokuapp.com/items/list', {
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
