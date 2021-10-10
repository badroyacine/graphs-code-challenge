<template>
    <div class="container mt-5" v-if="graph">
        <div>
            <span class="fw-bold">Number of nodes:</span> {{ nbrNodes }}
        </div>
        <div>
            <span class="fw-bold">Number of relations:</span> {{ nbrEdges }}</div>
        <div>
            <span class="fw-bold">Created At:</span> {{ graph.created_at.toLocaleString() }}</div>
        <div>
            <span class="fw-bold">Updated At:</span> {{ graph.updated_at }}
        </div>

        <div class="my-5">
            <table class="table" v-if="!isEmpty(graph.nodes)">
                <thead>
                    <th scope="col">Node ID</th>
                    <th scope="col">Node tooltip</th>
                    <th scope="col">Neighbors</th>
                </thead>
                <tbody>
                    <tr v-for="node in graph.nodes" :key="node">
                        <td>{{ node.id }}</td>
                        <td>{{ node.name }}</td>
                        <td>{{ nodeNeighbors(node.id) }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center display-6" v-else>
                This Graph has no nodes yet.
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "GraphStatistics",
    props: ['id'],
    
    computed: {
        nbrNodes() { return Object.keys(this.graph.nodes).length },
        nbrEdges() { return Object.keys(this.graph.edges).length },
        graph(){
            return this.$store.getters.getGraph(this.id)
        }
    },
    methods: {
        nodeNeighbors(nodeId){
            const neighbors = []

            for(let key in this.graph.edges){
                let { source, target } = this.graph.edges[key] || {}
                if(source == nodeId) neighbors.push(target)
                else if(target == nodeId) neighbors.push(source)
            }

            return neighbors.join(", ");
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
    }
}
</script>