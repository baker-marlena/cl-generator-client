<template lang="html">
  <div>
    <select v-model="selectedOption">
      <option class="option-box" v-for="topic in sortedOptions" :key="topic">{{topic}} <i class="far fa-angle-down"></i></option>
    </select>
    <ul>
      <li v-for="(snippet, index) in displaySnippets" :key="snippet.text" :class="{highlighted: index %2 == 0}">
        <p><span v-for="(tag, index) in snippet.topics" :key="tag" class="tag" :class="{pipe: index != 0}">{{tag}}</span></p>
        <p @click="deleteSnippet()">
          <i class="far fa-times-hexagon delete-button"></i>
        </p>
        <p>
          {{snippet.text}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      snippets: [],
      selectedOption: ''
    }
  },
  created() {
    this.getSnippets()
  },
  methods: {
    getSnippets() {
      this.$auth.getAccessToken().then(token => {
        fetch('http://localhost:3000/list/snippet', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            let tagList = []
            res.data.forEach(entry => {
              entry.tags.tags.forEach(tag => {
                if(!tagList.find(el => {
                  return el === tag
                })){
                  tagList.push(tag)
                }
              })
            })
            this.options = tagList
            this.snippets = res.data.map(entry => {
              return {
                topics: entry.tags.tags,
                text: entry.text
              }
            })
          })
      })
    },
    deleteSnippet() {
      console.log('Delete');
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
 li {
   display: grid;
   grid-template-columns: 95% 5%;
   padding: 10px;
 }
 h3 {
   margin: 0;
 }
 .delete-button {
   align-self: center;
   color: #BF1C83;
   cursor: pointer;
 }
 .highlighted {
   background-color: lightgrey;
 }
 .tag {
   padding: 5px;
   font-weight: bold;
   color: #2B1AB5;
 }
 .pipe {
   border-left: 2px solid #7A21A8;
 }
</style>
