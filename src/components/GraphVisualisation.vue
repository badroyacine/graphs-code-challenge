<template>
    <div class="main-container">
        <div class="d-flex justify-content-end align-items-center" v-if="isEditMode">
            <button class="btn btn-primary me-2" @click="toggleAddDialog(true)">Add node</button>
            <button class="btn btn-danger me-4" :disabled="selectedNodes.length == 0" @click="removeNode">Remove node</button>

            <button class="btn btn-primary me-2" :disabled="selectedNodes.length != 2" @click="addEdge">Add link</button>
            <button class="btn btn-danger" :disabled="selectedEdges.length == 0" @click="removeEdge">Remove link</button>
        </div>

        <div style="height: 350px;" v-if="isEditMode || !isEmpty(nodes)">
            <v-network-graph
                v-model:selected-nodes="selectedNodes"
                v-model:selected-edges="selectedEdges"
                :nodes="nodes"
                :edges="edges"
                :layouts="layouts"
                :configs="configs"
            />
        </div>

        <div class="empty-graph" v-if="!isEditMode && isEmpty(nodes)">
            <div>This Graph has no nodes and relations yet.</div>
            <div>You can create Nodes by Editing the graph.</div>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center" v-if="isEditMode">
        <button class="btn btn-secondary" @click="goToViewGraph">Cancel</button>
        <button class="btn btn-success" @click="saveGraph">Save modifications</button>
    </div>

    <AddLabel v-if="showAddlabel" @closeDialog="toggleAddDialog(false)" @addLabel="addNode"/>

</template>

<script>
import { reactive, ref } from "vue"
import { Nodes, Edges } from "v-network-graph"
import AddLabel from './AddLabel.vue'

export default {
    name: 'GraphVisualisation',
    emits: ["updateGraph"],
    components: { AddLabel },
    props: {
        isEditMode: {
            type: Boolean,
            default: false
        },
        graphNodes: {
            type: Object,
            default: {}
        },
        graphEdges: {
            type: Object,
            default: {}
        },
        graphLayouts: {
            type: Object,
            default: {}
        }
    },
    setup(props){
        let nodes = reactive(props.graphNodes)
        let edges = reactive(props.graphEdges)

        let nextNodeIndex = 1
        if(Object.keys(nodes).length > 0) {
            const getMax = ref(
                Object.keys(nodes).reduce(
                    (acc, curr) => acc.id ? (nodes[curr].id > acc.id ? nodes[curr] : acc) : nodes[curr], {}
                )
            )

            nextNodeIndex = getMax.value.id + 1
        }

        const nextEdgeIndex = ref(Object.keys(edges).length + 1)

        const selectedNodes = ref([])
        const selectedEdges = ref([])

        const showAddlabel = ref(false)

        const layouts = props.graphLayouts;

        const configs = {
            node: {
                selectable: props.isEditMode ? 2 : 0, // up to 2 nodes
                draggable: props.isEditMode,
                hover: {
                    type: "circle",
                    radius: 18,
                    color: "red",
                },
            },
            edge: {
                selectable: props.isEditMode,
                normal: {
                    width: 3,
                },
            },
        }

        return {
            nodes,
            edges,
            layouts,
            configs,
            nextNodeIndex,
            nextEdgeIndex,
            selectedNodes,
            selectedEdges,
            showAddlabel
        }
    },
    methods: {

        toggleAddDialog(value){
            this.showAddlabel = value
        },

        addNode(label) {
            // const nodeId = `node${this.nextNodeIndex}`
            const nodeId = this.nextNodeIndex
            // const name = `Node${this.nextNodeIndex}`
            const name = label

            const id = this.nextNodeIndex

            this.nodes[nodeId] = { name, id }
            this.nextNodeIndex++
        },
        removeNode() {
            for (const nodeId of this.selectedNodes) {
                // console.log(this.nodes[nodeId])
                delete this.nodes[nodeId]

                // Delete All relation related to this nodeId
                for(let key in this.edges){
                    // console.log(key, this.edges[key])
                    let { source, target } = this.edges[key] || {}
                    
                    if(source == nodeId || target == nodeId){
                        delete this.edges[key]
                    }
                }
            }
        },
        addEdge() {
            if (this.selectedNodes.length !== 2) return
            const [source, target] = this.selectedNodes
            
            // const edgeId = `node${this.nextNodeIndex++}`
            const edgeId = `edge${Date.now()}`
            this.edges[edgeId] = { source, target }
        },
        removeEdge() {
            for (const edgeId of this.selectedEdges) {
                delete this.edges[edgeId]
            }
        },
        saveGraph(){
            this.$emit('updateGraph', {
                nodes: this.nodes,
                edges: this.edges,
                layouts: this.layouts
            })
        },
        goToViewGraph(){
            this.$router.push({ name: 'GraphDetails' })
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
    },
    
}
</script>

<style scoped>
    .main-container {
        margin: 10px 0;
        border: 1px solid silver;
        border-radius: 4px;
        padding: 5px;
    }
    .empty-graph{
        text-align: center;
        padding: 30px 10px;
    }
</style>