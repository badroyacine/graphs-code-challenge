<template>
    <div class="container" v-if="graph">
        <GraphVisualisation 
            :graphNodes="graph.nodes"
            :graphEdges="graph.edges"
            :graphLayouts="graph.layouts"
        />
    </div>
</template>

<script>

import GraphVisualisation from '../components/GraphVisualisation.vue'

export default {
    name: "GraphDetails",
    props: ['id'],
    components: { GraphVisualisation },
    computed: {
        graph(){
            return this.$store.getters.getGraph(this.id)
        }
    }
}
</script>