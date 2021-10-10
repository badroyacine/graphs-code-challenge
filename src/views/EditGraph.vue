<template>
    <div class="container my-5">
        <h2>Edit graph</h2>

        <div class="card-container my-3">
            <BaseCard>
                <template #title>
                    <h5 class="text-center">Information</h5>
                </template>
                <template #body>
                    <div>- You can select a node by clicking on it.</div>
                    <div>- You can select a link by clicking on it.</div>
                    <div>- You can select 2 nodes to create a relation between them, by pressing shift + click.</div>
                </template>
            </BaseCard>
        </div>

        <GraphVisualisation v-if="graph"
            :isEditMode="true" 
            :graphNodes="graph.nodes"
            :graphEdges="graph.edges"
            :graphLayouts="graph.layouts"
            @updateGraph="editGraph" 
        />
    </div>
</template>

<script>

import GraphVisualisation from '../components/GraphVisualisation.vue'
import BaseCard from '../components/ui/BaseCard.vue'

export default {
    name: "EditGraph",
    props: ['id'],
    components: { GraphVisualisation, BaseCard },
    computed: {
        graph(){
            return this.$store.getters.getGraph(this.id)
        }
    },
    methods: {
        editGraph(data){

            return this.$store.dispatch({
                type: 'editGraph',
                graph: data
            }).then(() => this.$router.push({ name: 'GraphDetails' }))
        }
    },
}
</script>

<style scoped>
    .card-container {
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }
</style>