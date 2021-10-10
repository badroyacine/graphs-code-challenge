<template>
  <div class="container">
    <div class="display-4">Graphs List</div>
    
    <div class="text-end mb-5">
      <button class="btn btn-primary" @click="toggleAddDialog(true)">Add Graph</button>
    </div>

    <GraphList :graphs="graphs" />
  </div>

  <AddGraph v-if="showAddGraph" @closeDialog="toggleAddDialog(false)" @addGraph="addNewGraph"/>
</template>

<script>
import AddGraph from "../components/AddGraph.vue"
import GraphList from "../components/GraphList.vue"
import { mapGetters } from "vuex"

export default {
  name: 'Home',
  components: {
    AddGraph,
    GraphList
  },
  data() {
    return {
      showAddGraph: false
    }
  },

  computed: {
      // Get All graphs from the store
      ...mapGetters({
          'graphs': 'getGraphs'
      })
  },

  methods: {

    toggleAddDialog(value){
        this.showAddGraph = value
    },

    addNewGraph(graph){
        // Add the new Graph to the store and presist it in localStorage
        this.$store.dispatch({
            type: 'addGraph',
            graph
        })
    }
  }
}
</script>