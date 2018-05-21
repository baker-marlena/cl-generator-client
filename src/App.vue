<template>
  <div id="app">
    <select v-model="selectedOption">
      <option v-for="topic in sortedOptions" :key="topic">{{topic}}</option>
    </select>
    <ul>
      <li v-for="snippet in displaySnippets" :key="snippet.text">
        <h3>{{snippet.topics}}</h3>
        <p>
          {{snippet.text}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
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
      fetch('../static/parts.json')
        .then(res => res.json())
        .then(res => {
          this.options = res.topics
          this.snippets = res.snippets
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 50px 30% 0 30%;
}
ul {
  margin-top: 50px;
  list-style: none;
}
</style>
